'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import jsQR from 'jsqr'

type ScanStatus = 'idle' | 'scanning' | 'success' | 'error' | 'not_found'

export default function WorkerScanner() {
  const videoRef    = useRef<HTMLVideoElement>(null)
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const streamRef   = useRef<MediaStream | null>(null)
  const rafRef      = useRef<number | null>(null)
  const lastPayload = useRef<string | null>(null)

  const [status,  setStatus]  = useState<ScanStatus>('idle')
  const [message, setMessage] = useState('')
  const [camErr,  setCamErr]  = useState<string | null>(null)

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
      setCamErr(null)
    } catch {
      setCamErr('Не удалось получить доступ к камере. Разрешите доступ в настройках браузера.')
    }
  }, [])

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }, [])

  const sendScan = useCallback(async (payload: string) => {
    setStatus('scanning')
    try {
      const res = await fetch('/api/worker/scan', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ qrPayload: payload }),
      })
      const data = await res.json()
      if (res.ok) {
        setMessage(`Успешно посетил: ${data.name}`)
        setStatus('success')
      } else if (res.status === 404) {
        setMessage('Участник не найден')
        setStatus('not_found')
      } else {
        setMessage(data.message ?? 'Ошибка')
        setStatus('error')
      }
    } catch {
      setMessage('Ошибка соединения')
      setStatus('error')
    }

    // через 3 сек сбрасываем и разрешаем следующий скан
    setTimeout(() => {
      lastPayload.current = null
      setStatus('idle')
      setMessage('')
    }, 3000)
  }, [])

  useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [startCamera, stopCamera])

  // Цикл распознавания
  useEffect(() => {
    const tick = () => {
      const video  = videoRef.current
      const canvas = canvasRef.current
      if (!video || !canvas || video.readyState < video.HAVE_ENOUGH_DATA) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }
      canvas.width  = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(video, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const code = jsQR(imageData.data, imageData.width, imageData.height)

      if (code && code.data && code.data !== lastPayload.current) {
        lastPayload.current = code.data
        sendScan(code.data)
      }

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [sendScan])

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 sm:p-8 flex flex-col gap-6 transition-colors">

      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800">
          <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="currentColor"/></svg>
          WORKER
        </span>
        <h2 className="text-xl font-bold text-[#121e52] dark:text-white">Сканер посещений</h2>
      </div>

      {/* Notification */}
      {message && (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
          status === 'success'
            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
            : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
        }`}>
          {status === 'success' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          )}
          {message}
        </div>
      )}

      {/* Camera error */}
      {camErr ? (
        <div className="flex flex-col items-center gap-4 py-8 text-slate-500 dark:text-slate-400">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <line x1="2" y1="2" x2="22" y2="22"/>
          </svg>
          <p className="text-sm text-center">{camErr}</p>
          <button onClick={startCamera} className="h-10 px-6 rounded-xl bg-[#2f4fa3] text-white text-sm font-medium hover:opacity-90 transition">
            Повторить
          </button>
        </div>
      ) : (
        <div className="relative w-full max-w-sm mx-auto">
          {/* Видео */}
          <video
            ref={videoRef}
            muted
            playsInline
            className="w-full rounded-2xl object-cover"
            style={{ aspectRatio: '1/1' }}
          />
          {/* Скрытый canvas для jsQR */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Оверлей с рамкой сканирования */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className={`w-48 h-48 rounded-2xl border-4 transition-colors ${
              status === 'success'  ? 'border-emerald-400' :
              status === 'error' || status === 'not_found' ? 'border-red-400' :
              status === 'scanning' ? 'border-yellow-400 animate-pulse' :
              'border-white/60'
            }`} />
          </div>

          {/* Статус */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center">
            <span className="bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
              {status === 'scanning' ? 'Обработка...' : 'Наведите камеру на QR-код'}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
