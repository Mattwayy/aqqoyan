import Image from "next/image"

const partners = [
  {
    src: "/partners/alif.svg",
    alt: "Alif Uzbekistan",
    name: "Alif Uzbekistan",
    description:
      "Alif Uzbekistan — один из самых динамично развивающихся исламских финтех проектов Центральной Азии, основанный в Таджикистане. Alif известен своими инновационными цифровыми продуктами, удобным мобильным банкингом и прозрачными условиями, соответствующими принципам Исламского финансирования. В своей деятельности Alif соединяет высокие технологии с духовными и этическими ценностями.",
  },
  {
    src: "/partners/its.svg",
    alt: "ITS",
    name: "ITS",
    description:
      "ITS — международная торговая площадка, действующая в юрисдикции МФЦА. ITS предоставляет инвесторам доступ к 3200+ инструментам, включая акции ведущих компаний США, Европы и Азии.\nОдин из ключевых продуктов площадки – ITS Shariah ETF – первый индексный фонд в Центральной Азии и Закавказье, соответствующий принципам шариата. В состав фонда входят акции 30 крупнейших международных компаний.\nВ 2025 г. индекс ITSS показал рост 23,6% в долларах США.",
  },
  {
    src: "/partners/kic.svg",
    alt: "KIC leasing",
    name: "KIC leasing",
    description:
      "АО «Казахстанская Иджара Компания» — первая лизинговая организация в Казахстане, работающая строго по принципам Шариата. С 2013 года компания обеспечивает малому и среднему бизнесу доступ к финансированию на прозрачных и этичных условиях.\nKIC выступает важным звеном в развитии исламских финансов, предлагая надежные инструменты для укрепления реального сектора экономики. Деятельность организации направлена на развитие прозрачной финансовой экосистемы, где высокие технологии гармонично сочетаются с традиционными духовными ценностями.",
  },
  {
    src: "/partners/proji.svg",
    alt: "Proji.kz",
    name: "Proji.kz",
    description:
      "Proji.kz — это ИИ-платформа для систематизации бизнеса, которая помогает превращать переписки, документы, идеи и договоренности в понятные задачи, аналитику и управленческие действия. Она нужна компаниям, которые хотят не просто хранить информацию, а использовать её для порядка, скорости и роста.\n\nРазработана командой Sunnet Business Technologies — которая помогает бизнесу внедрять ИИ и автоматизацию под реальные задачи.",
  },
]

const Partners = () => {
  return (
    <section id="partners" className="w-full py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#121e52] text-center">
          Партнёры 2026
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.alt}
              className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <span className="text-sm font-bold text-[#121e52] uppercase tracking-wide">
                {partner.name}
              </span>

              <div className="flex items-center">
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={176}
                  height={112}
                  className="object-contain h-28 w-44"
                />
              </div>

              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                {partner.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Partners
