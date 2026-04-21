'use client'

import { useTranslations } from 'next-intl'
import { useAppStore } from '@/lib/store'
import Image from "next/image"

const partners = [
  {
    src: "/partners/alif.svg",
    alt: "Alif Uzbekistan",
    name: "Alif Uzbekistan",
    descriptionEng:
      "Alif Uzbekistan is one of the most dynamic Islamic fintech projects in Central Asia, founded in Tajikistan. Alif is known for its innovative digital products, convenient mobile banking, and transparent terms that comply with the principles of Islamic finance. In its operations, Alif combines high technology with spiritual and ethical values.",
    description:
      "Alif Uzbekistan — один из самых динамично развивающихся исламских финтех проектов Центральной Азии, основанный в Таджикистане. Alif известен своими инновационными цифровыми продуктами, удобным мобильным банкингом и прозрачными условиями, соответствующими принципам Исламского финансирования. В своей деятельности Alif соединяет высокие технологии с духовными и этическими ценностями.",
  },
  {
    src: "/partners/its.svg",
    alt: "ITS",
    name: "ITS",
    descriptionEng:
      "ITS — international trading platform operating under the jurisdiction of the Financial Market Authority. ITS provides investors with access to over 3,200 instruments, including shares of leading companies from the USA, Europe, and Asia.\nOne of the key products of the platform is the ITS Shariah ETF – the first index fund in Central Asia and the Caucasus that complies with Sharia principles. The fund includes shares of 30 of the largest international companies.\nIn 2025, the ITS index showed a growth of 23.6% in US dollars.",
    description:
      "ITS — международная торговая площадка, действующая в юрисдикции МФЦА. ITS предоставляет инвесторам доступ к 3200+ инструментам, включая акции ведущих компаний США, Европы и Азии.\nОдин из ключевых продуктов площадки – ITS Shariah ETF – первый индексный фонд в Центральной Азии и Закавказье, соответствующий принципам шариата. В состав фонда входят акции 30 крупнейших международных компаний.\nВ 2025 г. индекс ITSS показал рост 23,6% в долларах США.",
  },
  {
    src: "/partners/kic.svg",
    alt: "KIC leasing",
    name: "KIC leasing",
    descriptionEng:
      "KIC — the first leasing company in Kazakhstan operating strictly according to Sharia principles. Since 2013, the company has been providing small and medium-sized businesses with access to financing on transparent and ethical terms.\nKIC plays an important role in the development of Islamic finance, offering reliable tools for strengthening the real economy. The company's activities are focused on developing a transparent financial ecosystem where high technology harmoniously combines with traditional spiritual values.",
    description:
      "АО «Казахстанская Иджара Компания» — первая лизинговая организация в Казахстане, работающая строго по принципам Шариата. С 2013 года компания обеспечивает малому и среднему бизнесу доступ к финансированию на прозрачных и этичных условиях.\nKIC выступает важным звеном в развитии исламских финансов, предлагая надежные инструменты для укрепления реального сектора экономики. Деятельность организации направлена на развитие прозрачной финансовой экосистемы, где высокие технологии гармонично сочетаются с традиционными духовными ценностями.",
  },
  {
    src: "/partners/proji.svg",
    alt: "Proji.kz",
    name: "Proji.kz",
    descriptionEng:
      "Proji.kz — this is an AI platform for business systematization, which helps transform communications, documents, ideas, and agreements into understandable tasks, analytics, and management actions. It is needed by companies that want to not just store information but use it for order, speed, and growth.\n\nDeveloped by the Sunnet Business Technologies team — which helps businesses implement AI and automation for real-world tasks.",
    description:
      "Proji.kz — это ИИ-платформа для систематизации бизнеса, которая помогает превращать переписки, документы, идеи и договоренности в понятные задачи, аналитику и управленческие действия. Она нужна компаниям, которые хотят не просто хранить информацию, а использовать её для порядка, скорости и роста.\n\nРазработана командой Sunnet Business Technologies — которая помогает бизнесу внедрять ИИ и автоматизацию под реальные задачи.",
  },
    {
    src: "/partners/money.svg",
    alt: "Money",
    name: "Money",
    descriptionEng:
      "Money is a company that offers scoring solutions for banks, microfinance organizations, and financial institutions — customer assessment, risk reduction, and process digitalization. Our solutions are also applicable to participants in the Islamic finance market, including for automating compliance checks with its principles.",
    description:
     "Компания Money предлагает скоринговые решения для банков, МФО и финансовых организаций — оценка клиентов, снижение рисков, цифровизация процессов. Наши решения также применимы для участников рынка исламского финансирования, в том числе для автоматизации проверок на соответствие его принципам."
  },
]

const Partners = () => {
  const t = useTranslations('partners')
  const locale = useAppStore((state) => state.locale)
  const isEn = locale === 'en'

  return (
    <section id="partners" className="w-full py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#121e52] dark:text-white text-center">
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map((partner, index) => (
            <div
              key={partner.alt}
              className={`flex flex-col gap-5 rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-8 shadow-sm dark:shadow-slate-900/50 ${
                index === partners.length - 1 ? 'last-col' : ''
              }`}
            > 
          
              <span className="text-sm font-bold text-[#121e52] dark:text-white uppercase tracking-wide">
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

              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                { isEn ? partner.descriptionEng : partner.description }
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Partners
