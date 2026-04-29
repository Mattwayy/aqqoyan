'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const LS_GREETING = 'ifbf_widget_greeting'
const LS_SURVEY   = 'ifbf_widget_survey'
const AUTO_DISMISS_MS = 3000

// these fire only once per browser session (reset on tab close)
let confettiShownThisSession = false
let doneShownThisSession     = false

/* ── Typewriter ──────────────────────────────────────────── */
function useTypewriter(text: string, active: boolean, speed = 28) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    if (!active) { setDisplayed(''); setDone(false); return }
    setDisplayed(''); setDone(false)
    let i = 0
    let timer: ReturnType<typeof setTimeout>
    const tick = () => { i++; setDisplayed(text.slice(0, i)); if (i < text.length) { timer = setTimeout(tick, speed) } else { setDone(true) } }
    timer = setTimeout(tick, speed)
    return () => clearTimeout(timer)
  }, [text, active, speed])
  return { displayed, done }
}

/* ── Cursor ──────────────────────────────────────────────── */
function Cursor() {
  return <span className="inline-block w-[2px] h-[1em] bg-[#2f4fa3] dark:bg-[#5fe3e3] ml-[1px] align-middle animate-[cursorBlink_0.7s_step-end_infinite]" />
}

/* ── Confetti ────────────────────────────────────────────── */
function ConfettiCanvas({ onDone }: { onDone: () => void }) {
  const ref   = useRef<HTMLCanvasElement>(null)
  const cbRef = useRef(onDone)
  cbRef.current = onDone
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    const COLORS = ['#2f4fa3','#5fe3e3','#fbbf24','#34d399','#f87171','#a78bfa','#fb923c','#121e52']
    const cx = canvas.width / 2, cy = canvas.height / 2
    const particles = Array.from({ length: 140 }, () => ({
      x: cx + (Math.random() - 0.5) * 160, y: cy,
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -16 - 4,
      w: Math.random() * 11 + 5, h: Math.random() * 6 + 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      angle: Math.random() * 360, va: (Math.random() - 0.5) * 9, gravity: 0.45,
    }))
    const start = Date.now(); let raf: number
    const draw = () => {
      const elapsed = Date.now() - start
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.vy += p.gravity; p.x += p.vx; p.y += p.vy; p.angle += p.va
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.angle * Math.PI / 180)
        ctx.fillStyle = p.color; ctx.globalAlpha = Math.max(0, 1 - elapsed / 2600)
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore()
      })
      if (elapsed < 2800) { raf = requestAnimationFrame(draw) } else { cbRef.current() }
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={ref} className="fixed inset-0 z-[60] pointer-events-none" />
}

/* ── Survey data ─────────────────────────────────────────── */
const QUESTIONS = [
  {
    q: 'Чем вы больше всего интересуетесь на форуме?',
    opts: ['Привлечение инвестиций', 'Масштабирование бизнеса', 'Автоматизация процессов', 'AI и новые технологии', 'Нетворкинг и партнёрства'],
  },
  {
    q: 'Какой вариант лучше описывает вас?',
    opts: ['Владелец бизнеса', 'Стартап-основатель', 'Руководитель / менеджер', 'Инвестор', 'Только изучаю бизнес-возможности'],
  },
  {
    q: 'Как вы сейчас используете AI в работе?',
    opts: ['Использую ежедневно', 'Иногда для рабочих задач', 'Только тестировал', 'Слышал, но не использую', 'Вообще не использую'],
  },
  {
    q: 'Какие задачи в бизнесе отнимают больше всего времени?',
    opts: ['Анализ данных и отчётов', 'Поиск клиентов / продажи', 'Операционные процессы', 'Подготовка документов', 'Поиск бизнес-решений и идей'],
  },
  {
    q: 'Если AI мог бы сэкономить вам время — вам было бы интересно?',
    opts: ['Да, хочу попробовать', 'Да, если это бесплатно', 'Возможно, хочу узнать подробнее', 'Пока рано', 'Нет, не интересно'],
  },
]

