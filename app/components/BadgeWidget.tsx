'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslations } from 'next-intl'

type Stage = 'idle' | 'welcome' | 'question'

export default function BadgeWidget() {
  const t = useTranslations('widget')
  const [open,      setOpen]      = useState(false)
  const [stage,     setStage]     = useState<Stage>('idle')
  const [showModal, setShowModal] = useState(false)

  const stageTimer  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const idleTimer   = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = () => {
    if (stageTimer.current) clearTimeout(stageTimer.current)
    if (idleTimer.current)  clearTimeout(idleTimer.current)
  }

  /* Сбрасываем idle-таймер при любом взаимодействии */
  const resetIdleTimer = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => {
      setOpen(false)
    }, 10_000)
  }, [])

  /* При открытии/закрытии виджета */
  useEffect(() => {
    if (!open) {
      clearTimers()
      setStage('idle')
      return
    }

    // Запускаем анимацию
    setStage('welcome')
    resetIdleTimer()

    // Через 3 сек: первый исчезает, появляется второй
    stageTimer.current = setTimeout(() => {
      setStage('question')
      resetIdleTimer()
    }, 3000)

    return clearTimers
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  /* Закрыть модалку по Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowModal(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleOpen = () => {
    setOpen(v => !v)
  }

  return (
    <>
      {/* ── Floating badge ─────────────────────────────── */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">

        {/* Bubble: welcome */}
        {open && stage === 'welcome' && (
          <div className="flex flex-col bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 px-4 py-3 max-w-[260px] animate-[fadeSlideUp_0.25s_ease]">
            <span className="text-[15px] font-semibold text-[#121e52] dark:text-white leading-snug">
              {t('welcome')}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
              {t('clickHint')}
            </span>
          </div>
        )}

        {/* Bubble: question */}
        {open && stage === 'question' && (
          <div
            onClick={() => { clearTimers(); setOpen(false); setShowModal(true) }}
            className="flex flex-col bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-[#2f4fa3]/30 dark:border-[#5fe3e3]/30 px-4 py-3 cursor-pointer max-w-[260px] hover:border-[#2f4fa3] dark:hover:border-[#5fe3e3] transition-colors animate-[fadeSlideUp_0.3s_ease]"
          >
            <span className="text-[15px] font-semibold text-[#121e52] dark:text-white leading-snug">
              {t('question')}
            </span>
            <span className="text-[11px] text-[#2f4fa3] dark:text-[#5fe3e3] mt-0.5 font-medium">
              {t('clickHint')}
            </span>
          </div>
        )}

        {/* Badge button */}
        <button
          onClick={handleOpen}
          className="flex items-center gap-2 h-12 px-5 rounded-full bg-gradient-to-r from-[#121e52] to-[#2f4fa3] text-white text-sm font-semibold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
          aria-label="Открыть виджет"
        >
          <span className="text-base">💬</span>
          <span>proji</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5fe3e3] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5fe3e3]" />
          </span>
        </button>
      </div>

      {/* ── Modal ──────────────────────────────────────── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease]"
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false) }}
        >
          <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-md w-full p-8 sm:p-10 flex flex-col gap-6 animate-[fadeSlideUp_0.25s_ease]">

            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Закрыть"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Logo / h1 */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#121e52] to-[#2f4fa3] flex items-center justify-center text-white text-lg font-bold shadow">
                  P
                </div>
              </div>
              <h1 className="text-4xl font-extrabold text-[#121e52] dark:text-white tracking-tight">
                {t('modalTitle')}
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('modalDesc')}
            </p>

            {/* CTA */}
            <a
              href="https://progpt.kz/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-xl bg-gradient-to-r from-[#121e52] to-[#2f4fa3] text-white font-semibold text-base shadow-lg hover:opacity-90 hover:shadow-xl transition-all"
            >
              {t('cta')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </div>
      )}
    </>
  )
}
