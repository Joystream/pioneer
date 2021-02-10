import React, { useState } from 'react'
import { AddMembershipModal } from '../modals/AddMembershipModal'
import { ButtonPrimary } from './buttons'

export const AddMembershipButton = () => {
  const [isCreateOpen, setCreateOpen] = useState(false)

  return (
    <>
      <ButtonPrimary onClick={() => setCreateOpen(true)}>Create a membership</ButtonPrimary>
      {isCreateOpen && <AddMembershipModal onClose={() => setCreateOpen(false)} />}
    </>
  )
}
