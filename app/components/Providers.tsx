'use client'

import { SessionProvider } from 'next-auth/react'
import IntlProvider from './IntlProvider'
import ThemeApplier from './ThemeApplier'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <IntlProvider>
        <ThemeApplier />
        {children}
      </IntlProvider>
    </SessionProvider>
  )
}
