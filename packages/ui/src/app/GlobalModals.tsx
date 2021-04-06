import React from 'react'

import { MemberModalCall, MemberProfile } from '../components/membership/MemberProfile'
import { useModal } from '../hooks/useModal'
import { BuyMembershipModal, BuyMembershipModalCall } from '../modals/BuyMembershipModal'
import { TransferInviteModal, TransferInvitesModalCall } from '../modals/TransferInviteModal'
import { TransferModal, TransferModalCall } from '../modals/TransferModal'
import { ModalName } from '../providers/modal/types'

type ModalNames =
  | ModalName<TransferInvitesModalCall>
  | ModalName<MemberModalCall>
  | ModalName<BuyMembershipModalCall>
  | ModalName<TransferModalCall>

export const GlobalModals = () => {
  const { modal } = useModal()

  switch (modal as ModalNames) {
    case 'Member':
      return <MemberProfile />
    case 'BuyMembership':
      return <BuyMembershipModal />
    case 'TransferInvites':
      return <TransferInviteModal />
    case 'TransferTokens':
      return <TransferModal />
    default:
      return null
  }
}
