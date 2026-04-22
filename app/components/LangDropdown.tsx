'use client'

import { useState, useRef, useEffect } from 'react'
import { useAppStore } from '@/lib/store'

type Locale = 'ru' | 'en' | 'kz'

const LANGS: { value: Locale; label: string }[] = [
  { value: 'ru', label: 'RU' },
  { value: 'en', label: 'EN' },
  { value: 'kz', label: 'KZ' },
]

/* variant="header"   — белый текст, для тёмного фона хедера  */
/* variant="settings" — тёмный текст, для светлых панелей     */
export default function LangDropdown({ variant = 'header' }: { variant?: 'header' | 'settings' }) {
  const { locale, setLocale } = useAppStore()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  /* Закрываем при клике вне */
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const isHeader = variant === 'header'

  const triggerCls = isHeader
    ? 'h-10 flex items-center gap-1.5 px-4 rounded-xl border border-white/25 bg-white/5 text-xs font-medium text-white hover:bg-white/10 transition-colors backdrop-blur-sm'
    : 'flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-600 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors'

  const dropdownCls = isHeader
    ? 'absolute right-0 top-full mt-1 z-50 w-20 bg-white rounded-lg shadow-lg border border-slate-100 overflow-hidden'
    : 'absolute right-0 top-full mt-1 z-50 w-20 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden'

  const itemCls = (val: Locale) => isHeader
    ? `w-full text-left px-3 py-2 text-xs font-medium transition-colors ${locale === val ? 'bg-[#2f4fa3] text-white' : 'text-slate-700 hover:bg-slate-50'}`
    : `w-full text-left px-3 py-2 text-xs font-medium transition-colors ${locale === val ? 'bg-[#2f4fa3] text-white' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'}`

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(v => !v)} className={triggerCls} aria-haspopup="listbox" aria-expanded={open}>
        {locale.toUpperCase()}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className={dropdownCls} role="listbox">
          {LANGS.map(({ value, label }) => (
            <button
              key={value}
              role="option"
              aria-selected={locale === value}
              onClick={() => { setLocale(value); setOpen(false) }}
              className={itemCls(value)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
