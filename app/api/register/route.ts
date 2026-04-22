import { NextResponse } from 'next/server'
import { getUserByEmail, createUser } from '@/app/lib/serverDb'
import { sendWelcomeEmail } from '@/lib/email/sender'

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/$/, '')
const IS_MOCK  = !BASE_URL || BASE_URL === 'mock'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, name, surname, phone,
            org, position, scope, country, city, lang } = body

    if (!email || !password || !name || !surname || !phone) {
      return NextResponse.json({ message: 'Заполните обязательные поля' }, { status: 400 })
    }

    // QR-payload генерируется на нашей стороне и отправляется в бэкенд.
    // Формат: IFBF2026:{uuid} — внешняя система сканирует и валидирует по нему.
    const qrPayload = `IFBF2026:${crypto.randomUUID()}`

    /* ── Mock (dev) ───────────────────────────────────── */
    if (IS_MOCK) {
      if (getUserByEmail(email)) {
        return NextResponse.json(
          { message: 'Пользователь с таким email уже зарегистрирован' },
          { status: 409 },
        )
      }

      const user = createUser({
        name, surname, email, phone,
        org, position, scope, country, city, lang,
        _password: password,
        qrPayload,
      })

      // Email не блокирует ответ — логируем ошибку, но регистрацию не ломаем
      sendWelcomeEmail({ email: user.email, name: user.name, surname: user.surname })
        .catch(err => console.error('[register/mock] Email failed:', err))

      return NextResponse.json(
        { id: user.id, name: user.name, email: user.email },
        { status: 201 },
      )
    }

    /* ── Real backend ─────────────────────────────────── */
    // qrPayload — наше внутреннее поле, внешний бэкенд его не ожидает → не шлём
    const res = await fetch(`${BASE_URL}/api/register`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        name, surname, email, phone, password,
        org, position, scope, country, city, lang,
      }),
    })

    const data = await res.json()

    if (res.status !== 201) {
      console.error('[register/prod] External API error:', res.status, JSON.stringify(data))
    }

    if (res.status === 201) {
      sendWelcomeEmail({ email, name, surname })
        .catch(err => console.error('[register/prod] Email failed:', err))
    }

    return NextResponse.json(data, { status: res.status })

  } catch (err) {
    console.error('[register]', err)
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 })
  }
}
