import React from 'react'

import { TransferModal, TransferModalCall } from '../accounts/modals/TransferModal'
import { useModal } from '../common/hooks/useModal'
import { ModalName } from '../common/providers/modal/types'
import { MemberModalCall, MemberProfile } from '../memberships/components/MemberProfile'
import { BuyMembershipModal, BuyMembershipModalCall } from '../memberships/modals/BuyMembershipModal'
import { TransferInviteModal, TransferInvitesModalCall } from '../memberships/modals/TransferInviteModal'
import { ApplicationDetailsModal, ApplicationDetailsModalCall } from '../working-groups/modals/ApplicationDetailsModal'
import { ApplyForRoleModal, ApplyForRoleModalCall } from '../working-groups/modals/ApplyForRoleModal'

type ModalNames =
  | ModalName<TransferInvitesModalCall>
  | ModalName<MemberModalCall>
  | ModalName<BuyMembershipModalCall>
  | ModalName<TransferModalCall>
  | ModalName<ApplyForRoleModalCall>
  | ModalName<ApplicationDetailsModalCall>

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
    case 'ApplyForRoleModal':
      return <ApplyForRoleModal />
    case 'ApplicationDetails':
      return <ApplicationDetailsModal />
    default:
      return null
  }
}
