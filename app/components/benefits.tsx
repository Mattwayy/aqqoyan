import Image from "next/image"
import RegisterButton from "./RegisterButton"

const audienceData = [
  { icon: "/ben1.svg", title: "Финансовые институты", description: "Банки, исламские финансовые организации, инвестиционные и консалтинговые структуры." },
  { icon: "/ben2.svg", title: "Бизнес", description: "Компании и предприниматели, заинтересованные в партнерствах, развитии и новых инструментах." },
  { icon: "/ben3.svg", title: "Регуляторы и институты развития", description: "Представители государственных, квазигосударственных и отраслевых структур." },
  { icon: "/ben4.png", title: "Эксперты и академические сообщества", description: "Исследователи, преподаватели, аналитики и специалисты профильных направлений." },
  { icon: "/ben5.svg", title: "Инвесторы", description: "Представители инвестиционного сообщества и структур, работающих в смежных направлениях." },
  { icon: "/ben6.svg", title: "Профессиональные сообщества", description: "Все, кто работает на стыке финансов, бизнеса, исламской экономики и устойчивого развития." },
]

const Benefits = () => {
  return (
    <div id="benefits" className="w-full py-12 md:py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 md:gap-12 px-4">

        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
            Кому полезен форум
          </h2>
        </div>

        {/* 2 cols on mobile, 3 on lg */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {audienceData.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col items-center gap-2 sm:gap-4 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 sm:p-6 shadow-sm dark:shadow-slate-900/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#2f4fa3]/30 dark:bg-slate-800"
            >
              <div className="flex h-10 w-10 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#121e52]/5 dark:bg-white/5">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={40}
                  height={40}
                  className="object-contain w-5 h-5 sm:w-10 sm:h-10"
                />
              </div>
              <h3 className="text-xs sm:text-base md:text-xl font-semibold text-slate-800 dark:text-white group-hover:text-[#2f4fa3] transition-colors text-center leading-snug">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-center text-[11px] sm:text-sm leading-snug hidden sm:block">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <RegisterButton className="w-full sm:w-auto h-12 sm:h-14 px-8 rounded-xl text-base sm:text-lg font-medium text-white bg-gradient-to-r from-[#2f4fa3] to-[#5fe3e3] shadow-lg hover:opacity-90 transition" />
        </div>
      </div>
    </div>
  )
}

export default Benefits
