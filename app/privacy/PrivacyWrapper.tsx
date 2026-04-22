'use client'

import dynamic from 'next/dynamic'

const PrivacyContent = dynamic(
  () => import('./privacyContent').then(m => m.PrivacyContent),
  { ssr: false },
)

export default function PrivacyWrapper() {
  return <PrivacyContent />
}
