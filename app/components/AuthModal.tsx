'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import logo from '@/public/logo.svg'
import { useModal } from '@/app/context/ModalContext'
import { register, login } from '../lib/api'

/* ─── shared styles ──────────────────────────────────────── */
const inp =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#2f4fa3] transition-colors disabled:opacity-50'

const submitBtn =
  'mt-2 h-12 w-full rounded-xl bg-gradient-to-r from-[#2f4fa3] to-[#5fe3e3] text-white font-medium text-base hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2'

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
    <p className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-600">
      {message}
    </p>
  )
}

/* ─── Modal header ───────────────────────────────────────── */
function ModalHeader() {
  return (
    <div
      className="relative flex h-28 items-center justify-center overflow-hidden rounded-t-2xl"
      style={{ backgroundImage: 'url(/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-[#0d1640]/60" />
      <Image src={logo} alt="logo" width={190} height={36} className="relative z-10 h-9 w-auto" />
    </div>
  )
}

/* ─── Register view ──────────────────────────────────────── */
function RegisterView({ onSuccess, onLogin }: { onSuccess: () => void; onLogin: () => void }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [agree1, setAgree1] = useState(false)
  const [agree2, setAgree2] = useState(false)
  const [fields, setFields] = useState({
    name: '', surname: '', phone: '', email: '',
    scope: '', org: '', position: '',
    country: '', city: '', lang: '', comment: '',
  })

  const set = (key: keyof typeof fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields(f => ({ ...f, [key]: e.target.value }))

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (!fields.name || !fields.surname || !fields.phone || !fields.email) {
      setError('Пожалуйста, заполните обязательные поля.')
      return
    }
    if (!agree1) {
      setError('Необходимо согласие на обработку персональных данных.')
      return
    }

    setLoading(true)
    try {
      await register({ ...fields, agreePersonal: agree1, agreeMedia: agree2 })
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-[#121e52] text-center mb-2">Регистрация</h2>

      <input className={inp} placeholder="Имя*" value={fields.name} onChange={set('name')} disabled={loading} />
      <input className={inp} placeholder="Фамилия*" value={fields.surname} onChange={set('surname')} disabled={loading} />

      <div className="grid grid-cols-2 gap-3">
        <input className={inp} placeholder="Номер телефона*" value={fields.phone} onChange={set('phone')} disabled={loading} />
        <input className={inp} type="email" placeholder="Почта*" value={fields.email} onChange={set('email')} disabled={loading} />
      </div>

      <input className={inp} placeholder="Сфера деятельности" value={fields.scope} onChange={set('scope')} disabled={loading} />
      <input className={inp} placeholder="Организация" value={fields.org} onChange={set('org')} disabled={loading} />
      <input className={inp} placeholder="Должность" value={fields.position} onChange={set('position')} disabled={loading} />

      <div className="grid grid-cols-3 gap-3">
        <input className={inp} placeholder="Страна" value={fields.country} onChange={set('country')} disabled={loading} />
        <input className={inp} placeholder="Город" value={fields.city} onChange={set('city')} disabled={loading} />
        <input className={inp} placeholder="Язык" value={fields.lang} onChange={set('lang')} disabled={loading} />
      </div>

      <textarea
        className={`${inp} resize-none h-24`}
        placeholder="Комментарий / дополнительная информация"
        value={fields.comment}
        onChange={set('comment')}
        disabled={loading}
      />

      <div className="flex flex-col gap-3 mt-1">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={agree1} onChange={e => setAgree1(e.target.checked)}
            disabled={loading} className="mt-0.5 h-4 w-4 shrink-0 accent-[#2f4fa3] cursor-pointer" />
          <span className="text-sm text-slate-600 leading-snug">
            Я согласен(а) с обработкой персональных данных
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={agree2} onChange={e => setAgree2(e.target.checked)}
            disabled={loading} className="mt-0.5 h-4 w-4 shrink-0 accent-[#2f4fa3] cursor-pointer" />
          <span className="text-xs text-slate-500 leading-relaxed">
            *Регистрируясь, гость подтверждает своё согласие на проведение фото-,
            видео- и аудиосъёмки с его участием в рамках мероприятия, а также на
            использование его изображения и/или голоса организатором без ограничения
            по сроку и территории, включая публикацию в СМИ, на интернет-ресурсах,
            в социальных сетях и рекламных материалах.
          </span>
        </label>
      </div>

      {error && <ErrorBox message={error} />}

      <button type="submit" className={submitBtn} disabled={loading}>
        {loading && <Spinner />}
        {loading ? 'Отправка...' : 'Зарегистрироваться'}
      </button>

      <p className="text-center text-sm text-slate-500">
        Есть аккаунт?{' '}
        <button type="button" onClick={onLogin} disabled={loading}
          className="text-[#2f4fa3] font-medium hover:underline disabled:opacity-50">
          Войти
        </button>
      </p>
    </form>
  )
}

/* ─── Success view ───────────────────────────────────────── */
function SuccessView({ onProfile }: { onProfile: () => void }) {
  return (
    <div className="flex flex-col items-center gap-5 text-center py-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#5fe3e3]/20">
        <svg className="h-8 w-8 text-[#5fe3e3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-[#121e52]">Спасибо за регистрацию!</h2>

      <p className="text-slate-600 text-sm leading-relaxed">
        Ваш профиль участника создан.<br />
        Дополнительная информация будет направлена на указанный email.
      </p>

      <button onClick={onProfile}
        className="text-[#2f4fa3] font-medium text-sm underline underline-offset-2 hover:text-[#5fe3e3] transition-colors">
        Перейти в личный кабинет
      </button>

      <div className="w-full rounded-xl border border-[#5fe3e3]/50 bg-[#5fe3e3]/10 p-4 text-left">
        <p className="text-xs text-slate-600 leading-relaxed">
          <span className="font-bold text-slate-700">ВАЖНО: </span>
          В период с 15 апреля по 31 мая 2026 года на взлетно-посадочной полосе
          проводятся плановые ремонтные работы. Полоса будет временно закрыта
          ежедневно с 10:00 до 18:00 по местному времени.
        </p>
      </div>
    </div>
  )
}

/* ─── Login view ─────────────────────────────────────────── */
function LoginView({ onSuccess, onRegister }: { onSuccess: () => void; onRegister: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Введите email и пароль.')
      return
    }

    setLoading(true)
    try {
      await login({ email, password })
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-[#121e52] text-center mb-2">
        Вход в личный кабинет
      </h2>

      <input className={inp} type="email" placeholder="Вход по email"
        value={email} onChange={e => setEmail(e.target.value)}
        disabled={loading} autoComplete="email" />
      <input className={inp} type="password" placeholder="Пароль"
        value={password} onChange={e => setPassword(e.target.value)}
        disabled={loading} autoComplete="current-password" />

      {error && <ErrorBox message={error} />}

      <button type="submit" className={submitBtn} disabled={loading}>
        {loading && <Spinner />}
        {loading ? 'Вход...' : 'Войти'}
      </button>

      <p className="text-center">
        <button type="button"
          className="text-sm text-slate-500 underline underline-offset-2 hover:text-[#2f4fa3] transition-colors">
          Восстановление доступа
        </button>
      </p>

      <p className="text-center text-sm text-slate-500">
        Нет аккаунта?{' '}
        <button type="button" onClick={onRegister} disabled={loading}
          className="text-[#2f4fa3] font-medium hover:underline disabled:opacity-50">
          Зарегистрироваться
        </button>
      </p>
    </form>
  )
}

/* ─── Main modal ─────────────────────────────────────────── */
export default function AuthModal() {
  const { isOpen, view, closeModal, setView } = useModal()
  const router = useRouter()
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

  function handleProfile() {
    closeModal()
    router.push('/profile')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={closeModal}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[#f0f2f7] shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <ModalHeader />

        <button onClick={closeModal}
          className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition"
          aria-label="Закрыть">
          ✕
        </button>

        <div className="p-8">
          {view === 'register' && (
            <RegisterView onSuccess={() => setView('success')} onLogin={() => setView('login')} />
          )}
          {view === 'success' && <SuccessView onProfile={handleProfile} />}
          {view === 'login' && (
            <LoginView onSuccess={handleProfile} onRegister={() => setView('register')} />
          )}
        </div>
      </div>
    </div>
  )
}
