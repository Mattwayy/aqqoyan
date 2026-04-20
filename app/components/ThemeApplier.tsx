'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/lib/store'

/**
 * Читает isDark из Zustand и вешает/снимает класс «dark» на <html>.
 * Рендерит null — только side-effect.
 */
export default function ThemeApplier() {
  const isDark = useAppStore(s => s.isDark)

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])

  return null
}
