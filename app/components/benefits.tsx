const Benefits = () => {
  const audienceData = [
    {
      title: "Финансовые институты",
      description:
        "Банки, исламские финансовые организации, инвестиционные и консалтинговые структуры."
    },
    {
      title: "Бизнес",
      description:
        "Компании и предприниматели, заинтересованные в партнерствах, развитии и новых инструментах."
    },
    {
      title: "Регуляторы и институты развития",
      description:
        "Представители государственных, квазигосударственных и отраслевых структур."
    },
    {
      title: "Эксперты и академические сообщества",
      description:
        "Исследователи, преподаватели, аналитики и специалисты профильных направлений."
    },
    {
      title: "Инвесторы",
      description:
        "Представители инвестиционного сообщества и структур, работающих в смежных направлениях."
    },
    {
      title: "Профессиональные сообщества",
      description:
        "Все, кто работает на стыке финансов, бизнеса, исламской экономики и устойчивого развития."
    }
  ];

  return (
    <div className="w-full py-20 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-12 px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
            Кому полезен форум
          </h2>
      
        </div>

        {/* Audience Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {audienceData.map((item, index) => (
            <div
              key={index}
              className="group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1  border-slate-100 hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-[#2f4fa3] transition-colors text-center">
                {item.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-center">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="h-14 px-8 rounded-xl text-lg font-medium text-white bg-gradient-to-r from-[#2f4fa3] to-[#5fe3e3] shadow-lg hover:opacity-90 transition transform hover:scale-105">
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
};

export default Benefits