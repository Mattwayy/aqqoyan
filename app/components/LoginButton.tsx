'use client'

import { useModal } from '@/app/context/ModalContext'

interface Props {
  className?: string
  children?: React.ReactNode
}

export default function LoginButton({ className, children }: Props) {
  const { openModal } = useModal()
  return (
    <button
      type="button"
      onClick={() => openModal('login')}
      className={className}
    >
      {children ?? 'Вход / Регистрация'}
    </button>
  )
}
