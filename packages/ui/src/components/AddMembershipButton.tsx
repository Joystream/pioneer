import React from 'react'
import styled from 'styled-components'
import { useToggle } from '../hooks/useToggle'
import { AddMembershipModal } from '../modals/AddMembershipModal'
import { ButtonPrimary } from './buttons'

export const AddMembershipButton = () => {
  const [isOpen, toggleIsOpen] = useToggle()

  return (
    <>
      <AddMemberships onClick={toggleIsOpen}>Create a membership</AddMemberships>
      {isOpen && <AddMembershipModal onClose={toggleIsOpen} />}
    </>
  )
}

const AddMemberships = styled(ButtonPrimary)`
  grid-area: memberaccount;
  justify-self: center;
  align-self: center;
`
