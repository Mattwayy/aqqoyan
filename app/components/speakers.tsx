'use client'

import { useTranslations } from 'next-intl'
import Image from "next/image"
import { useState } from "react"
import { useAppStore } from '@/lib/store'

interface Speaker {
  img: string
  name: string
  country: string
  role: string
  roleEng?: string
  nameEng?: string
  roleKz?: string
}

const initialSpeakers: Speaker[] = [
  {
    img: "/speakers/ber.png",
    name: "Берик Заиров",
    nameEng: "Berik Zairov",

    country: "Kazakhstan",
    role: "Генеральный директор & Соучредитель Mizan Islamic Finance",
    roleEng: "CEO & Co-Founder of Mizan Islamic Finance",
    roleKz: "Mizan Islamic Finance компаниясының Бас директоры және Құрметті серіктесі",
  },
  {
    img: "/speakers/lim.png",
    name: "Lim Say Cheong",
    nameEng: "Lim Say Cheong",
    country: "UAE",
    role: "Главный советник по цифровым активам и исламским финансам ComTech Gold",
    roleEng: "Chief Advisor on Digital Assets and Islamic Finance at ComTech Gold",
    roleKz: "ComTech Gold компаниясының Бастық советшісі. Цифрлық активтер және исламдық финанстар бойынша экспертиза",
  },
  {
    img: "/speakers/muf.png",
    name: "Mufti Ibrahim Essa",
    nameEng: "Mufti Ibrahim Essa",
    country: "Pakistan",
    role: "Муфтий. Эксперт по шариатскому соответствию в исламских финансах",
    roleEng: "Mufti. Shariah Compliance Expert in Islamic Finance",
    roleKz: "Муфтий. Исламдық финанстар бойынша шариаттық сәйкестік экспертизасы",
  },
  {
    img: "/speakers/mur.png",
    name: "Мурат Кылышбай",
    nameEng: "Murat Kylyshbay",
    country: "Kazakhstan",
    role: "Предприниматель. Шариатский советник (AAOIFI, CSAA)",
    roleEng: "Entrepreneur. Shariah Advisor (AAOIFI, CSAA)",
    roleKz: "Кәсіпкер. AAOIFI, CSAA шариаттық кеңесшісі",
  },
  {
    img: "/speakers/ain.png",
    name: "Айнура Умаева",
    nameEng: "Ainura Umaeva",
    country: "Kazakhstan",
    role: "Учредитель и генеральный директор коммуникационного агентства TIDAM",
    roleEng: "Founder and CEO of TIDAM communications agency",
    roleKz: "TIDAM коммуникациялық агенттігінің негізін қалаушы және бас директоры",
  },
  {
    img: "/speakers/mad.png",
    name: "Мадина Тукулова",
    nameEng: "Madina Tukulova",
    country: "Kazakhstan",
    role: "Руководитель направления исламских финансов МФЦА, Председатель AIFB",
    roleEng: "Head of Islamic Finance at AIFC, CEO of AIFB",
    roleKz: "AIFC компаниясының исламдық финанстар бөлімінің басшысы, AIFB қауымдастығының төрағасы",
  },
  {
    img: "/speakers/bek.png",
    name: "Бексултан Ануаров",
    nameEng: "Beksultan Anuarov",
    country: "Kazakhstan",
    role: "Генеральный директор Paidax",
    roleEng: "CEO of Paidax",
    roleKz: "Paidax компаниясының Бас директоры",
  },
  {
    img: "/speakers/mar.png",
    name: "Маргарита Агабекова",
    nameEng: "Margarita Agabekova",
    country: "Kazakhstan",
    role: "Заместитель Генерального директора Kazakhstan Ijara Company",
    roleEng: "Deputy CEO of Kazakhstan Ijara Company",
    roleKz: "Kazakhstan Ijara Company компаниясының Бас директорының орынбасушысы",
  },
  {
    img: "/speakers/lil.png",
    name: "Lilian Le Falher",
    nameEng: "Lilian Le Falher",
    country: "Bahrein",
    role: "Основатель и управляющий директор ISTRAT Advisory",
    roleEng: "Founder and Managing Director of ISTRAT Advisory",
    roleKz: "ISTRAT Advisory компаниясының негізін қалаушы және бас директоры",
  },
    {
    img: "/speakers/nur.png",
    name: "Нуржан Стамбакиев",
    nameEng: "Nurzhan Stambakiyev",
    country: "Kazakhstan",
    role: "PhD. Руководитель сектора «Исламские финансы» Духовного управления мусульман Казахстана",
    roleEng: "PhD. Head of the 'Islamic Finance' sector of the Spiritual Administration of Muslims of Kazakhstan",
    roleKz: "Казахстан мусульманының Духовдық басқаруының 'Исламдық финанстар' секторының бас басшылығы",
  },

]



