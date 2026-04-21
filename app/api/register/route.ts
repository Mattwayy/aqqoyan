import { NextResponse } from 'next/server'
import { getUserByEmail, createUser } from '@/app/lib/serverDb'
import { postEmail } from '../resend/resend'

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/$/, '')
const IS_MOCK  = !BASE_URL || BASE_URL === 'mock'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, name, surname, phone,
            org, position, scope, country, city, lang, comment } = body

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
        org, position, scope, country, city, lang, comment,
        _password: password,
        qrPayload,
      })
        postEmail({ email, name }).catch(err => {
        console.error('[Email] Ошибка отправки в мок-режиме:', err)
      })

      return NextResponse.json(
        { id: user.id, name: user.name, email: user.email },
        { status: 201 },
      )
    }

    /* ── Real backend ─────────────────────────────────── */
    const res = await fetch(`${BASE_URL}/api/register`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        name, surname, email, phone, password,
        org, position, scope, country, city, lang, comment,
        qrPayload,           // ← бэкенд сохраняет вместе с остальными данными
      }),
    })

    const data = await res.json()
     if (res.status === 201) {
      postEmail({ email, name }).catch(err => {
        console.error('[Email] Ошибка отправки:', err)
      })
    }
    return NextResponse.json(data, { status: res.status })

  } catch (err) {
    console.error('[register]', err)
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 })
  }
}
