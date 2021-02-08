import React, { useState } from 'react'
import { AddMembershipModal } from '../pages/Profile/MyMemberships/AddMembershipModal'
import { ButtonPrimary } from './buttons'

export const CreateMembershipButton = () => {
  const [isCreateOpen, setCreateOpen] = useState(false)

  return (
    <>
      <ButtonPrimary onClick={() => setCreateOpen(true)}>Create membership</ButtonPrimary>
      {isCreateOpen && <AddMembershipModal onClose={() => setCreateOpen(false)} />}
    </>
  )
}
