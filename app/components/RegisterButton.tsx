'use client'

import { useModal } from '@/app/context/ModalContext'

interface Props {
  className?: string
  children?: React.ReactNode
}

export default function RegisterButton({ className, children }: Props) {
  const { openModal } = useModal()
  return (
    <button
      type="button"
      onClick={() => openModal('register')}
      className={className}
    >
      {children ?? 'Зарегистрироваться'}
    </button>
  )
}