const moreSpeakers: Speaker[] = [
      {
    img: "/speakers/aza.png",
    name: "Азат Отепбай",
    nameEng: "Azat Otepbay",
    country: "Kazakhstan",
    role: "Заместитель AIFB, Основатель финтех-экосистемы Ailat",
    roleEng: "Deputy of AIFB, Founder of Ailat fintech ecosystem",
    roleKz: "AIFB қауымдастығының орынбасары, Ailat финтех-экожүйесінің негізін қалаушы",
  },
    {
    img: "/speakers/tim.png",
    name: "Тимур Мусин",
    nameEng: "Timur Musin",
    country: "Kazakhstan",
    role: "Член Правления, Главный директор по рискам и ИТ Al Safi Bank Ltd.",
    roleEng: "Board Member, Chief Risk and IT Officer at Al Safi Bank Ltd.",
    roleKz: "Al Safi Bank Ltd. компаниясының Правление мүшесі, және Қауіптеушілік және ИТ бас директоры",
  },

]

function SpeakerCard({ speaker, locale }: { speaker: Speaker; locale: string }) {
  const displayName = locale === 'en' && speaker.nameEng ? speaker.nameEng : speaker.name
  const displayRole =
    locale === 'en' ? (speaker.roleEng ?? speaker.role) :
    locale === 'kz' ? (speaker.roleKz ?? speaker.role) :
    speaker.role

  return (
    <div className="flex flex-col gap-2">
      {/* Photo */}
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
        <Image
          src={speaker.img}
          alt={displayName}
          fill
          className="object-cover object-top transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </div>

      {/* Name */}
      <p className="font-bold text-[#121e52] dark:text-white text-sm leading-snug mt-1">
        {displayName}
      </p>

      {/* Country badge */}
      {speaker.country && (
        <div className="flex items-center gap-1 w-fit rounded-full border border-[#2f4fa3]/30 bg-[#eef1fb] dark:bg-[#2f4fa3]/20 px-2 py-0.5">
          <Image src="/speakers/badge.svg" alt="" width={13} height={13} className="shrink-0" />
          <span className="text-[11px] text-[#2f4fa3] font-medium">{speaker.country}</span>
        </div>
      )}

      {/* Role */}
      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
        {displayRole}
      </p>
    </div>
  )
}

const Speakers = () => {
  const t = useTranslations('speakers')
  const [expanded, setExpanded] = useState(false)
  const locale = useAppStore(s => s.locale)

  return (
    <section id="speakers" className="w-full py-12 md:py-20 bg-[#f7f9fc] dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-8 md:gap-10">

        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2f4fa3]">
            {t('title')} <span className="text-[#5fe3e3]">{t('year')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-8">
          {initialSpeakers.map((speaker, i) => (
            <div key={i} className={!expanded && i >= 4 ? "hidden sm:block" : ""}>
              <SpeakerCard speaker={speaker} locale={locale} />
            </div>
          ))}
        </div>

        {expanded && (
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-8 animate-[fadeIn_0.3s_ease]">
            {moreSpeakers.map((speaker, i) => (
              <div
                key={`more-${i}`}
                className="w-[calc(50%-10px)] sm:w-[calc(33.333%-14px)] md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)]"
              >
                <SpeakerCard speaker={speaker} locale={locale} />
              </div>
            ))}
          </div>
        )}

        {/* Toggle button */}
        <div className="text-center">
          <button
            onClick={() => setExpanded(prev => !prev)}
            className="w-full sm:w-auto h-12 sm:h-14 px-10 rounded-xl text-base font-medium text-white bg-gradient-to-r from-[#2f4fa3] to-[#5fe3e3] shadow-lg hover:opacity-90 transition"
          >
            {expanded ? t('hideAll') : t('showAll')}
          </button>
        </div>

      </div>
    </section>
  )
}

export default Speakers
