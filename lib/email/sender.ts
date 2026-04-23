import * as React from 'react'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import { WelcomeEmailRu } from './WelcomeEmailRu'
import { WelcomeEmailKz } from './WelcomeEmailKz'
import { WelcomeEmailEn } from './WelcomeEmailEn'

const FROM = 'IFBF 2026 <noreply@ifbforum.kz>'

export async function sendWelcomeEmail(user: {
  email: string
  name: string
  surname?: string
  lang?: string
}) {
  const lang = user.lang ?? 'ru'
  console.log('[email] ── sendWelcomeEmail ──────────────────────────')
  console.log('[email] to:', user.email, '| lang:', lang)

  const apiKey = process.env.RESEND_API_KEY
  console.log('[email] RESEND_API_KEY present:', !!apiKey, '| starts with:', apiKey?.slice(0, 6))

  const resend = new Resend(apiKey)

  const subjects: Record<string, string> = {
    en: `You are registered for IFBF 2026 — we look forward to seeing you, ${user.name}!`,
    kz: `Сіз IFBF 2026 форумына тіркелдіңіз — Сізді күтеміз, ${user.name}!`,
    ru: `Вы зарегистрированы на IFBF 2026, ждём вас на форуме, ${user.name}!`,
  }

  const templates: Record<string, () => React.ReactElement> = {
    en: () => WelcomeEmailEn({ name: user.name, surname: user.surname }),
    kz: () => WelcomeEmailKz({ name: user.name, surname: user.surname }),
    ru: () => WelcomeEmailRu({ name: user.name, surname: user.surname }),
  }

  const subject  = subjects[lang]  ?? subjects.ru
  const template = templates[lang] ?? templates.ru

  let html: string
  try {
    html = await render(template())
    console.log('[email] template rendered OK, length:', html.length)
  } catch (renderErr) {
    console.error('[email] render FAILED:', renderErr)
    throw renderErr
  }

  console.log('[email] calling resend.emails.send...')
  const { data, error } = await resend.emails.send({
    from: FROM,
    to:   [user.email],
    subject,
    html,
  })

  if (error) {
    console.error('[email] Resend error:', JSON.stringify(error))
    throw new Error(`[email] Resend error: ${JSON.stringify(error)}`)
  }

  console.log('[email] ✓ sent! id:', data?.id, '| to:', user.email)
  return data
}
