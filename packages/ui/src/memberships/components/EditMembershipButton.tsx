import React, { ReactNode } from 'react'

import { ButtonProps } from '@/common/components/buttons'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { useModal } from '@/common/hooks/useModal'
import { useTransactionStatus } from '@/common/hooks/useTransactionStatus'
import { useMember } from '@/memberships/hooks/useMembership'

import { UpdateMembershipModalCall } from '../modals/UpdateMembershipModal'
import { Member } from '../types'

interface Props extends ButtonProps {
  className?: string
  children: ReactNode
  member: Member
}

export const EditMembershipButton = ({ className, children, member }: Props) => {
  const { isTransactionPending } = useTransactionStatus()
  const { showModal } = useModal()
  const { member: memberWithDetails } = useMember(member.id)

  return (
    <TransactionButton
      style="ghost"
      size="small"
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        if (memberWithDetails) {
          showModal<UpdateMembershipModalCall>({
            modal: 'UpdateMembershipModal',
            data: { member: memberWithDetails },
          })
        }
      }}
      className={className}
      square
      disabled={isTransactionPending || !memberWithDetails}
    >
      {children}
    </TransactionButton>
  )
}
