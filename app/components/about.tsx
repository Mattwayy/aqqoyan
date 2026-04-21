'use client'

import { useTranslations } from 'next-intl'
import RegisterButton from "./RegisterButton"

export default function About() {
  const t = useTranslations('about')

  return (
    <section id="about" className="w-full py-12 md:py-20 bg-white dark:bg-slate-800 text-[#121e52] dark:text-white">
      <div className="mx-auto max-w-4xl px-5 flex flex-col items-center text-center gap-6 md:gap-10">

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          {t('title')}
        </h2>

        <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#121e52]/80 dark:text-slate-400">
          {t('body1')}
        </p>

        <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#121e52]/80 dark:text-slate-400">
          {t('body2')}
        </p>

        <RegisterButton className="w-full sm:w-auto h-12 sm:h-14 px-8 rounded-xl text-base sm:text-lg font-medium text-white bg-gradient-to-r from-[#2f4fa3] to-[#5fe3e3] shadow-lg hover:opacity-90 transition" />

      </div>
    </section>
  )
}
