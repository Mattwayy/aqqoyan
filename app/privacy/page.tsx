import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/logo.svg'
import Footer from '@/app/components/footer'

export const metadata = {
  title: 'Политика конфиденциальности — IFBF 2026',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f4f6fb] dark:bg-slate-900 flex flex-col">

      {/* ── Header ── */}
      <header
        style={{ backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        className="w-full border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-4">
          <Link href="/" className="flex items-center shrink-0">
            <Image src={logo} alt="IFBF 2026" className="h-7 w-auto" />
          </Link>
          <div className="flex-1" />
          <Link
            href="/"
            className="px-4 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            ← Главная
          </Link>
        </div>
      </header>

      {/* ── Content ── */}
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-10">

          <h1 className="text-2xl font-bold text-[#121e52] dark:text-white mb-1">
            Политика конфиденциальности
          </h1>
          <p className="text-sm text-[#5fe3e3] font-medium mb-8">
            Islamic Finance and Business Forum 2026
          </p>

          {/* 1 */}
          <h2 className="text-lg font-bold text-[#121e52] dark:text-white mt-6 mb-2">
            1. Общие положения
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Настоящая Политика конфиденциальности (далее — «Политика») описывает, какие персональные данные
            собирает Организатор форума Islamic Finance and Business Forum 2026 (далее — «Организатор»),
            в каких целях они используются и каким образом защищаются. Политика распространяется на всех
            пользователей, прошедших или проходящих регистрацию на сайте форума. Регистрируясь на сайте,
            Пользователь даёт явное согласие на обработку своих персональных данных на условиях,
            описанных в настоящей Политике.
          </p>

          {/* 2 */}
          <h2 className="text-lg font-bold text-[#121e52] dark:text-white mt-6 mb-2">
            2. Какие данные мы собираем
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
            В процессе регистрации участника форума Организатор собирает следующие категории персональных данных:
          </p>
          <ul className="list-none flex flex-col gap-1.5 mb-3">
            {[
              'Имя и фамилия (ФИО)',
              'Номер мобильного телефона',
              'Адрес электронной почты',
              'Должность',
              'Организация / место работы',
              'Сфера деятельности',
              'Страна и город проживания / работы',
              'Предпочтительный язык общения',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#5fe3e3] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Пароль хранится исключительно в виде хеша (необратимого криптографического преобразования)
            и не может быть восстановлен Организатором в открытом виде.
          </p>

          {/* 3 */}
          <h2 className="text-lg font-bold text-[#121e52] dark:text-white mt-6 mb-2">
            3. Цели обработки данных
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Собранные персональные данные используются исключительно в следующих целях:
            идентификация и аккредитация участника на форуме; формирование и выдача электронного бейджа
            с персональным QR-кодом, позволяющим быстро верифицировать участника на входе и на площадках форума;
            информирование о программе, изменениях в расписании и организационных вопросах;
            подготовка статистики мероприятия в обезличенном виде; соблюдение требований применимого законодательства.
            Передача данных третьим лицам в коммерческих целях без согласия Пользователя не осуществляется.
          </p>

          {/* 4 */}
          <h2 className="text-lg font-bold text-[#121e52] dark:text-white mt-6 mb-2">
            4. Хранение и защита данных
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Персональные данные хранятся на защищённых серверах с применением современных технических
            и организационных мер безопасности: шифрование соединений (HTTPS/TLS), хеширование паролей,
            разграничение прав доступа к базам данных. Данные хранятся в течение срока, необходимого
            для целей регистрации и проведения форума, а также в течение периода, предусмотренного
            применимым законодательством об архивировании и отчётности. После истечения указанного
            срока данные удаляются или обезличиваются.
          </p>

          {/* 5 */}
          <h2 className="text-lg font-bold text-[#121e52] dark:text-white mt-6 mb-2">
            5. Права субъекта данных
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Пользователь вправе в любой момент: запросить доступ к своим персональным данным и получить
            их копию; потребовать исправления неточных или устаревших сведений; отозвать согласие на
            обработку данных и потребовать их удаления (с учётом ограничений, установленных законодательством);
            подать жалобу в уполномоченный орган по защите персональных данных страны своего проживания.
            Для реализации перечисленных прав Пользователь направляет запрос по контактным данным,
            указанным в разделе 6 настоящей Политики. Организатор рассматривает обращения в разумные сроки,
            но не позднее 30 календарных дней с момента получения запроса.
          </p>

          {/* 6 */}
          <h2 className="text-lg font-bold text-[#121e52] dark:text-white mt-6 mb-2">
            6. Контакты
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            По всем вопросам, связанным с обработкой персональных данных, а также для реализации
            своих прав как субъекта данных, Пользователь может обратиться к Организатору по электронной
            почте, указанной в разделе «Контакты» на главной странице сайта, или через официальные
            каналы связи форума. В обращении необходимо указать имя, фамилию, адрес электронной почты,
            использованный при регистрации, и суть запроса. Организатор обязуется соблюдать конфиденциальность
            таких обращений.
          </p>

          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Дата последнего обновления: апрель 2026 г.
            </p>
          </div>

        </div>
      </main>

      <Footer hideAuthLink />
    </div>
  )
}
