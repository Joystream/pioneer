import React, { ReactNode } from 'react'

import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'
import { useTransactionStatus } from '@/common/hooks/useTransactionStatus'

import { ButtonSize } from '../../common/components/buttons'

interface InviteMemberButtonProps {
  className?: string
  children: ReactNode
  size: ButtonSize
}

export const InviteMemberButton = ({ className, children, size }: InviteMemberButtonProps) => {
  const { showModal } = useModal()
  const { isTransactionPending } = useTransactionStatus()

  const openModal = () => showModal({ modal: 'InviteMemberModal' })

  return (
    <>
      <TransactionButton
        style="ghost"
        size={size}
        onClick={openModal}
        className={className}
        disabled={isTransactionPending}
      >
        {children}
      </TransactionButton>
    </>
  )
}
