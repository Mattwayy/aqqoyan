'use client'

import { useTranslations } from 'next-intl'
import RegisterButton from "./RegisterButton"

const Participate = () => {
  const t = useTranslations('participate')
  const benefits = t.raw('items') as Array<{ title: string; description: string }>

  return (
    <section id="participate" className="py-12 md:py-24 bg-gradient-to-b from-white to-emerald-50/30 dark:from-slate-900 dark:to-slate-800">
      <div className="mx-auto px-4 max-w-6xl">

        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800 dark:text-white">
            {t('title')}
          </h2>
        </div>

        {/* 2 cols on mobile, 3 on lg */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-6 shadow-md dark:shadow-slate-900/50 hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 hover:border-[#2f4fa3] hover:-translate-y-1 flex flex-col items-center text-center"
            >
              <h3 className="text-sm sm:text-base md:text-xl font-semibold text-gray-800 dark:text-white mb-1 sm:mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 dark:text-slate-300 leading-relaxed text-[11px] sm:text-sm hidden sm:block">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-16">
          <RegisterButton className="w-full sm:w-auto h-12 sm:h-14 px-8 rounded-xl text-base sm:text-lg font-medium text-white bg-gradient-to-r from-[#2f4fa3] to-[#5fe3e3] shadow-lg hover:opacity-90 transition" />
        </div>
      </div>
    </section>
  )
}

export default Participate
