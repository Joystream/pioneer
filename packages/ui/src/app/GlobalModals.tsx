import React from 'react'

import { MoveFundsModal, MoveFundsModalCall } from '@/accounts/modals/MoveFoundsModal'
import { TransferModal, TransferModalCall } from '@/accounts/modals/TransferModal'
import { SearchResultsModal, SearchResultsModalCall } from '@/common/components/Search/SearchResultsModal'
import { useModal } from '@/common/hooks/useModal'
import { ModalName } from '@/common/providers/modal/types'
import { CreateThreadModal, CreateThreadModalCall } from '@/forum/modals/CreateThreadModal'
import { EditThreadTitleModal, EditThreadTitleModalCall } from '@/forum/modals/EditThreadTitleModal'
import { DeletePostModal, DeletePostModalCall } from '@/forum/modals/PostActionModal/DeletePostModal'
import { EditPostModal, EditPostModalCall } from '@/forum/modals/PostActionModal/EditPostModal'
import { PostHistoryModal, PostHistoryModalCall } from '@/forum/modals/PostHistoryModal'
import { MemberModalCall, MemberProfile } from '@/memberships/components/MemberProfile'
import { BuyMembershipModal, BuyMembershipModalCall } from '@/memberships/modals/BuyMembershipModal'
import { SwitchMemberModal, SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'
import { TransferInviteModal, TransferInvitesModalCall } from '@/memberships/modals/TransferInviteModal'
import { AddNewProposalModal, AddNewProposalModalCall } from '@/proposals/modals/AddNewProposal'
import { VoteRationaleModalCall } from '@/proposals/modals/VoteRationale/types'
import { VoteRationale } from '@/proposals/modals/VoteRationale/VoteRationale'
import { ApplicationDetailsModal, ApplicationDetailsModalCall } from '@/working-groups/modals/ApplicationDetailsModal'
import { ApplyForRoleModal, ApplyForRoleModalCall } from '@/working-groups/modals/ApplyForRoleModal'
import { ChangeAccountModal, ChangeAccountModalCall } from '@/working-groups/modals/ChangeAccountModal'
import { LeaveRoleModal, LeaveRoleModalCall } from '@/working-groups/modals/LeaveRoleModal'

export type ModalNames =
  | ModalName<TransferInvitesModalCall>
  | ModalName<MemberModalCall>
  | ModalName<BuyMembershipModalCall>
  | ModalName<TransferModalCall>
  | ModalName<ApplyForRoleModalCall>
  | ModalName<ApplicationDetailsModalCall>
  | ModalName<SwitchMemberModalCall>
  | ModalName<LeaveRoleModalCall>
  | ModalName<ChangeAccountModalCall>
  | ModalName<MoveFundsModalCall>
  | ModalName<AddNewProposalModalCall>
  | ModalName<VoteRationaleModalCall>
  | ModalName<CreateThreadModalCall>
  | ModalName<DeletePostModalCall>
  | ModalName<EditPostModalCall>
  | ModalName<PostHistoryModalCall>
  | ModalName<EditThreadTitleModalCall>
  | ModalName<SearchResultsModalCall>

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
    case 'SwitchMember':
      return <SwitchMemberModal />
    case 'LeaveRole':
      return <LeaveRoleModal />
    case 'ChangeAccountModal':
      return <ChangeAccountModal />
    case 'MoveFundsModal':
      return <MoveFundsModal />
    case 'AddNewProposalModal':
      return <AddNewProposalModal />
    case 'VoteRationaleModal':
      return <VoteRationale />
    case 'CreateThreadModal':
      return <CreateThreadModal />
    case 'DeletePost':
      return <DeletePostModal />
    case 'EditPost':
      return <EditPostModal />
    case 'PostHistory':
      return <PostHistoryModal />
    case 'EditThreadTitleModal':
      return <EditThreadTitleModal />
    case 'SearchResults':
      return <SearchResultsModal />
    default:
      return null
  }
}
