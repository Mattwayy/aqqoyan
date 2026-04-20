import NextAuth, { DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface User {
    id:         string
    surname?:   string
    phone?:     string
    org?:       string
    position?:  string
    qrPayload?: string
  }

  interface Session {
    user: {
      id:         string
      surname?:   string
      phone?:     string
      org?:       string
      position?:  string
      qrPayload?: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id:         string
    surname?:   string
    phone?:     string
    org?:       string
    position?:  string
    qrPayload?: string
  }
}
