import { atom, createStore, getDefaultStore } from "jotai"
import { useRef, useSyncExternalStore } from "react"
import { appLayout } from "@/lib/contexts/atoms"
import { LAYOUT_MODES as INTERNAL_LAYOUT_MODES } from "@/lib/constants"

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

const _jotaiStore = createStore()
const appStateAtom = atom<AppState>(
  typeof window !== "undefined" ? loadFromStorage() : DEFAULT_STATE,
)

export const appStore = {
  get state(): AppState {
    return _jotaiStore.get(appStateAtom)
  },
  setState(updater: (prev: AppState) => AppState): void {
    _jotaiStore.set(appStateAtom, updater(_jotaiStore.get(appStateAtom)))
  },
  subscribe(callback: () => void): { unsubscribe: () => void } {
    const unsub = _jotaiStore.sub(appStateAtom, callback)
    return { unsubscribe: unsub }
  },
}

if (typeof window !== "undefined") {
  let _syncInProgress = false

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

  _jotaiStore.sub(appStateAtom, () => {
    if (_syncInProgress) return
    const state = _jotaiStore.get(appStateAtom)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // localStorage unavailable (private browsing quota hit etc.) — ignore
    }
    try {
      channel?.postMessage({ type: "state-update", state })
    } catch {
      // postMessage failed — ignore
    }
  })

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

export function setTheme(theme: Theme): void {
  appStore.setState((s) => ({ ...s, theme }))
}

export function setColorScheme(colorScheme: ColorScheme): void {
  appStore.setState((s) => ({ ...s, colorScheme }))
}

export function setLayoutMode(layoutMode: LayoutMode): void {
  appStore.setState((s) => ({ ...s, layoutMode }))
  getDefaultStore().set(
    appLayout,
    layoutMode === "sidebar"
      ? INTERNAL_LAYOUT_MODES.SIDEBAR_OPEN
      : INTERNAL_LAYOUT_MODES.DEFAULT,
  )
}

export function useAppStore<T>(selector: (state: AppState) => T): T {
  const selectorRef = useRef(selector)
  selectorRef.current = selector

  return useSyncExternalStore(
    (onStoreChange) => {
      const subscription = appStore.subscribe(onStoreChange)
      return () => subscription.unsubscribe()
    },
    () => selectorRef.current(appStore.state),
    () => selectorRef.current(DEFAULT_STATE),
  )
}
