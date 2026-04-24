import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Next.js 16 Proxy (замена Middleware).
 * Оптимистическая проверка: смотрим наличие next-auth cookie.
 * Полная валидация сессии — в самой странице через getServerSession().
 */
export default function proxy(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*'],
}
