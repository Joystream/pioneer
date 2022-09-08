import React, { ReactNode, useState } from 'react'
import ReactDOM from 'react-dom'

import { ButtonProps } from '@/common/components/buttons'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useTransactionStatus } from '@/common/hooks/useTransactionStatus'
import { useMember } from '@/memberships/hooks/useMembership'

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
  const { member: memberWithDetails } = useMember(member.id)

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
        memberWithDetails &&
        ReactDOM.createPortal(
          <UpdateMembershipModal onClose={() => toggleIsOpen(!isOpen)} member={memberWithDetails} />,
          document.body
        )}
    </>
  )
}
