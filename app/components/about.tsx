import RegisterButton from "./RegisterButton"

export default function About() {
  return (
    <section className="w-full py-12 md:py-20 bg-white text-[#121e52]">
      <div className="mx-auto max-w-4xl px-5 flex flex-col items-center text-center gap-6 md:gap-10">

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          О форуме
        </h2>

        <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#121e52]/80">
          <span className="font-semibold">
            Islamic Finance and Business Forum 2026
          </span>{" "}
          — это международный форум, объединяющий экспертов, представителей
          бизнеса, финансовых институтов, регуляторов, инвесторов и
          профессионального сообщества для обсуждения актуальных вопросов
          развития исламских финансов и бизнеса.
          <br /><br />
          Форум создает пространство для содержательного диалога, обмена
          практическим опытом, установления новых партнерств и обсуждения
          ключевых вызовов и возможностей отрасли.
        </p>

        <RegisterButton className="w-full sm:w-auto h-12 sm:h-14 px-8 rounded-xl text-base sm:text-lg font-medium text-white bg-gradient-to-r from-[#2f4fa3] to-[#5fe3e3] shadow-lg hover:opacity-90 transition" />

      </div>
    </section>
  )
}
