const Participate = () => {
  const benefits = [
    {
      title: "Актуальная экспертиза",
      description:
        "Практический взгляд на тренды, вызовы и возможности в сфере исламских финансов и бизнеса.",
    },
    {
      title: "Сильные спикеры",
      description:
        "Доступ к мнению лидеров отрасли, регуляторов, международных экспертов и практиков.",
    },
    {
      title: "Новые партнерства",
      description:
        "Возможность установить деловые контакты и обсудить совместные инициативы.",
    },
    {
      title: "Региональный и международный диалог",
      description:
        "Обсуждение вопросов, значимых для Казахстана, Центральной Азии и международного рынка.",
    },
    {
      title: "Практическая польза",
      description:
        "Кейсы, решения и идеи, которые можно применять в профессиональной деятельности.",
    },
    {
      title: "Видимость для бизнеса и институтов",
      description:
        "Площадка для позиционирования, партнерства и профессионального присутствия в отрасли.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3">
            Почему стоит участвовать
          </h2>
          <div className="w-24 h-1  mx-auto rounded-full" />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#2f4fa3] hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                {/* Icon / Accent */}
                <div className="flex-1 flex flex-col items-center ">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 transition-colors tex-align-center">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12 md:mt-16">
      <button className="h-14 px-8 rounded-xl text-lg font-medium text-white bg-gradient-to-r from-[#2f4fa3] to-[#5fe3e3] shadow-lg hover:opacity-90 transition">
          Зарегистрироваться
        </button>
        </div>
      </div>
    </section>
  );
};

export default Participate;