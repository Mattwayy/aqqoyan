'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useModal } from '../context/ModalContext'

/**
 * Встраивается в layout. Если в URL есть ?login=1 —
 * автоматически открывает форму входа и убирает параметр из адреса.
 */
export default function AutoOpenModal() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { openModal } = useModal()

  useEffect(() => {
    if (searchParams.get('login') === '1') {
      openModal('login')
      router.replace('/', { scroll: false })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}