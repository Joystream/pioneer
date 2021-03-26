import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { useToggle } from '../../hooks/useToggle'
import { AddMembershipModal } from '../../modals/AddMembershipModal'
import { ButtonPrimary, ButtonSize } from '../buttons'

interface AddMembershipButtonProps {
  className?: string
  children: ReactNode
  size?: ButtonSize
}

export const AddMembershipButton = ({ className, children, size }: AddMembershipButtonProps) => {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <>
      <AddMemberships size={size} onClick={toggleIsOpen} className={className}>
        {children}
      </AddMemberships>
      {isOpen && <AddMembershipModal onClose={toggleIsOpen} />}
    </>
  )
}

const AddMemberships = styled(ButtonPrimary)`
  justify-self: center;
  align-self: center;
`
