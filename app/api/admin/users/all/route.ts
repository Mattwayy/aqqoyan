import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/$/, '')
const IS_MOCK  = !BASE_URL || BASE_URL === 'mock'

function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false
  return (process.env.ADMIN_EMAILS ?? '')
    .split(',').map(e => e.trim().toLowerCase()).filter(Boolean)
    .includes(email.toLowerCase())
}

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    if (!isAdmin(session.user.email)) return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  } catch (err) {
    console.error('[admin/users/all/delete]', err)
    return NextResponse.json({ message: 'Auth error' }, { status: 500 })
  }

  if (IS_MOCK) {
    const { deleteAllUsers } = await import('@/app/lib/serverDb')
    deleteAllUsers()
    return NextResponse.json({ ok: true })
  }

  try {
    const res = await fetch(`${BASE_URL}/api/users`, {
      method: 'DELETE',
      headers: { 'X-API-Key': process.env.BACKEND_API_KEY || '' },
    })
    if (!res.ok) return NextResponse.json({ message: 'Backend error' }, { status: 502 })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[admin/users/all/delete]', err)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
