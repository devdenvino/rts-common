/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { appStore, setTheme as storeSetTheme, STORAGE_KEY } from "@/store/app-store"
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
 * Wraps the app with theme support.  Theme state is backed by `appStore`
 * (TanStack Store + localStorage + BroadcastChannel), so it is automatically
 * shared across all MFE remotes (shared singleton) and cross-tab (broadcast).
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  disableTransitionOnChange = true,
  ...props
}: ThemeProviderProps) {
  // Read from the shared app store (reactive via TanStack Store)
  const [theme, setThemeLocal] = React.useState<Theme>(() => {
    // Use a stored value only when the user has previously made an explicit
    // choice (i.e. an entry exists in localStorage).  On the very first visit
    // there is nothing saved, so we honour the caller’s `defaultTheme` prop.
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null
      if (raw) {
        const parsed = JSON.parse(raw) as { theme?: string }
        if (parsed.theme === "dark" || parsed.theme === "light" || parsed.theme === "system") {
          return parsed.theme as Theme
        }
      }
    } catch {}
    return defaultTheme
  })

  const [colorScheme, setColorSchemeLocal] = React.useState<ColorScheme>(
    () => appStore.state.colorScheme
  )

  // Keep local React state in sync when the store changes from another tab/remote
  React.useEffect(() => {
    const sub = appStore.subscribe(() => {
      setThemeLocal(appStore.state.theme)
      setColorSchemeLocal(appStore.state.colorScheme)
    })
    return () => sub.unsubscribe()
  }, [])

  const setTheme = React.useCallback((nextTheme: Theme) => {
    storeSetTheme(nextTheme)  // persists to localStorage + broadcasts
  }, [])

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

      const current = appStore.state.theme
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
