'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

export type ModalView = 'register' | 'success' | 'login'

interface ModalContextType {
  isOpen: boolean
  view: ModalView
  openModal: (view?: ModalView) => void
  closeModal: () => void
  setView: (view: ModalView) => void
}

const ModalContext = createContext<ModalContextType | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState<ModalView>('register')

  const openModal = (v: ModalView = 'register') => {
    setView(v)
    setIsOpen(true)
  }

  const closeModal = () => setIsOpen(false)

  return (
    <ModalContext.Provider value={{ isOpen, view, openModal, closeModal, setView }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used within ModalProvider')
  return ctx
}
