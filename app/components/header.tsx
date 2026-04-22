'use client'

import { useState, useEffect, useRef } from 'react'
import logo from "@/public/logo.svg"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import LoginButton from "./LoginButton"
import LangDropdown from "./LangDropdown"
import { useTranslations } from "next-intl"
import { useAppStore } from "@/lib/store"

/* ── Icons ─────────────────────────────────────────────── */
function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
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
function BurgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
function ProfileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  )
}
function LoginIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  )
}
function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

/* ── Desktop auth button ────────────────────────────────── */
function AuthButton() {
  const { data: session } = useSession()
  const t = useTranslations('header')

  if (session?.user) {
    return (
      <Link
        href="/profile"
        className="inline-flex h-10 items-center justify-center gap-2 px-6 bg-white/5 rounded-xl border border-white/35 backdrop-blur-sm hover:bg-white/10 transition-colors"
      >
        <ProfileIcon />
        <span className="font-medium text-[#f7f9fc] text-sm whitespace-nowrap">
          {t('profileBtn')}
        </span>
      </Link>
    )
  }

  return (
    <LoginButton className="inline-flex h-10 items-center justify-center gap-2.5 px-6 py-3 bg-white/5 rounded-xl border border-white/35 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-colors">
      <span className="font-medium text-[#f7f9fc] text-sm whitespace-nowrap">
        {t('loginBtn')}
      </span>
    </LoginButton>
  )
}

/* ── Mobile burger menu ─────────────────────────────────── */
function MobileMenu({ onClose }: { onClose: () => void }) {
  const { data: session } = useSession()
  const { isDark, toggleTheme } = useAppStore()
  const t     = useTranslations('header')
  const tSet  = useTranslations('settings')

  return (
    <>
      {/* backdrop */}
      <div className="fixed inset-0 z-30" onClick={onClose} />

      {/* panel */}
      <div className="absolute right-0 top-full mt-2 z-40 w-64 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">

        {/* Auth row */}
        <div className="px-4 pt-4 pb-3">
          {session?.user ? (
            <Link
              href="/profile"
              onClick={onClose}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              <ProfileIcon />
              <span className="text-sm font-medium">{t('profileBtn')}</span>
            </Link>
          ) : (
            <LoginButton
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <LoginIcon />
              <span className="text-sm font-medium">{t('loginBtn')}</span>
            </LoginButton>
          )}
        </div>

        <div className="h-px bg-white/15 mx-4" />

        {/* Language */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <GlobeIcon />
            <span>{tSet('lang')}</span>
          </div>
          <LangDropdown variant="header" />
        </div>

        {/* Theme */}
        <div className="flex items-center justify-between px-4 py-3 pb-4">
          <div className="flex items-center gap-2 text-white/70 text-sm">
            {isDark ? <MoonIcon /> : <SunIcon />}
            <span>{tSet('theme')}</span>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDark ? 'bg-[#2f4fa3]' : 'bg-white/30'}`}
            aria-label="Переключить тему"
          >
            <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${isDark ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>

      </div>
    </>
  )
}

/* ── Header ─────────────────────────────────────────────── */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // закрываем при клике вне
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  return (
    <header className="header absolute top-0 left-0 right-0 z-10 w-full">
      <div className="max-w-6xl mx-auto px-5 h-20 flex items-center justify-between gap-3">

        <Image alt="logo" src={logo} width={215} height={40} className="h-8 sm:h-10 w-auto" />

        {/* Desktop: lang + auth */}
        <div className="hidden sm:flex items-center gap-3">
          <LangDropdown variant="header" />
          <AuthButton />
        </div>

        {/* Mobile: burger */}
        <div ref={ref} className="relative sm:hidden">
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/25 text-white hover:bg-white/10 transition-colors"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {menuOpen ? <CloseIcon /> : <BurgerIcon />}
          </button>

          {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
        </div>

      </div>
    </header>
  )
}
