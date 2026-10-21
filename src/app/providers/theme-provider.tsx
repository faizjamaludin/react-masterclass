import { useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { ThemeContext, type Theme } from './theme-context'

const STORAGE_KEY = 'theme'
const darkQuery = '(prefers-color-scheme: dark)'

function readStoredTheme(): Theme {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : 'system'
  } catch {
    return 'system'
  }
}

function subscribeToSystem(callback: () => void) {
  const media = window.matchMedia(darkQuery)
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

const getSystemDark = () => window.matchMedia(darkQuery).matches

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme)
  const systemDark = useSyncExternalStore(subscribeToSystem, getSystemDark)
  const resolvedTheme = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark')
  }, [resolvedTheme])

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme: (next: Theme) => {
        setThemeState(next)
        try {
          if (next === 'system') localStorage.removeItem(STORAGE_KEY)
          else localStorage.setItem(STORAGE_KEY, next)
        } catch {
          // Storage can be unavailable (private mode) — theme still applies for this session
        }
      },
    }),
    [theme, resolvedTheme],
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}
