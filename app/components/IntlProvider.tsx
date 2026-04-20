'use client'

import { NextIntlClientProvider } from 'next-intl'
import { useAppStore } from '@/lib/store'
import ru from '@/messages/ru.json'
import en from '@/messages/en.json'

const messages = { ru, en }

export default function IntlProvider({ children }: { children: React.ReactNode }) {
  const locale = useAppStore(s => s.locale)
  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale]}>
      {children}
    </NextIntlClientProvider>
  )
}
