import React, { ReactNode } from 'react'

import { ButtonSize } from '../../common/components/buttons'
import { useModal } from '../../common/hooks/useModal'
import { BuyMembershipModalCall } from '../modals/BuyMembershipModal'

import { MembershipActionButton } from './CurrentMember'

interface AddMembershipButtonProps {
  className?: string
  children: ReactNode
  size?: ButtonSize
}

export const AddMembershipButton = ({ className, children, size }: AddMembershipButtonProps) => {
  const { showModal } = useModal()

  return (
    <MembershipActionButton
      onClick={() => showModal<BuyMembershipModalCall>({ modal: 'BuyMembership' })}
      className={className}
      size={size}
    >
      {children}
    </MembershipActionButton>
  )
}
