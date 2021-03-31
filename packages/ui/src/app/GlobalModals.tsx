import React from 'react'
import { MemberProfile } from '../components/membership/MemberProfile'
import { useModal } from '../hooks/useModal'
import { AddMembershipModal } from '../modals/AddMembershipModal'
import { TransferInviteModal } from '../modals/TransferInviteModal'
import { BuyMembershipModal, MemberModal, TransferInvitesModal } from '../providers/modal/provider'
import { ModalName } from '../providers/modal/types'

type ModalNames = ModalName<TransferInvitesModal> | ModalName<MemberModal> | ModalName<BuyMembershipModal>

export const GlobalModals = () => {
  const { modal } = useModal()

  switch (modal as ModalNames) {
    case 'Member':
      return <MemberProfile />
    case 'BuyMembership':
      return <AddMembershipModal />
    case 'TransferInvites':
      return <TransferInviteModal />
    default:
      return null
  }
}
