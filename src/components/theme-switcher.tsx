import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { ScriptOnce } from '@tanstack/react-router'
import { MoonIcon, SunIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export type UserTheme = 'light' | 'dark' | 'system'
export type AppTheme = Exclude<UserTheme, 'system'>

const STORAGE_KEY = 'ui-theme'
const themes: UserTheme[] = ['light', 'dark', 'system']

function isUserTheme(value: string | null): value is UserTheme {
  return themes.includes(value as UserTheme)
}

function getStoredTheme(): UserTheme {
  if (typeof window === 'undefined') return 'system'

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return isUserTheme(stored) ? stored : 'system'
  } catch {
    return 'system'
  }
}

function getSystemTheme(): AppTheme {
  if (typeof window === 'undefined') return 'light'

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function applyTheme(theme: UserTheme) {
  const root = document.documentElement
  const resolved = theme === 'system' ? getSystemTheme() : theme

  root.classList.remove('light', 'dark', 'system')
  root.classList.add(resolved)

  if (theme === 'system') {
    root.classList.add('system')
  }
}

function persistTheme(theme: UserTheme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Storage may be unavailable in restricted contexts.
  }
}

// Apply the saved theme before hydration to reduce theme flashing.
const themeScript = `(() => {
  try {
    const stored = localStorage.getItem('${STORAGE_KEY}');
    const theme = ['light', 'dark', 'system'].includes(stored)
      ? stored
      : 'system';
    const resolved = theme === 'system'
      ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    document.documentElement.classList.remove('light', 'dark', 'system');
    document.documentElement.classList.add(resolved);
    if (theme === 'system') {
      document.documentElement.classList.add('system');
    }
  } catch {
    document.documentElement.classList.add(
      matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    );
  }
})();`

type ThemeContextValue = {
  userTheme: UserTheme
  appTheme: AppTheme
  setTheme: (theme: UserTheme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

type ThemeProviderProps = {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [userTheme, setUserTheme] = useState<UserTheme>(getStoredTheme)
  const [systemTheme, setSystemTheme] = useState<AppTheme>(getSystemTheme)

  useEffect(() => {
    applyTheme(userTheme)
    setSystemTheme(getSystemTheme())
  }, [userTheme])

  useEffect(() => {
    if (userTheme !== 'system') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      const nextTheme = getSystemTheme()
      setSystemTheme(nextTheme)
      applyTheme('system')
    }

    media.addEventListener('change', handleChange)

    return () => {
      media.removeEventListener('change', handleChange)
    }
  }, [userTheme])

  const setTheme = useCallback((theme: UserTheme) => {
    setUserTheme(theme)
    persistTheme(theme)
    applyTheme(theme)
    setSystemTheme(getSystemTheme())
  }, [])

  const appTheme = userTheme === 'system' ? systemTheme : userTheme

  return (
    <ThemeContext.Provider value={{ userTheme, appTheme, setTheme }}>
      <ScriptOnce>{themeScript}</ScriptOnce>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}

export function ThemeSwitcher() {
  const { appTheme, setTheme } = useTheme()

  const isDark = appTheme === 'dark'

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative rounded-full"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <SunIcon
        className={`size-4 transition-all duration-300 ${
          isDark
            ? 'scale-0 -rotate-90 opacity-0'
            : 'scale-100 rotate-0 opacity-100'
        }`}
      />

      <MoonIcon
        className={`absolute size-4 transition-all duration-300 ${
          isDark
            ? 'scale-100 rotate-0 opacity-100'
            : 'scale-0 rotate-90 opacity-0'
        }`}
      />

      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
