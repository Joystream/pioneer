import React from 'react'
import { MemberProfile } from '../components/membership/MemberProfile'
import { useModal } from '../hooks/useModal'
import { AddMembershipModal } from '../modals/AddMembershipModal'
import { TransferInviteModal } from '../modals/TransferInviteModal'

export const GlobalModals = () => {
  const { modal } = useModal()

  switch (modal) {
    case 'member':
      return <MemberProfile />
    case 'BuyMembership':
      return <AddMembershipModal />
    case 'TransferInvites':
      return <TransferInviteModal />
    default:
      return null
  }
}
