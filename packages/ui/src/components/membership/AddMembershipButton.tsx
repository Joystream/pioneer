import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { useModal } from '../../hooks/useModal'
import { ButtonPrimary, ButtonSize } from '../buttons'

interface AddMembershipButtonProps {
  className?: string
  children: ReactNode
  size?: ButtonSize
}

export const AddMembershipButton = ({ className, children, size }: AddMembershipButtonProps) => {
  const { showModal } = useModal()

  return (
    <AddMemberships size={size} onClick={() => showModal({ modal: 'AddMembership' })} className={className}>
      {children}
    </AddMemberships>
  )
}

const AddMemberships = styled(ButtonPrimary)`
  justify-self: center;
  align-self: center;
`
