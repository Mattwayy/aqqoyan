import Image from "next/image"
import RegisterButton from "./RegisterButton"

const rows = [
  [
    { icon: "/prog/greeting.svg", time: "9.30 – 9.40", title: "Приветственное слово", description: "", extra: null },
    { icon: "/prog/fireside.svg", time: "9.40 – 10.00", title: "Fireside Chat", description: "Текущее состояние рынка исламских финансов и бизнеса.", extra: null },
    { icon: "/prog/showcase.svg", time: "10.00 – 10.50", title: "Showcase сессия", description: "Практика исламского финансового рынка: реализованные кейсы.", extra: null },
  ],
  [
    { icon: "/prog/coffie.svg", time: "10.50 – 11.20", title: "Кофе-брейк", description: "", extra: null },
    { icon: "/prog/session.svg", time: "11.20 – 12.10", title: "Панельная сессия", description: "Регуляторный диалог и дальнейшие шаги развития.", extra: null },
    { icon: "/prog/coffie.svg", time: "12.10 – 14.00", title: "Обед", description: "", extra: null },
  ],
  [
    { icon: "/prog/showcase.svg", time: "14.00 – 14.50", title: "Showcase сессия", description: "Инвестиционные решения и инструменты в исламских финансах.", extra: null },
    { icon: "/prog/coffie.svg", time: "14.50 – 15.20", title: "Кофе-брейк", description: "", extra: null },
    {
      icon: "/prog/presentation.svg",
      time: "15.20 – 16.20",
      title: "Презентация Аналитического доклада",
      description: "Стратегии продвижения Центральной Азии как единого инвестиционного направления.",
      extra: { title: "Панельная сессия", description: "Международный опыт и привлечение инвестиций." },
    },
  ],
]

/* flatten rows to a single list for mobile */
const allItems = rows.flat()

function ProgramCard({ item }: { item: typeof allItems[0] }) {
  return (
    <div className="flex flex-col gap-2 sm:gap-3 rounded-2xl border border-slate-100 bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <Image src={item.icon} alt={item.title} width={40} height={40} className="object-contain w-9 h-9 sm:w-12 sm:h-12 mx-auto" />
      <span className="text-xs text-slate-400 font-medium text-center">{item.time}</span>
      <p className="text-sm sm:text-base font-bold text-[#121e52] leading-snug text-center">{item.title}</p>
      {item.description && (
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed text-center">{item.description}</p>
      )}
      {item.extra && (
        <div className="flex flex-col gap-1 border-t border-slate-100 pt-3 mt-1">
          <p className="text-sm font-bold text-[#121e52] text-center">{item.extra.title}</p>
          <p className="text-xs text-slate-500 leading-relaxed text-center">{item.extra.description}</p>
        </div>
      )}
    </div>
  )
}

export default function Programs() {
  return (
    <section id="programs" className="w-full py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-8 md:gap-12">

        {/* Header */}
        <div className="flex flex-col items-center gap-3 md:gap-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#121e52]">
            Программа форума
          </h2>
          <p className="max-w-2xl text-slate-600 text-sm sm:text-base leading-relaxed">
            В программе{" "}
            <span className="font-semibold text-slate-800">Islamic Finance and Business Forum 2026</span>
            {" "}— пленарные сессии, тематические панели, экспертные выступления,
            практические обсуждения и возможности для профессионального нетворкинга.
          </p>
        </div>

        {/* ── Mobile: single-column flat list ── */}
        <div className="flex flex-col gap-3 sm:hidden">
          {allItems.map((item, i) => (
            <ProgramCard key={i} item={item} />
          ))}
        </div>

        {/* ── Desktop: 3-col grid with timeline dots ── */}
        <div className="hidden sm:flex flex-col gap-0">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col">
              {/* Timeline dots */}
              <div className="grid grid-cols-3">
                {row.map((_, colIndex) => (
                  <div key={colIndex} className="flex items-center">
                    <div className={`flex-1 h-px ${colIndex === 0 ? "bg-transparent" : "bg-slate-200"}`} />
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-slate-300" />
                      <div className="w-2 h-2 rounded-full bg-[#5fe3e3]" />
                    </div>
                    <div className={`flex-1 h-px ${colIndex === 2 ? "bg-transparent" : "bg-slate-200"}`} />
                  </div>
                ))}
              </div>
              {/* Cards */}
              <div className="grid grid-cols-3 gap-4 py-4">
                {row.map((item, colIndex) => (
                  <ProgramCard key={colIndex} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <RegisterButton className="w-full sm:w-auto h-12 sm:h-14 px-10 rounded-xl text-base sm:text-lg font-medium text-white bg-gradient-to-r from-[#2f4fa3] to-[#5fe3e3] shadow-lg hover:opacity-90 transition" />
        </div>
      </div>
    </section>
  )
}
