import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { useToggle } from '../../hooks/useToggle'
import { AddMembershipModal } from '../../modals/AddMembershipModal'
import { Button } from '../buttons'

interface AddMembershipButtonProps {
  className?: string
  children: ReactNode
}

export const AddMembershipButton = ({ className, children }: AddMembershipButtonProps) => {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <>
      <AddMemberships variant="primary" onClick={toggleIsOpen} className={className}>
        {children}
      </AddMemberships>
      {isOpen && <AddMembershipModal onClose={toggleIsOpen} />}
    </>
  )
}

const AddMemberships = styled(Button)`
  justify-self: center;
  align-self: center;
`
