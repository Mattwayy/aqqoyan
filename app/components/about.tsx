export default function About() {
  return (
    <section className="w-full py-20 bg-white text-[#121e52]">
      <div className="mx-auto max-w-4xl px-6 flex flex-col items-center text-center gap-10">

        {/* TITLE */}
        <h2 className="text-3xl sm:text-4xl font-bold">
          О форуме
        </h2>

        {/* TEXT */}
        <p className="text-base sm:text-lg leading-relaxed text-[#121e52]/80">
          <span className="font-semibold">
            Islamic Finance and Business Forum 2026
          </span>{" "}
          — это международный форум, объединяющий экспертов, представителей
          бизнеса, финансовых институтов, регуляторов, инвесторов и
          профессионального сообщества для обсуждения актуальных вопросов
          развития исламских финансов и бизнеса.
          <br />
          <br />
          Форум создает пространство для содержательного диалога, обмена
          практическим опытом, установления новых партнерств и обсуждения
          ключевых вызовов и возможностей отрасли.
        </p>

        {/* ACTION */}
        <button className="h-14 px-8 rounded-xl text-lg font-medium text-white bg-gradient-to-r from-[#2f4fa3] to-[#5fe3e3] shadow-lg hover:opacity-90 transition">
          Зарегистрироваться
        </button>

      </div>
    </section>
  );
}