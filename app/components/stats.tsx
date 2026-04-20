import RegisterButton from "./RegisterButton"

const stats = [
  {
    cls: "card--1",
    value: "250+",
    label: "участников из стран\nСНГ, Европы и\nБлижнего Востока",
  },
  {
    cls: "card--2",
    value: "24,4+ млн",
    label: "человек —\nобщий месячный\nохват СМИ",
  },
  {
    cls: "card--3",
    value: "4 языка",
    label: "освещения — русский,\nказахский, узбекский и\nанглийский",
  },
  {
    cls: "card--4",
    value: "70%",
    label: "участников —\nпредставители банков,\nинвестфондов и бизнеса",
  },
]

const Stats = () => {
  return (
    <div id="stats" className="w-full py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-8 md:gap-12">

        {/* Header */}
        <div className="text-center flex flex-col gap-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#121e52]">
            Форум в цифрах
          </h2>
          <p className="text-sm sm:text-base text-[#121e52]/70">
            Ключевые результаты{" "}
            <span className="font-semibold text-[#121e52]">
              Islamic Finance and Business Forum 2025
            </span>
          </p>
        </div>

        {/* Cards — 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {stats.map((s) => (
            <div
              key={s.cls}
              className="relative h-[160px] sm:h-[200px] md:h-[240px] rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <div className={s.cls} />
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
