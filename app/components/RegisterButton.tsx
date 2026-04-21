'use client'
import { useTranslations } from 'next-intl'
import { useModal } from '../context/ModalContext'

interface Props {
  className?: string
  children?: React.ReactNode
} 

export default function RegisterButton({ className, children }: Props) {
  const t = useTranslations('RegisterButton')
  const { openModal } = useModal()

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