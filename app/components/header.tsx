'use client'

import logo from "@/public/logo.svg"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import LoginButton from "./LoginButton"
import LangDropdown from "./LangDropdown"
import { useTranslations } from "next-intl"

function AuthButton() {
  const { data: session } = useSession()
  const t = useTranslations('header')

  if (session?.user) {
    return (
      <Link
        href="/profile"
        className="login-button inline-flex h-10 items-center justify-center gap-2.5 px-6 sm:px-10 py-3 bg-white/5 rounded-xl border border-white/35 backdrop-blur-sm hover:bg-white/10 transition-colors"
      >
        <span className="font-medium text-[#f7f9fc] text-sm sm:text-base whitespace-nowrap">
          {t('profileBtn')}
        </span>
      </Link>
    )
  }

  return (
    <LoginButton className="login-button inline-flex h-10 items-center justify-center gap-2.5 px-6 sm:px-10 py-3 bg-white/5 rounded-xl border border-white/35 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-colors">
      <span className="font-medium text-[#f7f9fc] text-sm sm:text-base whitespace-nowrap">
        {t('loginBtn')}
      </span>
    </LoginButton>
  )
}

export default function Header() {
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
          <LangDropdown variant="header" />
          <AuthButton />
        </div>
      </div>
    </header>
  )
}
