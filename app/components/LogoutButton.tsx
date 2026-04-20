'use client'

import Image from 'next/image'
import { signOut } from 'next-auth/react'

export default function LogoutButton({ className }: { className?: string }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className={className}
      aria-label="Выйти"
    >
      <Image src="/profile/log-out.svg" alt="Выйти" width={20} height={20} />
    </button>
  )
}
