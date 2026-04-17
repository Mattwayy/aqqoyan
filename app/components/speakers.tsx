'use client'

import Image from "next/image"
import { useState } from "react"

interface Speaker {
  img: string
  name: string
  country: string
  role: string
}

const initialSpeakers: Speaker[] = [
  {
    img: "/speakers/bek.jpg",
    name: "Берик Заиров",
    country: "Казахстан",
    role: "Генеральный директор & Соучредитель Mizan Islamic Finance",
  },
  {
    img: "/speakers/lim.jpg",
    name: "Lim Say Cheong",
    country: "Казахстан",
    role: "Главный советник по цифровым активам и исламским финансам ComTech Gold",
  },
  {
    img: "/speakers/muf.jpg",
    name: "Mufti Ibrahim Essa",
    country: "Казахстан",
    role: "Муфтий. Эксперт по шариатскому соответствию в исламских финансах",
  },
  {
    img: "/speakers/mur.jpg",
    name: "Мурат Кылышбай",
    country: "Казахстан",
    role: "Предприниматель. Шариатский советник (AAOIFI, CSAA)",
  },
  {
    img: "/speakers/ain.png",
    name: "Айнура Умаева",
    country: "Казахстан",
    role: "Учредитель и генеральный директор коммуникационного агентства TIDAM",
  },
  {
    img: "/speakers/mad.png",
    name: "Мадина Тукулова",
    country: "Казахстан",
    role: "Руководитель исламских финансов МФЦА",
  },
  {
    img: "/speakers/ber.jpg",
    name: "Бексултан Ануаров",
    country: "Казахстан",
    role: "Генеральный директор Paidax",
  },
  {
    img: "/speakers/mar.jpg",
    name: "Маргарита Агабекова",
    country: "Казахстан",
    role: "Заместитель Генерального директора Kazakhstan Ijara Company",
  },
  {
    img: "/speakers/lil.jpg",
    name: "Lilian Le Falher",
    country: "",
    role: "Основатель и управляющий директор ISTRAT Advisory",
  },
  {
    img: "/speakers/tim.jpg",
    name: "Нуржан Стамбакиев",
    country: "Казахстан",
    role: "PhD. Руководитель сектора «Исламские финансы» Духовного управления мусульман Казахстана",
  },
]

/* Placeholder second batch — duplicate until real data is ready */
const moreSpeakers: Speaker[] = [...initialSpeakers]

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Photo */}
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
        <Image
          src={speaker.img}
          alt={speaker.name}
          fill
          className="object-cover object-top transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </div>

      {/* Name */}
      <p className="font-bold text-[#121e52] text-sm leading-snug mt-1">
        {speaker.name}
      </p>

      {/* Country badge */}
      {speaker.country && (
        <div className="flex items-center gap-1 w-fit rounded-full border border-[#2f4fa3]/30 bg-[#eef1fb] px-2 py-0.5">
          <Image
            src="/speakers/badge.svg"
            alt=""
            width={13}
            height={13}
            className="shrink-0"
          />
          <span className="text-[11px] text-[#2f4fa3] font-medium">
            {speaker.country}
          </span>
        </div>
      )}

      {/* Role */}
      <p className="text-[11px] text-slate-500 leading-snug">
        {speaker.role}
      </p>
    </div>
  )
}

const Speakers = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="w-full py-12 md:py-20 bg-[#f7f9fc]">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-8 md:gap-10">

        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2f4fa3]">
            Спикеры <span className="text-[#5fe3e3]">2026</span>
          </h2>
        </div>

        {/* Initial speakers:
            mobile  → show first 4 only (cards 5-10 hidden until expanded)
            desktop → show all 10 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-8">
          {initialSpeakers.map((speaker, i) => (
            <div
              key={i}
              className={!expanded && i >= 4 ? "hidden sm:block" : ""}
            >
              <SpeakerCard speaker={speaker} />
            </div>
          ))}
        </div>

        {/* Extra 10 — visible only when expanded */}
        {expanded && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-8 animate-[fadeIn_0.3s_ease]">
            {moreSpeakers.map((speaker, i) => (
              <SpeakerCard key={`more-${i}`} speaker={speaker} />
            ))}
          </div>
        )}

        {/* Toggle button */}
        <div className="text-center">
          <button
            onClick={() => setExpanded(prev => !prev)}
            className="w-full sm:w-auto h-12 sm:h-14 px-10 rounded-xl text-base font-medium text-white bg-gradient-to-r from-[#2f4fa3] to-[#5fe3e3] shadow-lg hover:opacity-90 transition"
          >
            {expanded ? "Скрыть спикеров ↑" : "Смотреть всех спикеров ↓"}
          </button>
        </div>

      </div>
    </section>
  )
}

export default Speakers
