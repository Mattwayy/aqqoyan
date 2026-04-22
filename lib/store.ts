'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Locale = 'ru' | 'en' | 'kz'

interface AppStore {
  isDark:      boolean
  locale:      Locale
  toggleTheme: () => void
  setLocale:   (l: Locale) => void
}

// SSR-safe: сервер получает no-op хранилище, клиент — localStorage
const ssrSafeStorage = createJSONStorage(() => {
  if (typeof window === 'undefined') {
    return {
      getItem:    () => null,
      setItem:    () => {},
      removeItem: () => {},
    }
  }
  return localStorage
})

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      isDark:      false,
      locale:      'ru',
      toggleTheme: () => set(s => ({ isDark: !s.isDark })),
      setLocale:   (locale) => set({ locale }),
    }),
    {
      name:    'ifbf-app-store',
      storage: ssrSafeStorage,
    }
  )
)
