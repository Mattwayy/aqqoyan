'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useAppStore } from '@/lib/store'
import LangDropdown from './LangDropdown'

/* ── Inline icons ───────────────────────────────────────── */
function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}
function BurgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6"  x2="6"  y2="18" />
      <line x1="6"  y1="6"  x2="18" y2="18" />
    </svg>
  )
}
function LogoutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}
function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}
function ChevronLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}
function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1"  x2="12" y2="3"  />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1"  y1="12" x2="3"  y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}
function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

/* ── Notification modal ─────────────────────────────────── */
function NotificationModal({ onClose }: { onClose: () => void }) {
  const t = useTranslations('notifications')
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-slate-900">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="text-lg font-bold text-[#121e52] dark:text-white">{t('title')}</h2>
        <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Закрыть">
          <CloseIcon />
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-3 text-slate-400">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        <p className="text-base">{t('empty')}</p>
      </div>
    </div>
  )
}

/* ── Settings view ──────────────────────────────────────── */
function SettingsView({ onBack }: { onBack: () => void }) {
  const t       = useTranslations('settings')
  const tMenu   = useTranslations('menu')
  const { isDark, toggleTheme } = useAppStore()

  return (
    <div className="flex flex-col">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        <ChevronLeftIcon />
        {tMenu('back')}
      </button>

      <div className="h-px bg-slate-100 dark:bg-slate-700 mx-4 my-1" />

      {/* Theme toggle */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
          {isDark ? <MoonIcon /> : <SunIcon />}
          <span>{t('theme')}</span>
        </div>
        <button
          onClick={toggleTheme}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDark ? 'bg-[#2f4fa3]' : 'bg-slate-200'}`}
          aria-label="Переключить тему"
        >
          <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${isDark ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>

      {/* Language switcher */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
          <GlobeIcon />
          <span>{t('lang')}</span>
        </div>
        <LangDropdown variant="settings" />
      </div>
    </div>
  )
}

/* ── Dropdown menu ──────────────────────────────────────── */
function DropdownMenu({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<'nav' | 'settings'>('nav')
  const t     = useTranslations('nav')
  const tMenu = useTranslations('menu')

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div className="absolute right-0 top-full mt-2 z-40 w-60 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 py-2 overflow-hidden">
        {view === 'nav' ? (
          <>
            <Link href="/"          onClick={onClose} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">{t('home')}</Link>
            <Link href="/profile"   onClick={onClose} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">{t('profile')}</Link>
            <Link href="/#programs" onClick={onClose} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">{t('programs')}</Link>

            <button
              onClick={() => setView('settings')}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <span>{tMenu('settings')}</span>
              <ChevronRightIcon />
            </button>

            <div className="my-1.5 h-px bg-slate-100 dark:bg-slate-700 mx-4" />

            <button
              onClick={() => { onClose(); signOut({ callbackUrl: '/' }) }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              {tMenu('logout')}
            </button>
          </>
        ) : (
          <SettingsView onBack={() => setView('nav')} />
        )}
      </div>
    </>
  )
}

/* ── Desktop settings panel (fullscreen modal) ──────────── */
function DesktopSettingsModal({ onClose }: { onClose: () => void }) {
  const t     = useTranslations('settings')
  const tMenu = useTranslations('menu')
  const { isDark, toggleTheme } = useAppStore()

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mt-16 mr-6 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#121e52] dark:text-white">{tMenu('settings')}</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <CloseIcon />
          </button>
        </div>

        <div className="h-px bg-slate-100 dark:bg-slate-700" />

        {/* Theme */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
            {isDark ? <MoonIcon /> : <SunIcon />}
            <span>{t('theme')}</span>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDark ? 'bg-[#2f4fa3]' : 'bg-slate-200'}`}
          >
            <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${isDark ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

        {/* Lang */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
            <GlobeIcon />
            <span>{t('lang')}</span>
          </div>
          <LangDropdown variant="settings" />
        </div>
      </div>
    </div>
  )
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

/* ── ProfileHeader ──────────────────────────────────────── */
export default function ProfileHeader() {
  const [notifOpen,     setNotifOpen]     = useState(false)
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [settingsOpen,  setSettingsOpen]  = useState(false)
  const t = useTranslations('nav')

  return (
    <>
      <header
        style={{ backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        className="w-full border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-4">

          <Link href="/" className="flex items-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="logo" className="h-7 w-auto" />
          </Link>

          <nav className="hidden md:flex flex-1 items-center gap-1 ml-4">
            <Link href="/"          className="px-4 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors">{t('home')}</Link>
            <Link href="/profile"   className="px-4 py-2 rounded-lg text-sm text-white bg-white/10 font-medium">{t('profile')}</Link>
            <Link href="/#programs" className="px-4 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors">{t('programs')}</Link>
          </nav>

          <div className="flex-1 md:hidden" />

          <div className="flex items-center gap-1">
            <button onClick={() => setNotifOpen(true)} className="flex items-center justify-center w-9 h-9 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors" aria-label="Уведомления">
              <BellIcon />
            </button>
            {/* Settings — desktop only */}
            <button
              onClick={() => setSettingsOpen(v => !v)}
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Настройки"
            >
              <SettingsIcon />
            </button>

            <button onClick={() => signOut({ callbackUrl: '/' })} className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors" aria-label="Выйти">
              <LogoutIcon />
            </button>
            <div className="relative md:hidden">
              <button onClick={() => setMenuOpen(v => !v)} className="flex items-center justify-center w-9 h-9 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}>
                {menuOpen ? <CloseIcon /> : <BurgerIcon />}
              </button>
              {menuOpen && <DropdownMenu onClose={() => setMenuOpen(false)} />}
            </div>
          </div>

        </div>
      </header>

      {notifOpen    && <NotificationModal      onClose={() => setNotifOpen(false)} />}
      {settingsOpen && <DesktopSettingsModal  onClose={() => setSettingsOpen(false)} />}
    </>
  )
}