/* ── Survey Modal ────────────────────────────────────────── */
function SurveyModal({
  onClose,
  onComplete,
  startDone = false,
}: {
  onClose:     () => void
  onComplete?: () => void
  startDone?:  boolean
}) {
  const [screen,         setScreen]         = useState(startDone ? 5 : 0)
  const [answers,        setAnswers]         = useState<(number | null)[]>(Array(5).fill(null))
  const [optionsVisible, setOptionsVisible]  = useState(false)
  const isDone = screen === 5

  /* Typewriter for current question text */
  const currentQ = isDone ? '' : QUESTIONS[screen]?.q ?? ''
  const qTyper = useTypewriter(currentQ, !isDone, 22)

  /* Hide options on screen change, show after question finishes typing */
  useEffect(() => { setOptionsVisible(false) }, [screen])
  useEffect(() => {
    if (qTyper.done && !isDone) {
      const t = setTimeout(() => setOptionsVisible(true), 120)
      return () => clearTimeout(t)
    }
  }, [qTyper.done, isDone])

  const select = (i: number) => { const a = [...answers]; a[screen] = i; setAnswers(a) }
  const next   = () => {
    if (answers[screen] === null || !optionsVisible) return
    const nx = screen + 1
    setScreen(nx)
    if (nx === 5) onComplete?.()
  }

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease]"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md flex flex-col animate-[fadeSlideUp_0.25s_ease] overflow-hidden">

        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {isDone ? (
          /* ── Final screen ── */
          <div className="p-8 sm:p-10 flex flex-col gap-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#121e52] to-[#2f4fa3] flex items-center justify-center text-white text-lg font-bold shadow">P</div>
            <div>
              <h2 className="text-2xl font-extrabold text-[#121e52] dark:text-white mb-2">
                {startDone ? 'Спасибо за участие!' : 'Спасибо за ответы.'}
              </h2>
              <p className="text-[14px] text-slate-600 dark:text-slate-300 leading-relaxed">
                На основе вашего выбора мы видим, что вам может подойти{' '}
                <strong className="text-[#121e52] dark:text-white">ProGPT</strong> — AI бизнес-консультант и аналитик, который помогает предпринимателям:
              </p>
            </div>
            <ul className="flex flex-col gap-2">
              {['находить точки роста', 'автоматизировать рутинные задачи', 'анализировать бизнес-идеи', 'принимать решения быстрее'].map(item => (
                <li key={item} className="flex items-center gap-2 text-[14px] text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5fe3e3] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[13px] font-semibold text-slate-700 dark:text-slate-200">Получите персональные рекомендации уже сейчас.</p>
            <a href="https://progpt.kz/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-gradient-to-r from-[#121e52] to-[#2f4fa3] text-white font-semibold text-[15px] shadow-lg hover:opacity-90 transition-all">
              Попробовать ProGPT
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        ) : (
          /* ── Question screen ── */
          <div className="flex flex-col">
            {/* Progress bar */}
            <div className="h-1 bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full bg-gradient-to-r from-[#2f4fa3] to-[#5fe3e3] transition-all duration-500"
                style={{ width: `${(screen / 5) * 100}%` }}
              />
            </div>

            <div className="p-8 sm:p-10 flex flex-col gap-6">
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                {screen + 1} / 5
              </span>

              {/* Question with typewriter */}
              <h3 className="text-[17px] font-bold text-[#121e52] dark:text-white leading-snug min-h-[48px]">
                {qTyper.displayed}
                {!qTyper.done && <Cursor />}
              </h3>

              {/* Options — fade in after question is done */}
              <div className={`flex flex-col gap-2 transition-all duration-300 ${optionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                {QUESTIONS[screen].opts.map((opt, i) => (
                  <button key={i} onClick={() => select(i)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-[14px] font-medium transition-all ${
                      answers[screen] === i
                        ? 'border-[#2f4fa3] bg-[#eef1fb] dark:bg-[#2f4fa3]/20 text-[#121e52] dark:text-white'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#2f4fa3]/50 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}>
                    <span className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                      answers[screen] === i ? 'border-[#2f4fa3]' : 'border-slate-300 dark:border-slate-600'
                    }`}>
                      {answers[screen] === i && <span className="w-2 h-2 rounded-full bg-[#2f4fa3]" />}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>

              <button
                onClick={next}
                disabled={answers[screen] === null || !optionsVisible}
                className="h-11 rounded-xl bg-gradient-to-r from-[#2f4fa3] to-[#5fe3e3] text-white font-semibold text-[14px] shadow hover:opacity-90 transition disabled:opacity-30 disabled:cursor-not-allowed">
                {screen === 4 ? 'Завершить' : 'Далее →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Main ────────────────────────────────────────────────── */
type Stage = 'idle' | 'greeting' | 'nudge' | 'celebrating' | 'done' | 'survey_ask'

const GREETING   = 'Добро пожаловать! 👋'
const NUDGE      = 'Ознакомьтесь, пожалуйста, с содержанием'
const DONE_TEXT  = 'Завершено ✓'
const SURVEY_ASK = 'Хотите пройти короткий опрос?'

export default function BadgeWidget() {
  const [stage,        setStage]        = useState<Stage>('idle')
  const [greetingDone, setGreetingDone] = useState(false)
  const [surveyDone,   setSurveyDone]   = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [surveyOpen,   setSurveyOpen]   = useState(false)
  const [hasScrolled,  setHasScrolled]  = useState(false)
  const [mounted,      setMounted]      = useState(false)

  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* ── Hydrate from localStorage ── */
  useEffect(() => {
    setMounted(true)
    setGreetingDone(!!localStorage.getItem(LS_GREETING))
    setSurveyDone(!!localStorage.getItem(LS_SURVEY))
  }, [])

  /* ── Dismiss-timer helpers ── */
  const startDismissTimer = useCallback(() => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current)
    dismissTimer.current = setTimeout(() => setStage('idle'), AUTO_DISMISS_MS)
  }, [])

  const clearDismissTimer = useCallback(() => {
    if (dismissTimer.current) { clearTimeout(dismissTimer.current); dismissTimer.current = null }
  }, [])

  /* ── Scroll detection ── */
  useEffect(() => {
    const check = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 350) setHasScrolled(true)
    }
    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
  }, [])

  /* ── Trigger confetti / done / survey_ask (each once per session) ── */
  const triggerCelebration = useCallback(() => {
    if (!confettiShownThisSession) {
      setShowConfetti(true)
      setStage('celebrating')
    } else if (!doneShownThisSession) {
      setStage('done')
    } else {
      setStage('survey_ask')
    }
  }, [])

  /* ── Nudge: if user scrolls to bottom, celebrate ── */
  useEffect(() => {
    if (stage === 'nudge' && hasScrolled) {
      clearDismissTimer()
      triggerCelebration()
    }
  }, [stage, hasScrolled, clearDismissTimer, triggerCelebration])

  /* ── Typewriters (badge bubble) ── */
  const greeting = useTypewriter(GREETING,   stage === 'greeting',   32)
  const nudge    = useTypewriter(NUDGE,      stage === 'nudge',      32)
  const doneType = useTypewriter(DONE_TEXT,  stage === 'done',       40)
  const askType  = useTypewriter(SURVEY_ASK, stage === 'survey_ask', 30)

  /* ── Auto-dismiss: 3s after typewriter finishes (survey_ask excluded — has buttons) ── */
  useEffect(() => {
    if (stage === 'greeting' && greeting.done) { startDismissTimer(); return clearDismissTimer }
  }, [stage, greeting.done, startDismissTimer, clearDismissTimer])

  useEffect(() => {
    if (stage === 'nudge' && nudge.done && !hasScrolled) { startDismissTimer(); return clearDismissTimer }
  }, [stage, nudge.done, hasScrolled, startDismissTimer, clearDismissTimer])

  /* ── Mark done as shown; after "Завершено ✓" → survey_ask ── */
  useEffect(() => {
    if (stage === 'done') doneShownThisSession = true
  }, [stage])

  useEffect(() => {
    if (stage === 'done' && doneType.done) {
      const t = setTimeout(() => setStage('survey_ask'), 1000)
      return () => clearTimeout(t)
    }
  }, [stage, doneType.done])

  const handleConfettiDone = useCallback(() => {
    confettiShownThisSession = true
    setShowConfetti(false)
    setStage('done')
  }, [])

  /* ── Badge click ── */
  const handleBadgeClick = () => {
    clearDismissTimer()

    // Survey done → open final screen directly
    if (surveyDone) { setSurveyOpen(true); return }

    if (stage === 'idle') {
      if (!greetingDone) {
        setGreetingDone(true)
        localStorage.setItem(LS_GREETING, '1')
        setStage('greeting')
      } else {
        if (hasScrolled) { triggerCelebration() } else { setStage('nudge') }
      }
      return
    }

    if (stage === 'greeting') {
      if (hasScrolled) { triggerCelebration() } else { setStage('nudge') }
      return
    }

    // survey_ask: badge click also opens the survey (in case user misses the Да button)
    if (stage === 'survey_ask') {
      setSurveyOpen(true)
      setStage('idle')
      return
    }

    // Any other active state → collapse
    setStage('idle')
  }

  /* ── Survey complete ── */
  const handleSurveyComplete = useCallback(() => {
    setSurveyDone(true)
    localStorage.setItem(LS_SURVEY, '1')
  }, [])

  /* ── Bubble content ── */
  const bubbleText: string | null =
    stage === 'greeting'   ? greeting.displayed :
    stage === 'nudge'      ? nudge.displayed :
    stage === 'done'       ? doneType.displayed :
    stage === 'survey_ask' ? askType.displayed : null

  const typingDone =
    stage === 'greeting'   ? greeting.done :
    stage === 'nudge'      ? nudge.done :
    stage === 'done'       ? doneType.done :
    stage === 'survey_ask' ? askType.done : false

  const showBubble   = bubbleText !== null && stage !== 'celebrating'
  const pageRead     = mounted && hasScrolled

  if (!mounted) return null

  return (
    <>
      {showConfetti && <ConfettiCanvas onDone={handleConfettiDone} />}
      {surveyOpen && (
        <SurveyModal
          onClose={() => { setSurveyOpen(false); setStage('idle') }}
          onComplete={handleSurveyComplete}
          startDone={surveyDone}
        />
      )}

      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">

        {/* Speech bubble */}
        {showBubble && (
          <div className={`flex flex-col bg-white dark:bg-slate-800 rounded-2xl shadow-lg px-4 py-3 max-w-[270px] animate-[fadeSlideUp_0.2s_ease] ${
            stage === 'nudge'
              ? 'border border-[#2f4fa3]/30 dark:border-[#5fe3e3]/30'
              : 'border border-slate-100 dark:border-slate-700'
          }`}>
            <span className="text-[15px] font-semibold text-[#121e52] dark:text-white leading-snug min-h-[22px]">
              {bubbleText}
              {!typingDone && <Cursor />}
            </span>

            {/* Да / Нет */}
            {stage === 'survey_ask' && typingDone && (
              <div className="flex gap-2 mt-3 animate-[fadeIn_0.3s_ease]">
                <button
                  onClick={() => { clearDismissTimer(); setSurveyOpen(true); setStage('idle') }}
                  className="flex-1 h-8 rounded-lg bg-gradient-to-r from-[#2f4fa3] to-[#5fe3e3] text-white text-[13px] font-semibold hover:opacity-90 transition">
                  Да 👍
                </button>
                <button
                  onClick={() => { clearDismissTimer(); setStage('idle') }}
                  className="flex-1 h-8 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-[13px] font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition">
                  Нет
                </button>
              </div>
            )}
          </div>
        )}

        {/* Badge */}
        <button
          onClick={handleBadgeClick}
          className="cursor-pointer flex items-center gap-2 h-12 px-5 rounded-full bg-gradient-to-r from-[#121e52] to-[#2f4fa3] text-white text-sm font-semibold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          <span>proji</span>
          {pageRead ? (
            /* ✓ after user scrolled to bottom (page read) */
            <svg
              width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="#4ade80" strokeWidth="3.5"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          ) : (
            /* Ping dot — not yet read */
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5fe3e3] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5fe3e3]" />
            </span>
          )}
        </button>
      </div>
    </>
  )
}
