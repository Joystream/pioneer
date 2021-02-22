import styled from 'styled-components'
import React, { useState } from 'react'
import { AddMembershipModal } from '../modals/AddMembershipModal'
import { ButtonPrimary } from './buttons'

export const AddMembershipButton = () => {
  const [isCreateOpen, setCreateOpen] = useState(false)

  return (
    <>
      <AddMemberships onClick={() => setCreateOpen(true)}>Create a membership</AddMemberships>
      {isCreateOpen && <AddMembershipModal onClose={() => setCreateOpen(false)} />}
    </>
  )
}

const AddMemberships = styled(ButtonPrimary)`
  grid-area: memberaccount;
  justify-self: center;
  align-self: center;
`
