'use client'

import dynamic from 'next/dynamic'

const TermsContent = dynamic(
  () => import('./termsContent').then(m => m.TermsContent),
  { ssr: false },
)

export default function TermsWrapper() {
  return <TermsContent />
}
