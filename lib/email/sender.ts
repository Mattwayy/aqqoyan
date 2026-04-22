import { Resend } from 'resend'
import { render } from '@react-email/render'
import { WelcomeEmail } from './WelcomeEmail'

const FROM = 'IFBF 2026 <noreply@ifbforum.kz>'

export async function sendWelcomeEmail(user: {
  email: string
  name: string
  surname?: string
}) {
  console.log('[email] ── sendWelcomeEmail called ──────────────────')
  console.log('[email] to:', user.email, '| name:', user.name, user.surname ?? '')

  const apiKey = process.env.RESEND_API_KEY
  console.log('[email] RESEND_API_KEY present:', !!apiKey, '| starts with:', apiKey?.slice(0, 6))

  const resend = new Resend(apiKey)

  let html: string
  try {
    html = await render(WelcomeEmail({ name: user.name, surname: user.surname }))
    console.log('[email] template rendered, html length:', html.length)
  } catch (renderErr) {
    console.error('[email] render FAILED:', renderErr)
    throw renderErr
  }

  console.log('[email] calling resend.emails.send...')
  const { data, error } = await resend.emails.send({
    from:    FROM,
    to:      [user.email],
    subject: `Вы зарегистрированы на IFBF 2026, ждем вас на конференции ${user.name}!`,
    html,
  })

  if (error) {
    console.error('[email] Resend returned error:', JSON.stringify(error))
    throw new Error(`[email] Resend error: ${JSON.stringify(error)}`)
  }

  console.log('[email] ✓ sent successfully! id:', data?.id, '| to:', user.email)
  return data
}
