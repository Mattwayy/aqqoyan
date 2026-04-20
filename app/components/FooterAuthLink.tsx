'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useModal } from '../context/ModalContext'

export default function FooterAuthLink() {
  const { data: session } = useSession()
  const router = useRouter()
  const { openModal } = useModal()

  function handleClick() {
    if (session?.user) {
      router.push('/profile')
    } else {
      openModal('login')
    }
  }

  return (
    <button
      onClick={handleClick}
      className="text-xs sm:text-sm text-left text-white/70 hover:text-[#5fe3e3] transition-colors flex items-center gap-2 before:content-['•'] before:text-white/40"
    >
      Вход / Личный кабинет
    </button>
  )
}
