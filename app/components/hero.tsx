'use client'

import { useTranslations } from 'next-intl'
import RegisterButton from "./RegisterButton"

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section id="home" className="hero w-full text-white">
      <div className="mx-auto max-w-6xl px-4 flex flex-col items-center text-center gap-8 md:gap-12">

        {/* TITLE */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
          <span className="text-[#f7f9fc]">
            Islamic Finance and Business Forum{" "}
          </span>
          <span className="text-[#5fe3e3] block sm:inline">
            {t('year')}
          </span>
        </h1>

        {/* INFO */}
        <div className="max-w-2xl flex flex-col gap-4 md:gap-6">
          <p className="text-lg sm:text-2xl font-medium">
            {t('date')} <br />
            {t('location')}
          </p>
          <p className="text-sm sm:text-base text-white/70">
            {t('subtitle')}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <RegisterButton className="w-full sm:w-auto h-12 sm:h-14 px-8 rounded-xl text-base sm:text-lg font-medium bg-gradient-to-r from-[#2f4fa3] to-[#5fe3e3] shadow-lg hover:opacity-90 transition">
            {t('register')}
          </RegisterButton>
          <a href="#programs" className="w-full sm:w-auto h-12 sm:h-14 px-8 rounded-xl text-base sm:text-lg font-medium text-[#5fe3e3] border border-[#5fe3e3]/40 backdrop-blur hover:bg-white/5 transition inline-flex items-center justify-center">
            {t('viewProgram')}
          </a>
        </div>

      </div>
    </section>
  )
}
