'use client'

import logo from "@/public/logo.svg"
import Image from "next/image"
import LoginButton from "./LoginButton"
import { useAppStore } from "@/lib/store"
import { useTranslations } from "next-intl"

function LangSwitch() {
  const { locale, setLocale } = useAppStore()
  return (
    <div className="flex rounded-lg overflow-hidden border border-white/25">
      <button
        onClick={() => setLocale('ru')}
        className={`px-3 py-1.5 text-xs font-medium transition-colors ${locale === 'ru' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white hover:bg-white/10'}`}
      >
        RU
      </button>
      <button
        onClick={() => setLocale('en')}
        className={`px-3 py-1.5 text-xs font-medium transition-colors ${locale === 'en' ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white hover:bg-white/10'}`}
      >
        EN
      </button>
    </div>
  )
}

export default function Header() {
  const t = useTranslations('header')
  return (
    <header className="header absolute top-0 left-0 right-0 z-10 w-full">
      <div className="max-w-6xl mx-auto px-5 h-20 flex items-center justify-between gap-3">
        <Image
          alt="logo"
          src={logo}
          width={215}
          height={40}
          className="h-8 sm:h-10 w-auto"
        />
        <div className="flex items-center gap-2 sm:gap-3">
          <LangSwitch />
          <LoginButton className="login-button inline-flex h-10 items-center justify-center gap-2.5 px-6 sm:px-10 py-3 bg-white/5 rounded-xl border border-white/35 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-colors">
            <span className="font-medium text-[#f7f9fc] text-sm sm:text-base whitespace-nowrap">
              {t('loginBtn')}
            </span>
          </LoginButton>
        </div>
      </div>
    </header>
  )
}
