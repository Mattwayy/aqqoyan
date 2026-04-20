import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import QRCode from 'qrcode'
import { authOptions } from '@/lib/authOptions'
import logo from '@/public/logo.svg'
import Footer from '@/app/components/footer'
import LogoutButton from '@/app/components/LogoutButton'

/* ─── inline icons ──────────────────────────────────────── */
function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}
function GearIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate-400">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate-400">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}
function BriefcaseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate-400">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}
function BuildingIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate-400">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  )
}
function BadgePersonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-slate-400">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
function StatusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#5fe3e3]">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/?login=1')

  const { user } = session

  // QR генерируется из qrPayload сессии (получен при логине/регистрации).
  // Fallback: IFBF2026:{id} — если бэкенд ещё не вернул payload.
  const qrSource = user.qrPayload ?? `IFBF2026:${user.id}`
  const qrSvg = await QRCode.toString(qrSource, {
    type:   'svg',
    margin: 1,
    color:  { dark: '#121e52', light: '#ffffff' },
  })

  return (
    <div className="min-h-screen bg-[#f4f6fb] flex flex-col">

      {/* ── Profile navbar ─────────────────────────────── */}
      <header
        style={{ backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        className="w-full border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image src={logo} alt="logo" width={150} height={28} className="h-7 w-auto" />
          </Link>

          <nav className="flex-1 flex items-center gap-1 ml-4">
            <Link href="/" className="px-4 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              Главная
            </Link>
            <Link href="/profile" className="px-4 py-2 rounded-lg text-sm text-white bg-white/10 font-medium">
              Мой профиль
            </Link>
            <Link href="/#programs" className="px-4 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors">
              Программа форума
            </Link>
          </nav>

          <div className="flex items-center gap-1">
            <button className="flex items-center justify-center w-9 h-9 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
              <BellIcon />
            </button>
            <button className="flex items-center justify-center w-9 h-9 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
              <GearIcon />
            </button>
            <LogoutButton className="flex items-center justify-center w-9 h-9 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors" />
          </div>
        </div>
      </header>

      {/* ── Main content ───────────────────────────────── */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-[#121e52]">Мой профиль</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">

          {/* ── Left card ─────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col gap-6">

            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
                  <rect width="80" height="80" fill="#e2e8f0" />
                  <circle cx="40" cy="30" r="16" fill="#94a3b8" />
                  <ellipse cx="40" cy="68" rx="24" ry="18" fill="#94a3b8" />
                </svg>
              </div>

              {/* Name + contacts */}
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <StatusIcon />
                  Участник форума
                </div>
                <h2 className="text-2xl font-bold text-[#121e52]">
                  {user.name} {user.surname ?? ''}
                </h2>
                <div className="flex flex-wrap gap-4 mt-1">
                  {user.phone && (
                    <span className="flex items-center gap-1.5 text-sm text-slate-500">
                      <PhoneIcon /> {user.phone}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-sm text-slate-500">
                    <MailIcon /> {user.email}
                  </span>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <BriefcaseIcon />
                {user.position ?? 'Должность не указана'}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <BuildingIcon />
                {user.org ?? 'Организация не указана'}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <BadgePersonIcon />
                Участник
              </div>
            </div>
          </div>

          {/* ── Right card: QR badge ──────────────────── */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col items-center justify-center gap-4 min-h-[220px]">
            <div
              className="qr-wrapper w-44 h-44 rounded-xl overflow-hidden"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
            <div className="text-center flex flex-col gap-1">
              <p className="text-xs font-semibold text-[#121e52] tracking-wide uppercase">
                Электронный бейдж
              </p>
             
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
