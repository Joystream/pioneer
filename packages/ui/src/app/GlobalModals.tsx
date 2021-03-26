import React from 'react'
import { MemberProfile } from '../components/membership/MemberProfile'
import { useModal } from '../hooks/useModal'
import { AddMembershipModal } from '../modals/AddMembershipModal'

export const GlobalModals = () => {
  const { modal } = useModal()

  switch (modal) {
    case 'member':
      return <MemberProfile />
    case 'addMembership':
      return <AddMembershipModal />
    default:
      return null
  }
}
