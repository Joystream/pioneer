import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { ButtonPrimary, ButtonSize } from '../../common/components/buttons'
import { useModal } from '../../common/hooks/useModal'
import { BuyMembershipModalCall } from '../modals/BuyMembershipModal'

interface AddMembershipButtonProps {
  className?: string
  children: ReactNode
  size?: ButtonSize
}

export const AddMembershipButton = ({ className, children, size }: AddMembershipButtonProps) => {
  const { showModal } = useModal()

  return (
    <AddMemberships
      size={size}
      onClick={() => showModal<BuyMembershipModalCall>({ modal: 'BuyMembership' })}
      className={className}
    >
      {children}
    </AddMemberships>
  )
}

const AddMemberships = styled(ButtonPrimary)`
  justify-self: center;
  align-self: center;
`
