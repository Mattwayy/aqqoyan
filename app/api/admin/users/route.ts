import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { getAllUsers } from '@/app/lib/serverDb'

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/$/, '')
const IS_MOCK  = !BASE_URL || BASE_URL === 'mock'

function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false
  const adminEmails = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean)
  return adminEmails.includes(email.toLowerCase())
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    if (!isAdmin(session.user.email)) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
    }
  } catch (err) {
    console.error('[admin/users] session error:', err)
    return NextResponse.json({ message: 'Auth error' }, { status: 500 })
  }

  if (IS_MOCK) {
    const users = getAllUsers().map(({ _password, ...u }) => u).filter(u => !!u.qrPayload)
    return NextResponse.json({ users, total: users.length })
  }

  try {
    const res = await fetch(`${BASE_URL}/api/user`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.BACKEND_API_KEY || '',
      },
      cache: 'no-store',
    })
    if (!res.ok) {
      return NextResponse.json({ message: 'Backend error', status: res.status }, { status: 502 })
    }
    const data = await res.json()
    const users = (data.users ?? data ?? []).filter((u: Record<string, unknown>) => !!u.qrPayload)
    return NextResponse.json({ users, total: users.length })
  } catch (err) {
    console.error('[admin/users]', err)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
