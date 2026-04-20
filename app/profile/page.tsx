import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import QRCode from 'qrcode'
import { authOptions } from '@/lib/authOptions'
import Footer from '@/app/components/footer'
import ProfileHeader from '@/app/components/ProfileHeader'
import Image from 'next/image'

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  // temporarily disabled auth check for testing
  // if (!session?.user) redirect('/?login=1')

  const user = session?.user ?? {
    id: 'test',
    name: 'Тест',
    surname: 'Пользователь',
    email: 'test@example.com',
    phone: '+7 999 000 00 00',
    org: 'Тестовая организация',
    position: 'Менеджер',
    qrPayload: 'IFBF2026:test-id',
  }

  const qrSource = user.qrPayload ?? `IFBF2026:${user.id}`
  const qrSvg = await QRCode.toString(qrSource, {
    type:   'svg',
    margin: 1,
    color:  { dark: '#121e52', light: '#ffffff' },
  })

  return (
    <div className="min-h-screen bg-[#f4f6fb] dark:bg-slate-900 flex flex-col transition-colors">

      <ProfileHeader />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-10 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-[#121e52] dark:text-white">Мой профиль</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">

          {/* ── Left card ── */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 sm:p-8 flex flex-col gap-6 transition-colors">

            <div className="flex items-start gap-4 sm:gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
                  <rect width="80" height="80" fill="#e2e8f0" className="dark:fill-slate-600" />
                  <circle cx="40" cy="30" r="16" fill="#94a3b8" />
                  <ellipse cx="40" cy="68" rx="24" ry="18" fill="#94a3b8" />
                </svg>
              </div>

              {/* Name + contacts */}
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5fe3e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Участник форума
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#121e52] dark:text-white truncate">
                  {user.name} {user.surname ?? ''}
                </h2>
                <div className="flex flex-wrap gap-3 mt-1">
                  {user.phone && (
                    <span className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                      <Image src="/profile/phone.svg" alt="" width={16} height={16} className="shrink-0 opacity-40 dark:invert" />
                      {user.phone}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 min-w-0">
                    <Image src="/profile/mail.svg" alt="" width={16} height={16} className="shrink-0 opacity-40 dark:invert" />
                    <span className="truncate">{user.email}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-700" />

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <Image src="/profile/briefcase.svg" alt="" width={18} height={18} className="shrink-0 opacity-40 dark:invert" />
                {user.position ?? 'Должность не указана'}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <Image src="/profile/organization.svg" alt="" width={18} height={18} className="shrink-0 opacity-40 dark:invert" />
                {user.org ?? 'Организация не указана'}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <Image src="/profile/userlist.svg" alt="" width={18} height={18} className="shrink-0 opacity-40 dark:invert" />
                Участник
              </div>
            </div>
          </div>

          {/* ── QR card ── */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 flex flex-col items-center justify-center gap-4 min-h-[220px] transition-colors">
            <div
              className="qr-wrapper w-44 h-44 rounded-xl overflow-hidden"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
            <p className="text-xs font-semibold text-[#121e52] dark:text-white tracking-wide uppercase">
              Электронный бейдж / QR
            </p>
          </div>

        </div>
      </main>

      <Footer hideAuthLink />
    </div>
  )
}
