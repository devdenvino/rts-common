import { Store, useSelector } from "@tanstack/react-store"

// ─── Types ────────────────────────────────────────────────────────────────────

export type Theme = "dark" | "light" | "system"
export type ColorScheme =
  | "neutral"
  | "amber" | "blue" | "cyan" | "emerald" | "fuchsia" | "green"
  | "indigo" | "lime" | "orange" | "pink" | "purple" | "red"
  | "rose" | "sky" | "teal" | "violet" | "yellow"

export type LayoutMode = "sidebar" | "topnav"

export const LAYOUT_MODES = {
  SIDEBAR: "sidebar" as LayoutMode,
  TOPNAV: "topnav" as LayoutMode,
}

export interface AppState {
  theme: Theme
  colorScheme: ColorScheme
  layoutMode: LayoutMode
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const STORAGE_KEY = "rts:app-state"
const BROADCAST_CHANNEL = "rts:app-state"
const VALID_THEMES: Theme[] = ["dark", "light", "system"]
const VALID_COLOR_SCHEMES: ColorScheme[] = [
  "neutral",
  "amber", "blue", "cyan", "emerald", "fuchsia", "green",
  "indigo", "lime", "orange", "pink", "purple", "red",
  "rose", "sky", "teal", "violet", "yellow",
]
const VALID_LAYOUT_MODES: LayoutMode[] = ["sidebar", "topnav"]

const DEFAULT_STATE: AppState = { theme: "system", colorScheme: "neutral", layoutMode: "sidebar" }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isValidTheme(v: unknown): v is Theme {
  return typeof v === "string" && VALID_THEMES.includes(v as Theme)
}

function isValidColorScheme(v: unknown): v is ColorScheme {
  return typeof v === "string" && VALID_COLOR_SCHEMES.includes(v as ColorScheme)
}

function isValidLayoutMode(v: unknown): v is LayoutMode {
  return typeof v === "string" && VALID_LAYOUT_MODES.includes(v as LayoutMode)
}

function loadFromStorage(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_STATE
    const parsed = JSON.parse(raw) as Partial<AppState>
    return {
      theme: isValidTheme(parsed.theme) ? parsed.theme : DEFAULT_STATE.theme,
      colorScheme: isValidColorScheme(parsed.colorScheme)
        ? parsed.colorScheme
        : DEFAULT_STATE.colorScheme,
      layoutMode: isValidLayoutMode(parsed.layoutMode)
        ? parsed.layoutMode
        : DEFAULT_STATE.layoutMode,
    }
  } catch {
    return DEFAULT_STATE
  }
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const appStore = new Store<AppState>(
  typeof window !== "undefined" ? loadFromStorage() : DEFAULT_STATE,
)

// ─── Cross-tab sync ───────────────────────────────────────────────────────────
// Uses BroadcastChannel for same-origin tabs + localStorage 'storage' event
// as a fallback (covers cross-origin iframes / older browsers).

if (typeof window !== "undefined") {
  let _syncInProgress = false

  // BroadcastChannel: instant cross-tab sync (same origin)
  // Guard with try/catch — BroadcastChannel is unavailable in some restricted
  // environments (e.g. certain browser extensions, isolated iframes).
  let channel: BroadcastChannel | undefined
  try {
    channel = new BroadcastChannel(BROADCAST_CHANNEL)
    channel.addEventListener("message", (event: MessageEvent<{ type: string; state: AppState }>) => {
      if (event.data?.type !== "state-update") return
      _syncInProgress = true
      appStore.setState(() => event.data.state)
      _syncInProgress = false
    })
  } catch {
    // BroadcastChannel unavailable — cross-tab sync will rely on storage events only
  }

  // Persist every store change to localStorage and broadcast to other tabs
  appStore.subscribe(() => {
    if (_syncInProgress) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appStore.state))
    } catch {
      // localStorage unavailable (private browsing quota hit etc.) — ignore
    }
    try {
      channel?.postMessage({ type: "state-update", state: appStore.state })
    } catch {
      // postMessage failed — ignore
    }
  })

  // Storage event: fallback for cross-origin scenarios (e.g. dev with different ports)
  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY || !event.newValue) return
    try {
      const parsed = JSON.parse(event.newValue) as Partial<AppState>
      const next: AppState = {
        theme: isValidTheme(parsed.theme) ? parsed.theme : DEFAULT_STATE.theme,
        colorScheme: isValidColorScheme(parsed.colorScheme)
          ? parsed.colorScheme
          : DEFAULT_STATE.colorScheme,
        layoutMode: isValidLayoutMode(parsed.layoutMode)
          ? parsed.layoutMode
          : DEFAULT_STATE.layoutMode,
      }
      _syncInProgress = true
      appStore.setState(() => next)
      _syncInProgress = false
    } catch {
      // ignore malformed data
    }
  })
}

// ─── Typed actions ────────────────────────────────────────────────────────────

export function setTheme(theme: Theme): void {
  appStore.setState((s) => ({ ...s, theme }))
}

export function setColorScheme(colorScheme: ColorScheme): void {
  appStore.setState((s) => ({ ...s, colorScheme }))
}

export function setLayoutMode(layoutMode: LayoutMode): void {
  appStore.setState((s) => ({ ...s, layoutMode }))
}

// ─── React hook ───────────────────────────────────────────────────────────────

/** Reactive selector over the shared app store. */
export function useAppStore<T>(selector: (state: AppState) => T): T {
  return useSelector(appStore, selector)
}
