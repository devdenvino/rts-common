/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { useAppStore, setTheme as storeSetTheme, STORAGE_KEY } from "@/store/app-store"
import type { Theme, ColorScheme } from "@/store/app-store"

// Re-export Theme so consumers can import it from this module
export type { Theme, ColorScheme }

type ResolvedTheme = "dark" | "light"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  disableTransitionOnChange?: boolean
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)"

const ThemeProviderContext = React.createContext<
  ThemeProviderState | undefined
>(undefined)

function getSystemTheme(): ResolvedTheme {
  if (window.matchMedia(COLOR_SCHEME_QUERY).matches) {
    return "dark"
  }

  return "light"
}

function disableTransitionsTemporarily() {
  const style = document.createElement("style")
  style.appendChild(
    document.createTextNode(
      "*,*::before,*::after{-webkit-transition:none!important;transition:none!important}"
    )
  )
  document.head.appendChild(style)

  return () => {
    window.getComputedStyle(document.body)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        style.remove()
      })
    })
  }
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  if (target.isContentEditable) {
    return true
  }

  const editableParent = target.closest(
    "input, textarea, select, [contenteditable='true']"
  )
  if (editableParent) {
    return true
  }

  return false
}

/**
 * Wraps the app with theme support. Theme state is backed by `appStateAtom`
 * (Jotai + localStorage + BroadcastChannel), so it is automatically shared
 * across all MFE remotes (shared singleton) and cross-tab (broadcast).
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  disableTransitionOnChange = true,
  ...props
}: ThemeProviderProps) {
  // -- Reactive reads -- re-render only when the selected slice changes ------
  const theme = useAppStore((s) => s.theme)
  const colorScheme = useAppStore((s) => s.colorScheme)

  // On the very first visit (nothing persisted yet) seed the atom with the
  // caller's defaultTheme so the entire app starts from a consistent value.
  // Also apply the theme and colorScheme synchronously to avoid flashing wrong theme.
  React.useLayoutEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null
      if (!raw) {
        storeSetTheme(defaultTheme)
      }
    } catch {
      // localStorage unavailable -- ignore
    }

    // Apply theme and colorScheme synchronously to prevent flash of unstyled content
    const root = document.documentElement
    const currentTheme = theme
    const currentColorScheme = colorScheme
    
    const resolvedTheme = currentTheme === "system" ? getSystemTheme() : currentTheme
    root.classList.remove("light", "dark")
    root.classList.add(resolvedTheme)
    root.setAttribute("data-color-scheme", currentColorScheme)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // intentionally once on mount

  const setTheme = React.useCallback((nextTheme: Theme) => {
    storeSetTheme(nextTheme) // persists to localStorage + broadcasts to other tabs
  }, [])

  // Keep a ref so the keydown handler always sees the latest theme without
  // being re-registered on every theme change.
  const themeRef = React.useRef(theme)
  React.useEffect(() => { themeRef.current = theme }, [theme])

  // Apply data-color-scheme attribute to <html> whenever colorScheme changes
  React.useEffect(() => {
    document.documentElement.setAttribute("data-color-scheme", colorScheme)
  }, [colorScheme])

  const applyTheme = React.useCallback(
    (nextTheme: Theme) => {
      const root = document.documentElement
      const resolvedTheme =
        nextTheme === "system" ? getSystemTheme() : nextTheme
      const restoreTransitions = disableTransitionOnChange
        ? disableTransitionsTemporarily()
        : null

      root.classList.remove("light", "dark")
      root.classList.add(resolvedTheme)

      if (restoreTransitions) {
        restoreTransitions()
      }
    },
    [disableTransitionOnChange]
  )

  React.useEffect(() => {
    applyTheme(theme)

    if (theme !== "system") {
      return undefined
    }

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY)
    const handleChange = () => {
      applyTheme("system")
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [theme, applyTheme])

  // ⌨️  Press "D" to toggle theme (keyboard shortcut)
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return
      if (isEditableTarget(event.target)) return
      if (event.key.toLowerCase() !== "d") return

      const current = themeRef.current
      const next: Theme =
        current === "dark"
          ? "light"
          : current === "light"
            ? "dark"
            : getSystemTheme() === "dark"
              ? "light"
              : "dark"
      storeSetTheme(next)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const value = React.useMemo(
    () => ({ theme, setTheme }),
    [theme, setTheme]
  )

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
