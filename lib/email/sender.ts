import { Resend } from 'resend'
import { WelcomeEmail } from './WelcomeEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = 'IFBF 2026 <noreply@ifbforum.kz>'

export async function sendWelcomeEmail(user: {
  email: string
  name: string
  surname?: string
}) {
  const { data, error } = await resend.emails.send({
    from:    FROM,
    to:      [user.email],
    subject: `Вы зарегистрированы на IFBF 2026, ждем вас на конференции ${user.name}!`,
    react:   WelcomeEmail({ name: user.name, surname: user.surname }),
  })

  if (error) {
    // Бросаем ошибку — вызывающий код решает, блокировать ли ответ
    throw new Error(`[email] Resend error: ${JSON.stringify(error)}`)
  }

  return data
}
