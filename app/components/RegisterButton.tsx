'use client'

import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useModal } from '../context/ModalContext'

interface Props {
  className?: string
  children?: React.ReactNode
}

export default function RegisterButton({ className, children }: Props) {
  const t = useTranslations('RegisterButton')
  const { openModal } = useModal()
  const { data: session } = useSession()

  // Скрываем на всех страницах когда пользователь авторизован.
  // В header профильная кнопка уже показана через AuthButton.
  if (session?.user) return null

  return (
    <button
      type="button"
      onClick={() => openModal('register')}
      className={className}
    >
      {children ?? t('label')}
    </button>
  )
}
