import React from 'react'

import { TransferModal, TransferModalCall } from '../accounts/modals/TransferModal'
import { MemberModalCall, MemberProfile } from '../common/components/membership/MemberProfile'
import { useModal } from '../common/hooks/useModal'
import { BuyMembershipModal, BuyMembershipModalCall } from '../membership/modals/BuyMembershipModal'
import { TransferInviteModal, TransferInvitesModalCall } from '../membership/modals/TransferInviteModal'
import { ModalName } from './providers/modal/types'

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
