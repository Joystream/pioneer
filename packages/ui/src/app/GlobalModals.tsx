import React from 'react'

import { TransferModal, TransferModalCall } from '../accounts/modals/TransferModal'
import { useModal } from '../common/hooks/useModal'
import { ModalName } from '../common/providers/modal/types'
import { MemberModalCall, MemberProfile } from '../memberships/components/MemberProfile'
import { BuyMembershipModal, BuyMembershipModalCall } from '../memberships/modals/BuyMembershipModal'
import { TransferInviteModal, TransferInvitesModalCall } from '../memberships/modals/TransferInviteModal'

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
