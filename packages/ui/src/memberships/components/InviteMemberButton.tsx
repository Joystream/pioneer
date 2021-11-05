import React, { ReactNode } from 'react'

import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useTransactionStatus } from '@/common/hooks/useTransactionStatus'

import { ButtonSize } from '../../common/components/buttons'
import { useToggle } from '../../common/hooks/useToggle'
import { InviteMemberModal } from '../modals/InviteMemberModal'

interface InviteMemberButtonProps {
  className?: string
  children: ReactNode
  size: ButtonSize
}

export const InviteMemberButton = ({ className, children, size }: InviteMemberButtonProps) => {
  const [isOpen, toggleIsOpen] = useToggle()
  const { isTransactionPending } = useTransactionStatus()

  return (
    <>
      <TransactionButton
        style="ghost"
        size={size}
        onClick={toggleIsOpen}
        className={className}
        disabled={isTransactionPending}
      >
        {children}
      </TransactionButton>
      {isOpen && <InviteMemberModal onClose={toggleIsOpen} />}
    </>
  )
}
