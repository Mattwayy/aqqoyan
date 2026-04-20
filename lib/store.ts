'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Locale = 'ru' | 'en'

interface AppStore {
  isDark:      boolean
  locale:      Locale
  toggleTheme: () => void
  setLocale:   (l: Locale) => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      isDark:      false,
      locale:      'ru',
      toggleTheme: () => set(s => ({ isDark: !s.isDark })),
      setLocale:   (locale) => set({ locale }),
    }),
    { name: 'ifbf-app-store' }
  )
)
