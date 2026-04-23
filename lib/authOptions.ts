import CredentialsProvider from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'
import { getUserByEmail } from '@/app/lib/serverDb'
import { sendWelcomeEmail } from '@/lib/email/sender'

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/$/, '')
const IS_MOCK  = !BASE_URL || BASE_URL === 'mock'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email'    },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const { email, password } = credentials as { email: string; password: string }

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
            lang:      u.lang      ?? 'ru',
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
      }
      return session
    },
  },

  events: {
    async signIn({ user }) {
      if (!user.email) return
      const u = user as { surname?: string; lang?: string }
      sendWelcomeEmail({
        email:   user.email,
        name:    user.name ?? '',
        surname: u.surname,
        lang:    u.lang ?? 'ru',
      }).catch(err => console.error('[signIn event] Email failed:', err))
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}
