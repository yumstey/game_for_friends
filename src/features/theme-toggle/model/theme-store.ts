import { useEffect, useSyncExternalStore } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '@/shared/config'

export type ThemeMode = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

interface ThemeState {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
}

// Eslatma: kalit va `state.mode` tuzilmasi index.html dagi inline skript bilan mos boʻlishi shart.
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'system',
      setMode: (mode) => set({ mode }),
    }),
    { name: STORAGE_KEYS.theme, version: 1 },
  ),
)

const THEME_COLORS: Record<ResolvedTheme, string> = {
  light: '#f7f7fb',
  dark: '#16151d',
}

const DARK_QUERY = '(prefers-color-scheme: dark)'

function subscribeToSystemTheme(onChange: () => void): () => void {
  const media = window.matchMedia(DARK_QUERY)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

function useSystemPrefersDark(): boolean {
  return useSyncExternalStore(
    subscribeToSystemTheme,
    () => window.matchMedia(DARK_QUERY).matches,
    () => false,
  )
}

/** Foydalanuvchi tanlovi + tizim sozlamasi asosida haqiqiy tema. */
export function useResolvedTheme(): ResolvedTheme {
  const mode = useThemeStore((state) => state.mode)
  const systemDark = useSystemPrefersDark()

  if (mode === 'system') return systemDark ? 'dark' : 'light'
  return mode
}

/** `<html class="dark">` va brauzer paneli rangini sinxronlaydi. Ilova ildizida bir marta chaqiriladi. */
export function useApplyTheme(): void {
  const theme = useResolvedTheme()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLORS[theme])
  }, [theme])
}
