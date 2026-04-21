'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

interface OrgItem {
  name: string
  img: string
  imgDark?: string
  url: string
  description: string
}

function OrgCard({ item }: { item: OrgItem }) {
  return (
    <div className="flex flex-col gap-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-8 py-8 shadow-sm w-full">

      {/* Org name label — clickable link */}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-bold uppercase tracking-widest text-[#2f4fa3] dark:text-[#5fe3e3] hover:underline underline-offset-2 transition-opacity hover:opacity-80"
      >
        {item.name}
      </a>

      {/* Logo — also a link */}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-full max-w-[200px] h-16 block hover:opacity-80 transition-opacity"
      >
        {/* Light mode logo */}
        <Image
          src={item.img}
          alt={item.name}
          fill
          className={`object-contain ${item.imgDark ? 'dark:hidden' : ''}`}
          sizes="200px"
        />
        {/* Dark mode logo (only when imgDark is provided) */}
        {item.imgDark && (
          <Image
            src={item.imgDark}
            alt={item.name}
            fill
            className="object-contain hidden dark:block"
            sizes="200px"
          />
        )}
      </a>

      {/* Description with bold linked org name */}
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed ">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-[#121e52] dark:text-white hover:underline underline-offset-2"
        >
          {item.name}
        </a>
        {' '}
        {item.description}
      </p>
    </div>
  )
}

export default function Organizers() {
  const t = useTranslations('organizers')
  const items = t.raw('items') as OrgItem[]

  const [first, second, third] = items

  return (
    <section className="w-full py-12 md:py-20 bg-[#f7f9fc] dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center gap-10">

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-[#2f4fa3] text-center">
          {t('title')}
        </h2>

        {/* Top row — 2 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <OrgCard item={first} />
          <OrgCard item={second} />
        </div>

        {/* Bottom row — 1 centered card */}
        <div className="w-full sm:w-1/2">
          <OrgCard item={third} />
        </div>

      </div>
    </section>
  )
}
