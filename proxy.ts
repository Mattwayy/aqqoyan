import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Next.js 16 Proxy (замена Middleware).
 * Оптимистическая проверка: смотрим наличие next-auth cookie.
 * Полная валидация сессии — в самой странице через getServerSession().
 */
export default function proxy(request: NextRequest) {
  const sessionToken =
    request.cookies.get('next-auth.session-token')?.value ??
    request.cookies.get('__Secure-next-auth.session-token')?.value

  if (!sessionToken) {
    const url = new URL('/', request.url)
    url.searchParams.set('login', '1')
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*'],
}
