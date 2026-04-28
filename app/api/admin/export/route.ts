import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { getAllUsers } from '@/app/lib/serverDb'
import * as XLSX from 'xlsx'

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

const COLUMNS: { key: string; label: string }[] = [
  { key: 'id',       label: 'ID'           },
  { key: 'name',     label: 'Имя'          },
  { key: 'surname',  label: 'Фамилия'      },
  { key: 'email',    label: 'Email'        },
  { key: 'phone',    label: 'Телефон'      },
  { key: 'org',      label: 'Организация'  },
  { key: 'position', label: 'Должность'    },
  { key: 'scope',    label: 'Сфера'        },
  { key: 'country',  label: 'Страна'       },
  { key: 'city',     label: 'Город'        },
  { key: 'lang',     label: 'Язык'         },
  { key: 'qrPayload',label: 'QR-код'       },
]

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
    console.error('[admin/export] session error:', err)
    return NextResponse.json({ message: 'Auth error' }, { status: 500 })
  }

  /* ── Получаем пользователей ── */
  let rows: Record<string, unknown>[] = []

  if (IS_MOCK) {
    rows = getAllUsers().map(({ _password, ...u }) => u)
  } else {
    try {
      const res = await fetch(`${BASE_URL}/api/users?limit=10000&page=1&per_page=10000`, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.BACKEND_API_KEY || '',
        },
        cache: 'no-store',
      })
      if (res.ok) {
        const raw = await res.json()
        const arr = (raw as Record<string, unknown>).users ?? (raw as Record<string, unknown>).data ?? raw
        rows = Array.isArray(arr) ? arr : []
      }
    } catch (err) {
      console.error('[admin/export]', err)
    }
  }

  /* ── Формируем Excel ── */
  const header = COLUMNS.map(c => c.label)
  const data   = rows.map(row =>
    COLUMNS.map(c => (row[c.key] as string | undefined) ?? '')
  )

  const ws = XLSX.utils.aoa_to_sheet([header, ...data])

  // Ширина колонок
  ws['!cols'] = COLUMNS.map((c) => ({
    wch: Math.max(c.label.length, 18),
  }))

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Участники')

  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
  const date = new Date().toISOString().slice(0, 10)

  return new NextResponse(buf, {
    status: 200,
    headers: {
      'Content-Type':        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="ifbf-users-${date}.xlsx"`,
    },
  })
}
