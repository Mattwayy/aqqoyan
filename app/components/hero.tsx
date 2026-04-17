import RegisterButton from "./RegisterButton"

export default function Hero() {
  return (
    <section className="hero w-full text-white limiter">
      <div className="mx-auto max-w-6xl px-4 flex flex-col items-center text-center gap-8 md:gap-12">

        {/* TITLE */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
          <span className="text-[#f7f9fc]">
            Islamic Finance and Business Forum{" "}
          </span>
          <span className="text-[#5fe3e3] block sm:inline">
            2026
          </span>
        </h1>

        {/* INFO */}
        <div className="max-w-2xl flex flex-col gap-4 md:gap-6">
          <p className="text-lg sm:text-2xl font-medium">
            21 мая 2026 <br />
            Астана, Международный финансовый центр «Астана»
          </p>
          <p className="text-sm sm:text-base text-white/70">
            Международная площадка для диалога, партнерств и обмена практиками
            в сфере исламских финансов и бизнеса.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <RegisterButton className="w-full sm:w-auto h-12 sm:h-14 px-8 rounded-xl text-base sm:text-lg font-medium bg-gradient-to-r from-[#2f4fa3] to-[#5fe3e3] shadow-lg hover:opacity-90 transition" />
          <button className="w-full sm:w-auto h-12 sm:h-14 px-8 rounded-xl text-base sm:text-lg font-medium text-[#5fe3e3] border border-[#5fe3e3]/40 backdrop-blur hover:bg-white/5 transition">
            Смотреть программу
          </button>
        </div>

      </div>
    </section>
  )
}
