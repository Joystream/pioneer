import React, { ReactNode, useState } from 'react'
import ReactDOM from 'react-dom'

import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useTransactionStatus } from '@/common/hooks/useTransactionStatus'

import { ButtonProps } from '../../common/components/buttons'
import { UpdateMembershipModal } from '../modals/UpdateMembershipModal'
import { Member } from '../types'

interface Props extends ButtonProps {
  className?: string
  children: ReactNode
  member: Member
}

export const EditMembershipButton = ({ className, children, member }: Props) => {
  const [isOpen, toggleIsOpen] = useState(false)
  const { isTransactionPending } = useTransactionStatus()

  return (
    <>
      <TransactionButton
        style="ghost"
        size="small"
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event.stopPropagation()
          toggleIsOpen(!isOpen)
        }}
        className={className}
        square
        disabled={isTransactionPending}
      >
        {children}
      </TransactionButton>
      {isOpen &&
        ReactDOM.createPortal(
          <UpdateMembershipModal onClose={() => toggleIsOpen(!isOpen)} member={member} />,
          document.body
        )}
    </>
  )
}
