import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'
import { getUserByEmail } from '@/app/lib/serverDb'


const BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/$/, '')
const IS_MOCK  = !BASE_URL || BASE_URL === 'mock'

function getRole(email: string): 'admin' | 'worker' | 'user' {
  const norm = email.toLowerCase()
  const adminEmails = (process.env.ADMIN_EMAILS ?? '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean)
  const workerEmails = (process.env.WORKER_EMAILS ?? '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean)
  if (adminEmails.includes(norm)) return 'admin'
  if (workerEmails.includes(norm)) return 'worker'
  return 'user'
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
        lang:     { label: 'Lang',     type: 'text'     },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const { email, password, lang } = credentials as { email: string; password: string; lang?: string }

        /* ── Mock (dev) ─────────────────────────────────── */
        if (IS_MOCK) {
          const user = getUserByEmail(email)
          if (!user || user._password !== password) return null
          return {
            id:         user.id,
            name:       user.name,
            surname:    user.surname,
            email:      user.email,
            phone:      user.phone,
            org:        user.org,
            position:   user.position,
            qrPayload:  user.qrPayload,
            lang:       lang ?? 'en',
            role:       getRole(email),
          }
        }

        /* ── Real backend ───────────────────────────────── */
        try {
          const res = await fetch(`${BASE_URL}/api/login`, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ email, password }),
          })
          if (!res.ok) return null

          const data = await res.json()
          const u = data.user ?? data   // поддержка обоих форматов ответа

          return {
            id:        String(u.id),
            name:      u.name      ?? '',
            surname:   u.surname   ?? '',
            email:     u.email     ?? email,
            phone:     u.phone     ?? '',
            org:       u.org       ?? '',
            position:  u.position  ?? '',
            qrPayload: u.qrPayload ?? `IFBF2026:${u.id}`,
            lang:      lang ?? u.lang ?? 'en',
            role:      getRole(email),
          }
        } catch (err) {
          console.error('[authorize] backend error:', err)
          return null
        }
      },
    }),
  ],

  pages: {
    signIn: '/?login=1',
  },

  session: {
    strategy: 'jwt',
    maxAge:   7 * 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id        = user.id
        token.surname   = user.surname
        token.phone     = user.phone
        token.org       = user.org
        token.position  = user.position
        token.qrPayload = user.qrPayload
        token.lang      = (user as { lang?: string }).lang ?? 'ru'
        token.role      = user.role ?? 'user'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id        = token.id
        session.user.surname   = token.surname
        session.user.phone     = token.phone
        session.user.org       = token.org
        session.user.position  = token.position
        session.user.qrPayload = token.qrPayload
        session.user.role      = token.role
      }
      return session
    },
  },


  secret: process.env.NEXTAUTH_SECRET,
}
