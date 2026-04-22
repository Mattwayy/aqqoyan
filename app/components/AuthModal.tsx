'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import logo from '@/public/logo.svg'
import { useModal } from '@/app/context/ModalContext'

/* ─── shared styles ──────────────────────────────────────── */
const inp =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#2f4fa3] transition-colors disabled:opacity-50'

const submitBtn =
  'h-11 w-full rounded-xl bg-gradient-to-r from-[#2f4fa3] to-[#5fe3e3] text-white font-medium text-base hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2'

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  )
}

function ErrorBox({ message }: { message: string }) {
  return (
    <p className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-600 col-span-full">
      {message}
    </p>
  )
}

/* ─── Register view ──────────────────────────────────────── */
function RegisterView({
  onSuccess, onLogin, onClose, modalRef,
}: {
  onSuccess: () => void; onLogin: () => void; onClose: () => void
  modalRef: React.RefObject<HTMLDivElement | null>
}) {
  const t = useTranslations('auth.register')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [agree1, setAgree1]       = useState(false)
  const [agree2, setAgree2]       = useState(false)
  const [fields, setFields] = useState({
    name: '', surname: '', phone: '', email: '',
    password: '', confirmPassword: '',
    scope: '', org: '', position: '',
    country: '', city: '', lang: '',
  })

  const requiredTextFields: (keyof typeof fields)[] = [
    'name', 'surname', 'phone', 'email', 'password', 'confirmPassword',
  ]
  const isEmpty    = (key: keyof typeof fields) => submitted && requiredTextFields.includes(key) && !fields[key].trim()
  const pwMismatch = submitted && !!fields.confirmPassword && fields.password !== fields.confirmPassword

  const set = (key: keyof typeof fields) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFields(f => ({ ...f, [key]: e.target.value }))

  const fi = (key: keyof typeof fields) => {
    const invalid = isEmpty(key) || (key === 'confirmPassword' && pwMismatch)
    return `${inp}${invalid ? ' !border-red-400 bg-red-50/40' : ''}`
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setError('')

    if (requiredTextFields.some(k => !fields[k].trim())) {
      setError(t('errRequired')); return
    }
    if (fields.password.length < 6) {
      setError(t('errPasswordMin')); return
    }
    if (fields.password !== fields.confirmPassword) {
      setError(t('errPasswordMismatch')); return
    }
    if (!agree1 || !agree2) {
      setError(t('errAgree')); return
    }

    setLoading(true)
    try {
      const { confirmPassword: _, ...payload } = fields

      // Всегда через локальный Next.js route — он отправляет письмо через Resend
      // и сам решает mock vs real backend по NEXT_PUBLIC_API_URL
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, agreePersonal: agree1, agreeMedia: agree2 }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message ?? t('errGeneric'))

      const result = await signIn('credentials', { email: fields.email, password: fields.password, redirect: false })
      if (result?.error) throw new Error(t('errLoginAfter'))

      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errGeneric'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div ref={modalRef} className="fixed inset-0 z-50 flex flex-col bg-[#f0f2f7] overflow-y-auto">
      {/* Top bar */}
      <div
        className="relative shrink-0 flex items-center justify-between px-6 sm:px-10 h-16"
        style={{ backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-[#0d1640]/70" />
        <Image src={logo} alt="logo" width={160} height={30} className="relative z-10 h-8 w-auto" />
        <button onClick={onClose} className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 transition" aria-label="Закрыть">✕</button>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-6">
        <form onSubmit={handleSubmit} className="w-full max-w-3xl flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-[#121e52] text-center mb-1">{t('title')}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className={fi('name')}            placeholder={t('name')}            value={fields.name}            onChange={set('name')}            disabled={loading} />
            <input className={fi('surname')}         placeholder={t('surname')}         value={fields.surname}         onChange={set('surname')}         disabled={loading} />
            <input className={fi('phone')}           placeholder={t('phone')}           value={fields.phone}           onChange={set('phone')}           disabled={loading} />
            <input className={fi('email')} type="email" placeholder={t('email')}        value={fields.email}           onChange={set('email')}           disabled={loading} />
            <input className={fi('password')} type="password" placeholder={t('password')}
              value={fields.password} onChange={set('password')} disabled={loading} autoComplete="new-password" />
            <input className={fi('confirmPassword')} type="password" placeholder={t('confirmPassword')}
              value={fields.confirmPassword} onChange={set('confirmPassword')} disabled={loading} autoComplete="new-password" />
            <input className={fi('org')}             placeholder={t('org')}             value={fields.org}             onChange={set('org')}             disabled={loading} />
            <input className={fi('position')}        placeholder={t('position')}        value={fields.position}        onChange={set('position')}        disabled={loading} />
            <input className={fi('country')}         placeholder={t('country')}         value={fields.country}         onChange={set('country')}         disabled={loading} />
            <input className={fi('city')}            placeholder={t('city')}            value={fields.city}            onChange={set('city')}            disabled={loading} />
            <input className={fi('scope')}           placeholder={t('scope')}           value={fields.scope}           onChange={set('scope')}           disabled={loading} />
            <input className={fi('lang')}            placeholder={t('lang')}            value={fields.lang}            onChange={set('lang')}            disabled={loading} />

            {/* Checkboxes */}
            <div className="sm:col-span-2 flex flex-col gap-2">
              <label className={`flex items-start gap-3 cursor-pointer rounded-lg px-2 py-1 transition-colors ${submitted && !agree1 ? 'bg-red-50 outline outline-1 outline-red-300' : ''}`}>
                <input type="checkbox" checked={agree1} onChange={e => setAgree1(e.target.checked)}
                  disabled={loading} className="mt-0.5 h-4 w-4 shrink-0 accent-[#2f4fa3] cursor-pointer" />
                <span className={`text-sm leading-snug ${submitted && !agree1 ? 'text-red-600' : 'text-slate-600'}`}>
                  {t('agree1')}
                </span>
              </label>

              <label className={`flex items-start gap-3 cursor-pointer rounded-lg px-2 py-1 transition-colors ${submitted && !agree2 ? 'bg-red-50 outline outline-1 outline-red-300' : ''}`}>
                <input type="checkbox" checked={agree2} onChange={e => setAgree2(e.target.checked)}
                  disabled={loading} className="mt-0.5 h-4 w-4 shrink-0 accent-[#2f4fa3] cursor-pointer" />
                <span className={`text-xs leading-relaxed ${submitted && !agree2 ? 'text-red-600' : 'text-slate-500'}`}>
                  *{t('agree2')}
                </span>
              </label>
            </div>

            {error && <ErrorBox message={error} />}

            <button type="submit" className={`${submitBtn} sm:col-span-2`} disabled={loading}>
              {loading && <Spinner />}
              {loading ? t('submitting') : t('submit')}
            </button>

            <p className="sm:col-span-2 text-center text-sm text-slate-500">
              {t('hasAccount')}{' '}
              <button type="button" onClick={onLogin} disabled={loading}
                className="text-[#2f4fa3] font-medium hover:underline disabled:opacity-50">
                {t('loginLink')}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ─── Success view ───────────────────────────────────────── */
function SuccessView({ onProfile }: { onProfile: () => void }) {
  const t = useTranslations('auth.success')
  return (
    <div className="flex flex-col items-center gap-5 text-center py-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#5fe3e3]/20">
        <svg className="h-8 w-8 text-[#5fe3e3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-[#121e52]">{t('title')}</h2>
      <p className="text-slate-600 text-sm leading-relaxed">
        {t('body1')}<br />{t('body2')}
      </p>
      <button onClick={onProfile} className="text-[#2f4fa3] font-medium text-sm underline underline-offset-2 hover:text-[#5fe3e3] transition-colors">
        {t('goToProfile')}
      </button>
      <div className="w-full rounded-xl border border-[#5fe3e3]/50 bg-[#5fe3e3]/10 p-4 text-left">
        <p className="text-xs text-slate-600 leading-relaxed">
          <span className="font-bold text-slate-700">{t('noticeLabel')} </span>
          {t('noticeBody')}
        </p>
      </div>
    </div>
  )
}

/* ─── Login view ─────────────────────────────────────────── */
function LoginView({ onSuccess, onRegister }: { onSuccess: () => void; onRegister: () => void }) {
  const t = useTranslations('auth.login')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError(t('errRequired')); return }

    setLoading(true)
    try {
      const result = await signIn('credentials', { email, password, redirect: false })
      if (!result?.ok) throw new Error(t('errInvalid'))
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errGeneric'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-[#121e52] text-center mb-2">{t('title')}</h2>
      <input className={inp} type="email" placeholder={t('emailPlaceholder')}
        value={email} onChange={e => setEmail(e.target.value)} disabled={loading} autoComplete="email" />
      <input className={inp} type="password" placeholder={t('passwordPlaceholder')}
        value={password} onChange={e => setPassword(e.target.value)} disabled={loading} autoComplete="current-password" />
      {error && <ErrorBox message={error} />}
      <button type="submit" className={submitBtn} disabled={loading}>
        {loading && <Spinner />}
        {loading ? t('submitting') : t('submit')}
      </button>
      <p className="text-center text-sm text-slate-500">
        {t('noAccount')}{' '}
        <button type="button" onClick={onRegister} disabled={loading}
          className="text-[#2f4fa3] font-medium hover:underline disabled:opacity-50">
          {t('registerLink')}
        </button>
      </p>
    </form>
  )
}

/* ─── Compact modal wrapper ──────────────────────────────── */
function CompactModal({ children, onClose, modalRef }: {
  children: React.ReactNode; onClose: () => void
  modalRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose} aria-modal="true" role="dialog">
      <div ref={modalRef}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[#f0f2f7] shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-t-2xl"
          style={{ backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-[#0d1640]/60" />
          <Image src={logo} alt="logo" width={190} height={36} className="relative z-10 h-9 w-auto" />
        </div>
        <button onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition"
          aria-label="Закрыть">✕</button>
        <div className="p-8">{children}</div>
      </div>
    </div>
  )
}

/* ─── Main modal ─────────────────────────────────────────── */
export default function AuthModal() {
  const { isOpen, view, closeModal, setView } = useModal()
  const router   = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closeModal])

  useEffect(() => {
    if (!isOpen || !modalRef.current) return
    const sel = 'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])'
    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return
      const nodes = Array.from(modalRef.current.querySelectorAll<HTMLElement>(sel))
      if (!nodes.length) return
      const first = nodes[0], last = nodes[nodes.length - 1]
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus() } }
      else            { if (document.activeElement === last)  { e.preventDefault(); first.focus() } }
    }
    window.addEventListener('keydown', trap)
    const nodes = modalRef.current.querySelectorAll<HTMLElement>(sel)
    if (nodes.length) setTimeout(() => nodes[0].focus(), 50)
    return () => window.removeEventListener('keydown', trap)
  }, [isOpen, view])

  if (!isOpen) return null

  function handleProfile() { closeModal(); router.push('/profile') }

  if (view === 'register') {
    return <RegisterView onSuccess={() => setView('success')} onLogin={() => setView('login')} onClose={closeModal} modalRef={modalRef} />
  }

  return (
    <CompactModal onClose={closeModal} modalRef={modalRef}>
      {view === 'success' && <SuccessView onProfile={handleProfile} />}
      {view === 'login'   && <LoginView onSuccess={handleProfile} onRegister={() => setView('register')} />}
    </CompactModal>
  )
}
