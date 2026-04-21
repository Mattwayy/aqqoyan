'use client'

import { useTranslations } from 'next-intl'
import RegisterButton from "./RegisterButton"

const cardClasses = ['card--1', 'card--2', 'card--3', 'card--4']

const Stats = () => {
  const t = useTranslations('stats')
  const stats = t.raw('items') as Array<{ value: string; label: string }>

  return (
    <div id="stats" className="w-full py-12 md:py-20 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-8 md:gap-12">

        {/* Header */}
        <div className="text-center flex flex-col gap-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#121e52] dark:text-white">
            {t('title')}
          </h2>
          <p className="text-sm sm:text-base text-[#121e52]/70 dark:text-slate-400">
            {t('subtitle')}{" "}
            <span className="font-semibold text-[#121e52] dark:text-slate-200">
              {t('forumName')}
            </span>
          </p>
        </div>

        {/* Cards — 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {stats.map((s, index) => (
            <div
              key={index}
              className="relative h-[160px] sm:h-[200px] md:h-[240px] rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <div className={cardClasses[index]} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1640]/90 via-[#121e52]/50 to-[#1e3a8a]/10" />
              <div className="absolute bottom-0 left-0 p-3 sm:p-5 text-white">
                <p className="text-lg sm:text-2xl md:text-[1.75rem] font-bold leading-tight tracking-tight">
                  {s.value}
                </p>
                <p className="text-[10px] sm:text-xs leading-snug mt-1 text-white/85 whitespace-pre-line">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <RegisterButton className="w-full sm:w-auto h-12 sm:h-14 px-10 rounded-xl text-base sm:text-lg font-medium text-white bg-gradient-to-r from-[#2f4fa3] to-[#5fe3e3] shadow-lg hover:opacity-90 transition" />
        </div>
      </div>
    </div>
  )
}

export default Stats
