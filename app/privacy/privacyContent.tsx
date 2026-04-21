'use client'

import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/logo.svg'
import Footer from '@/app/components/footer'
import { useTranslations } from 'next-intl'

export function PrivacyContent() {
  const t = useTranslations("privacy")

  const dataItems = [
    t('dataItems.item1'),
    t('dataItems.item2'),
    t('dataItems.item3'),
    t('dataItems.item4'),
    t('dataItems.item5'),
    t('dataItems.item6'),
    t('dataItems.item7'),
    t('dataItems.item8'),
  ]

  return (
    <div className="min-h-screen bg-[#f4f6fb] dark:bg-slate-900 flex flex-col">

      {/* Header */}
      <header
        style={{ backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        className="w-full border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-4">
          <Link href="/" className="flex items-center shrink-0">
            <Image src={logo} alt="IFBF 2026" className="h-7 w-auto" />
          </Link>
          <div className="flex-1" />
          <Link
            href="/"
            className="px-4 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            ← {t('backToHome')}
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-10">

          <h1 className="text-2xl font-bold text-[#121e52] dark:text-white mb-1">
            {t('title')}
          </h1>
          <p className="text-sm text-[#5fe3e3] font-medium mb-8">
            {t('subtitle')}
          </p>

          {/* Section 1 */}
          <h2 className="text-lg font-bold text-[#121e52] dark:text-white mt-6 mb-2">
            {t('section1.title')}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t('section1.content')}
          </p>

          {/* Section 2 */}
          <h2 className="text-lg font-bold text-[#121e52] dark:text-white mt-6 mb-2">
            {t('section2.title')}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
            {t('section2.intro')}
          </p>
          <ul className="list-none flex flex-col gap-1.5 mb-3">
            {dataItems.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#5fe3e3] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t('section2.passwordNote')}
          </p>

          {/* Section 3 */}
          <h2 className="text-lg font-bold text-[#121e52] dark:text-white mt-6 mb-2">
            {t('section3.title')}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t('section3.content')}
          </p>

          {/* Section 4 */}
          <h2 className="text-lg font-bold text-[#121e52] dark:text-white mt-6 mb-2">
            {t('section4.title')}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t('section4.content')}
          </p>

          {/* Section 5 */}
          <h2 className="text-lg font-bold text-[#121e52] dark:text-white mt-6 mb-2">
            {t('section5.title')}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t('section5.content')}
          </p>

          {/* Section 6 */}
          <h2 className="text-lg font-bold text-[#121e52] dark:text-white mt-6 mb-2">
            {t('section6.title')}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t('section6.content')}
          </p>

          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {t('lastUpdated')}
            </p>
          </div>

        </div>
      </main>

      <Footer hideAuthLink />
    </div>
  )
}