import { Resend } from 'resend'
import { render } from '@react-email/render'
import { WelcomeEmail } from './WelcomeEmail'

const FROM = 'IFBF 2026 <noreply@ifbforum.kz>'

export async function sendWelcomeEmail(user: {
  email: string
  name: string
  surname?: string
}) {
  // Инициализируем клиент лениво — env доступен только в runtime, не во время билда
  const resend = new Resend(process.env.RESEND_API_KEY)

  const html = await render(WelcomeEmail({ name: user.name, surname: user.surname }))

  const { data, error } = await resend.emails.send({
    from:    FROM,
    to:      [user.email],
    subject: `Вы зарегистрированы на IFBF 2026, ждем вас на конференции ${user.name}!`,
    html,
  })

  if (error) {
    // Бросаем ошибку — вызывающий код решает, блокировать ли ответ
    throw new Error(`[email] Resend error: ${JSON.stringify(error)}`)
  }

  console.log(`[email] Welcome email sent → ${user.email} (id: ${data?.id})`)
  return data
}
