import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { getUserByQrPayload, markVisited } from '@/app/lib/serverDb'

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/$/, '')
const IS_MOCK  = !BASE_URL || BASE_URL === 'mock'

function isWorkerOrAdmin(role?: string) {
  return role === 'worker' || role === 'admin'
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  if (!isWorkerOrAdmin(session.user.role)) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  const { qrPayload } = await req.json()
  if (!qrPayload || typeof qrPayload !== 'string') {
    return NextResponse.json({ message: 'qrPayload required' }, { status: 400 })
  }

  if (IS_MOCK) {
    const user = getUserByQrPayload(qrPayload)
    if (!user) {
      return NextResponse.json({ message: 'Участник не найден' }, { status: 404 })
    }
    markVisited(user.id)
    return NextResponse.json({ success: true, name: `${user.name} ${user.surname}` })
  }

  // Real backend: найти пользователя по qrPayload и отметить visited
  try {
    // Ищем пользователя
    const searchRes = await fetch(
      `${BASE_URL}/api/users?qrPayload=${encodeURIComponent(qrPayload)}&limit=1`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.BACKEND_API_KEY || '',
        },
        cache: 'no-store',
      }
    )
    if (!searchRes.ok) {
      return NextResponse.json({ message: 'Участник не найден' }, { status: 404 })
    }
    const searchData = await searchRes.json()
    const arr = searchData.users ?? searchData.data ?? searchData
    const users = Array.isArray(arr) ? arr : []
    const user = users.find((u: { qrPayload?: string }) => u.qrPayload === qrPayload)
    if (!user) {
      return NextResponse.json({ message: 'Участник не найден' }, { status: 404 })
    }

    // Обновляем visited
    const patchRes = await fetch(`${BASE_URL}/api/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.BACKEND_API_KEY || '',
      },
      body: JSON.stringify({ visited: 'yes' }),
    })
    if (!patchRes.ok) {
      return NextResponse.json({ message: 'Ошибка обновления' }, { status: 502 })
    }
    return NextResponse.json({ success: true, name: `${user.name} ${user.surname ?? ''}`.trim() })
  } catch (err) {
    console.error('[worker/scan]', err)
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 })
  }
}
