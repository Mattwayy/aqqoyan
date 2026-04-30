'use client'

import { useTranslations } from 'next-intl'
import { useAppStore } from '@/lib/store'
import Image from "next/image"


const partners = [
  {
    src: "/partners/alif.svg",
    srcDark: "/partners/alif-light.png",
    alt: "Alif Uzbekistan",
    name: "Alif Uzbekistan",
    descriptionKz: "Alif Uzbekistan — Орталық Азиядағы ең динамикалық исламдық финтех жобаларының бірі, Тәжікстанда құрылған. Alif инновациялық сандық өнімдері, ыңғайлы мобильді банкингі және исламдық қаржы принциптеріне сәйкес келетін ашық шарттарымен танымал. Өз қызметінде Alif жоғары технологияны рухани және этикалық құндылықтармен үйлестіреді.",
    descriptionEng:
      "Alif Uzbekistan is one of the most dynamic Islamic fintech projects in Central Asia, founded in Tajikistan. Alif is known for its innovative digital products, convenient mobile banking, and transparent terms that comply with the principles of Islamic finance. In its operations, Alif combines high technology with spiritual and ethical values.",
    description:
      "Alif Uzbekistan — один из самых динамично развивающихся исламских финтех проектов Центральной Азии, основанный в Таджикистане. Alif известен своими инновационными цифровыми продуктами, удобным мобильным банкингом и прозрачными условиями, соответствующими принципам Исламского финансирования. В своей деятельности Alif соединяет высокие технологии с духовными и этическими ценностями.",
  },
  {
    src: "/partners/its.svg",
    alt: "ITS",
    name: "ITS",
    describeionKz: "ITS — қаржы нарығының өкілі ретінде МФЦА юрисдикциясы аясында жұмыс істейтін халықаралық сауда алаңы. ITS инвесторларға АҚШ, Еуропа және Азияның жетекші компанияларының акциялары сияқты 3 200-ден астам құралдарға қол жеткізу мүмкіндігін ұсынады.\nПлатформаның негізгі өнімдерінің бірі - ITS Shariah ETF - Шариғат принциптеріне сәйкес келетін Орталық Азия мен Кавказдағы алғашқы индекс қоры. Қорға 30 ірі халықаралық компанияның акциялары кіреді.\n2025 жылы ITS индексі АҚШ долларымен 23,6% өсті.",
    descriptionEng:
      "ITS — international trading platform operating under the jurisdiction of the Financial Market Authority. ITS provides investors with access to over 3,200 instruments, including shares of leading companies from the USA, Europe, and Asia.\nOne of the key products of the platform is the ITS Shariah ETF – the first index fund in Central Asia and the Caucasus that complies with Sharia principles. The fund includes shares of 30 of the largest international companies.\nIn 2025, the ITS index showed a growth of 23.6% in US dollars.",
    descriptionKz:
      "ITS — халықаралық сауда алаңы, МФЦА юрисдикциясы аясында жұмыс істейтін. ITS инвесторларға АҚШ, Еуропа және Азияның жетекші компанияларының акциялары сияқты 3 200-ден астам құралдарға қол жеткізу мүмкіндігін ұсынады.\nПлатформаның негізгі өнімдерінің бірі - ITS Shariah ETF - Шариғат принциптеріне сәйкес келетін Орталық Азия мен Кавказдағы алғашқы индекс қоры. Қорға 30 ірі халықаралық компанияның акциялары кіреді.\n2025 жылы ITS индексі АҚШ долларымен 23,6% өсті.",
    description:
      "ITS — международная торговая площадка, действующая в юрисдикции МФЦА. ITS предоставляет инвесторам доступ к 3200+ инструментам, включая акции ведущих компаний США, Европы и Азии.\nОдин из ключевых продуктов площадки – ITS Shariah ETF – первый индексный фонд в Центральной Азии и Закавказье, соответствующий принципам шариата. В состав фонда входят акции 30 крупнейших международных компаний.\nВ 2025 г. индекс ITSS показал рост 23,6% в долларах США.",
  },
  {
    src: "/partners/kic.svg",
    srcDark: "/partners/kic-light.png",
    alt: "KIC leasing",
    name: "KIC leasing",
    descriptionKz: "KIC — Казахстандағы бірінші исламдық лизинг компаниясы, Шариғат принциптеріне сәйкес жұмыс істейтін. 2013 жылдан бастап компания кішкене және орташа кәсіпкерлерге прозральді және этикалық шарттар бойынша финанстарға қол жеткізу ұсынады.\nKIC исламдық финанстардың дамуында маңызды рөл атқарады, реальный экономиканы күштеп тұтыну үшін сенімді құралдар ұсынады. Компанияның іс-шаралары жоғары технологияны традициялық духовдық мәндермен бірлескен прозральді финансалық экосистеманы дамыта отырады.",
    descriptionEng:
      "KIC — the first leasing company in Kazakhstan operating strictly according to Sharia principles. Since 2013, the company has been providing small and medium-sized businesses with access to financing on transparent and ethical terms.\nKIC plays an important role in the development of Islamic finance, offering reliable tools for strengthening the real economy. The company's activities are focused on developing a transparent financial ecosystem where high technology harmoniously combines with traditional spiritual values.",
    description:
     "Компания KIC — первая лизинговая организация в Казахстане, работающая строго по принципам Шариата. С 2013 года компания обеспечивает малый и средний бизнес доступом к финансированию на прозрачных и этичных условиях.\nKIC выступает важным звеном в развитии исламских финансов, предлагая надежные инструменты для укрепления реального сектора экономики. Деятельность организации направлена на развитие прозрачной финансовой экосистемы, где высокие технологии гармонично сочетаются с традиционными духовными ценностями.",
  },
  {
    src: "/partners/proji.svg",
    alt: "Proji.kz",
    name: "Proji.kz",
    descriptionKz: 'Proji.kz — бұл бизнес жүйесін жүйелеуге арналған AI платформасы, ол коммуникацияларды, құжаттарды, идеяларды және келісімдерді түсінікті тапсырмаларға, аналитикаға және басқару әрекеттеріне айналдыруға көмектеседі. Бұл ақпаратты тек сақтау ғана емес, тәртіп, жылдамдық және өсу үшін пайдаланғысы келетін компанияларға қажет.\n\nSunnet Business Technologies командасы әзірлеген — ол бизнеске нақты тапсырмаларға арналған AI және автоматизацияны енгізуге көмектеседі.',
    descriptionEng:
      "Proji.kz — this is an AI platform for business systematization, which helps transform communications, documents, ideas, and agreements into understandable tasks, analytics, and management actions. It is needed by companies that want to not just store information but use it for order, speed, and growth.\n\nDeveloped by the Sunnet Business Technologies team — which helps businesses implement AI and automation for real-world tasks.",
    description:
      "Proji.kz — это ИИ-платформа для систематизации бизнеса, которая помогает превращать переписки, документы, идеи и договоренности в понятные задачи, аналитику и управленческие действия. Она нужна компаниям, которые хотят не просто хранить информацию, а использовать её для порядка, скорости и роста.\n\nРазработана командой Sunnet Business Technologies — которая помогает бизнесу внедрять ИИ и автоматизацию под реальные задачи.",
  },
    {
    src: "/partners/money.svg",
    alt: "Money",
    name: "Money",
    descriptionKz:
      "Money — банк, МФО және қаржы ұйымдарына арналған скоринг шешімдерін ұсынатын компания — клиенттерді бағалау, тәуекелдерді азайту және процестерді цифрландыру. Біздің шешімдер исламдық қаржы нарығының қатысушыларына да қолданылады, оның ішінде оның принциптеріне сәйкестікті автоматтандыру үшін.",
    descriptionEng:
      "Money is a company that offers scoring solutions for banks, microfinance organizations, and financial institutions — customer assessment, risk reduction, and process digitalization. Our solutions are also applicable to participants in the Islamic finance market, including for automating compliance checks with its principles.",
    description:
     "Компания Money предлагает скоринговые решения для банков, МФО и финансовых организаций — оценка клиентов, снижение рисков, цифровизация процессов. Наши решения также применимы для участников рынка исламского финансирования, в том числе для автоматизации проверок на соответствие его принципам."
  },
  {
    src: "/partners/ailat-dark.svg",
    srcDark: "/partners/ailat-light.png",
    alt: "Ailat",
    name: "Ailat",
    description:
      "Ailat — экосистема исламских финансовых и технологических сервисов, ориентированная на укрепление семейного благосостояния и устойчивое развитие общества. Компания объединяет создание шариат-совместимых финансовых продуктов, экспертный консалтинг и инновации на базе искусственного интеллекта, делая этичные и прозрачные финансовые решения доступными каждому.",
    descriptionEng:
      "Ailat is an ecosystem of Islamic financial and technology services focused on strengthening family well-being and sustainable development of society. The company combines the creation of Sharia-compliant financial products, expert consulting, and AI-based innovations, making ethical and transparent financial solutions accessible to everyone.",
    descriptionKz:
      "Ailat — отбасылық әл-ауқатты нығайтуға және қоғамның тұрақты дамуына бағытталған исламдық қаржылық және технологиялық сервистер экожүйесі. Компания шариатқа сәйкес қаржылық өнімдерді жасауды, сарапшылық кеңесті және жасанды интеллект негізіндегі инновацияларды біріктіреді, этикалық және мөлдір қаржылық шешімдерді барлығына қолжетімді етеді.",
  },
  {
    src: "/partners/al-safi-dark.svg",
    srcDark: "/partners/al-safi-light.png",
    alt: "Al Safi Bank",
    name: "Al Safi Bank",
    description:
      "Al Safi Bank — первый исламский банк на территории Astana International Financial Centre, предлагающий современные и прозрачные банковские услуги. Банк сочетает клиентоориентированный подход, соответствие стандартам AAOIFI и строгий контроль Шариатского совета. Опытная команда с более чем 20-летней экспертизой обеспечивает надёжность, безопасность и заботу о каждом клиенте, поддерживая финансовое благополучие на всех этапах.",
    descriptionEng:
      "Al Safi Bank is the first Islamic bank in the Astana International Financial Centre, offering modern and transparent banking services. The bank combines a client-oriented approach, compliance with AAOIFI standards, and strict Sharia board oversight. An experienced team with over 20 years of expertise ensures reliability, security, and care for every client, supporting financial well-being at every stage.",
    descriptionKz:
      "Al Safi Bank — Astana International Financial Centre аумағындағы алғашқы исламдық банк, заманауи және мөлдір банктік қызметтерді ұсынады. Банк клиентке бағытталған тәсілді, AAOIFI стандарттарына сәйкестікті және Шариат кеңесінің қатаң бақылауын біріктіреді. 20 жылдан астам тәжірибесі бар тәжірибелі команда әрбір клиентке сенімділікті, қауіпсіздікті және қамқорлықты қамтамасыз етеді, барлық кезеңде қаржылық игілікті қолдайды.",
  },
]

const Partners = () => {
  const t = useTranslations('partners')
  const locale = useAppStore((state) => state.locale)

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
                  className={`object-contain h-28 w-44 ${partner.srcDark ? 'dark:hidden' : ''}`}
                />
                {partner.srcDark && (
                  <Image
                    src={partner.srcDark}
                    alt={partner.alt}
                    width={176}
                    height={112}
                    className="object-contain h-28 w-44 hidden dark:block"
                  />
                )}
              </div>

              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {locale === 'en'
                  ? partner.descriptionEng
                  : locale === 'kz'
                    ? (partner.descriptionKz ?? partner.description)
                    : partner.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Partners
