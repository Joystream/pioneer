import React, { ReactElement } from 'react'

import { MoveFundsModal, MoveFundsModalCall } from '@/accounts/modals/MoveFoundsModal'
import { RecoverBalanceModal, RecoverBalanceModalCall } from '@/accounts/modals/RecoverBalance'
import { TransferModal, TransferModalCall } from '@/accounts/modals/TransferModal'
import { SearchResultsModal, SearchResultsModalCall } from '@/common/components/Search/SearchResultsModal'
import { useModal } from '@/common/hooks/useModal'
import { OnBoardingModal, OnBoardingModalCall } from '@/common/modals/OnBoardingModal'
import { ModalName } from '@/common/providers/modal/types'
import { AnnounceCandidacyModal, AnnounceCandidateModalCall } from '@/council/modals/AnnounceCandidacy'
import { CandidacyPreview } from '@/council/modals/CandidacyPreview/CandidacyPreview'
import { CandidacyPreviewModalCall } from '@/council/modals/CandidacyPreview/types'
import { RevealVoteModal, RevealVoteModalCall } from '@/council/modals/RevealVote'
import { VoteForCouncilModal, VoteForCouncilModalCall } from '@/council/modals/VoteForCouncil'
import { WithdrawCandidacyModal } from '@/council/modals/WithdrawCandidacyModal'
import { WithdrawCandidacyModalCall } from '@/council/modals/WithdrawCandidacyModal/types'
import { CreateThreadModal, CreateThreadModalCall } from '@/forum/modals/CreateThreadModal'
import { EditThreadTitleModal, EditThreadTitleModalCall } from '@/forum/modals/EditThreadTitleModal'
import { CreatePostModal, CreatePostModalCall } from '@/forum/modals/PostActionModal/CreatePostModal'
import { DeletePostModal, DeletePostModalCall } from '@/forum/modals/PostActionModal/DeletePostModal'
import { EditPostModal, EditPostModalCall } from '@/forum/modals/PostActionModal/EditPostModal'
import { PostHistoryModal, PostHistoryModalCall } from '@/forum/modals/PostHistoryModal'
import { MemberModalCall, MemberProfile } from '@/memberships/components/MemberProfile'
import { BuyMembershipModal, BuyMembershipModalCall } from '@/memberships/modals/BuyMembershipModal'
import { SwitchMemberModal, SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'
import { TransferInviteModal, TransferInvitesModalCall } from '@/memberships/modals/TransferInviteModal'
import { AddNewProposalModal, AddNewProposalModalCall } from '@/proposals/modals/AddNewProposal'
import { VoteForProposalModal, VoteForProposalModalCall } from '@/proposals/modals/VoteForProposal'
import { VoteRationaleModalCall } from '@/proposals/modals/VoteRationale/types'
import { VoteRationale } from '@/proposals/modals/VoteRationale/VoteRationale'
import { ApplicationDetailsModal, ApplicationDetailsModalCall } from '@/working-groups/modals/ApplicationDetailsModal'
import { ApplyForRoleModal, ApplyForRoleModalCall } from '@/working-groups/modals/ApplyForRoleModal'
import { ChangeAccountModal, ChangeAccountModalCall } from '@/working-groups/modals/ChangeAccountModal'
import {
  IncreaseWorkerStakeModal,
  IncreaseWorkerStakeModalCall
} from '@/working-groups/modals/IncreaseWorkerStakeModal'
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
  | ModalName<CreatePostModalCall>
  | ModalName<AnnounceCandidateModalCall>
  | ModalName<CandidacyPreviewModalCall>
  | ModalName<VoteForCouncilModalCall>
  | ModalName<WithdrawCandidacyModalCall>
  | ModalName<VoteForProposalModalCall>
  | ModalName<RevealVoteModalCall>
  | ModalName<RecoverBalanceModalCall>
  | ModalName<IncreaseWorkerStakeModalCall>
  | ModalName<OnBoardingModalCall>

const modals: Record<ModalNames, ReactElement> = {
  Member: <MemberProfile />,
  BuyMembership: <BuyMembershipModal />,
  TransferInvites: <TransferInviteModal />,
  TransferTokens: <TransferModal />,
  ApplyForRoleModal: <ApplyForRoleModal />,
  ApplicationDetails: <ApplicationDetailsModal />,
  SwitchMember: <SwitchMemberModal />,
  LeaveRole: <LeaveRoleModal />,
  ChangeAccountModal: <ChangeAccountModal />,
  MoveFundsModal: <MoveFundsModal />,
  AddNewProposalModal: <AddNewProposalModal />,
  VoteRationaleModal: <VoteRationale />,
  CreateThreadModal: <CreateThreadModal />,
  DeletePost: <DeletePostModal />,
  EditPost: <EditPostModal />,
  PostHistory: <PostHistoryModal />,
  EditThreadTitleModal: <EditThreadTitleModal />,
  SearchResults: <SearchResultsModal />,
  CreatePost: <CreatePostModal />,
  AnnounceCandidateModal: <AnnounceCandidacyModal />,
  CandidacyPreview: <CandidacyPreview />,
  VoteForCouncil: <VoteForCouncilModal />,
  WithdrawCandidacy: <WithdrawCandidacyModal />,
  VoteForProposalModal: <VoteForProposalModal />,
  RevealVote: <RevealVoteModal />,
  RecoverBalance: <RecoverBalanceModal />,
  IncreaseWorkerStake: <IncreaseWorkerStakeModal />,
  OnBoardingModal: <OnBoardingModal />
}

export const GlobalModals = () => {
  const { modal } = useModal()

  if (modal && modal in modals) {
    return modals[modal as ModalNames]
  }
  return null
}
