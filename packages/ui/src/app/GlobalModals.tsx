import { get } from 'lodash'
import React, { memo, ReactElement, useEffect, useMemo, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { ClaimVestingModalCall } from '@/accounts/modals/ClaimVestingModal'
import { ClaimVestingModal } from '@/accounts/modals/ClaimVestingModal/ClaimVestingModal'
import { MoveFundsModal, MoveFundsModalCall } from '@/accounts/modals/MoveFundsModal'
import { RecoverBalanceModal, RecoverBalanceModalCall } from '@/accounts/modals/RecoverBalance'
import { TransferModal, TransferModalCall } from '@/accounts/modals/TransferModal'
// import { AddBountyModal, AddBountyModalCall } from '@/bounty/modals/AddBountyModal'
// import { AnnounceWorkEntryModal, BountyAnnounceWorkEntryModalCall } from '@/bounty/modals/AnnounceWorkEntryModal'
// import { BountyCancelModal, BountyCancelModalCall } from '@/bounty/modals/CancelBountyModal'
// import { ClaimRewardModal, ClaimRewardModalCall } from '@/bounty/modals/ClaimRewardModal'
// import { BountyContributeFundsModalCall, ContributeFundsModal } from '@/bounty/modals/ContributeFundsModal'
// import { SubmitJudgementModal, SubmitJudgementModalCall } from '@/bounty/modals/SubmitJudgementModal'
// import { SubmitWorkModal, SubmitWorkModalCall } from '@/bounty/modals/SubmitWorkModal'
// import { WithdrawStakeModal } from '@/bounty/modals/WithdrawalStakeModal'
// import { WithdrawStakeModalCall } from '@/bounty/modals/WithdrawalStakeModal/types'
// import {
//   BountyWithdrawContributionModalCall,
//   WithdrawContributionModal,
// } from '@/bounty/modals/WithdrawContributionModal'
// import { BountyWithdrawWorkEntryModalCall, WithdrawWorkEntryModal } from '@/bounty/modals/WithdrawWorkEntryModal'
import { FailureModal } from '@/common/components/FailureModal'
import { Loading } from '@/common/components/Loading'
import { ModalGlass } from '@/common/components/Modal'
import { SearchResultsModal, SearchResultsModalCall } from '@/common/components/Search/SearchResultsModal'
import { SuccessModal } from '@/common/components/SuccessModal'
import { useModal } from '@/common/hooks/useModal'
import { useTransactionStatus } from '@/common/hooks/useTransactionStatus'
import { ConfirmModal } from '@/common/modals/ConfirmModal/ConfirmModal'
import { OnBoardingModal, OnBoardingModalCall } from '@/common/modals/OnBoardingModal'
import { ReportContentModal, ReportContentModalCall } from '@/common/modals/ReportContentModal'
import { ModalName, UnknownMachine } from '@/common/providers/modal/types'
import { TransactionFeesProvider } from '@/common/providers/transactionFees/provider'
import { AnnounceCandidacyModal, AnnounceCandidateModalCall } from '@/council/modals/AnnounceCandidacy'
import { CandidacyPreview } from '@/council/modals/CandidacyPreview/CandidacyPreview'
import { CandidacyPreviewModalCall } from '@/council/modals/CandidacyPreview/types'
import { RestoreVotesModal, RestoreVotesModalCall } from '@/council/modals/RestoreVotes'
import { RevealVoteModal, RevealVoteModalCall } from '@/council/modals/RevealVote'
import { VoteForCouncilModal, VoteForCouncilModalCall } from '@/council/modals/VoteForCouncil'
import { WithdrawCandidacyModal } from '@/council/modals/WithdrawCandidacyModal'
import { WithdrawCandidacyModalCall } from '@/council/modals/WithdrawCandidacyModal/types'
import { CreateThreadModal, CreateThreadModalCall } from '@/forum/modals/CreateThreadModal'
import { DeleteThreadModal, DeleteThreadModalCall } from '@/forum/modals/DeleteThreadModal'
import { EditThreadTitleModal, EditThreadTitleModalCall } from '@/forum/modals/EditThreadTitleModal'
import { CreatePostModal, CreatePostModalCall } from '@/forum/modals/PostActionModal/CreatePostModal'
import { DeletePostModal, DeletePostModalCall } from '@/forum/modals/PostActionModal/DeletePostModal'
import { EditPostModal, EditPostModalCall } from '@/forum/modals/PostActionModal/EditPostModal'
import { PostHistoryModal, PostHistoryModalCall } from '@/forum/modals/PostHistoryModal'
import { PostReplyModal, PostReplyModalCall } from '@/forum/modals/PostReplyModal'
import { MemberModalCall, MemberProfile } from '@/memberships/components/MemberProfile'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { BuyMembershipModal, BuyMembershipModalCall } from '@/memberships/modals/BuyMembershipModal'
import { DisconnectWalletModal, DisconnectWalletModalCall } from '@/memberships/modals/DisconnectWalletModal'
import { InviteMemberModal } from '@/memberships/modals/InviteMemberModal'
import { InviteMemberModalCall } from '@/memberships/modals/InviteMemberModal/types'
import { SignOutModal } from '@/memberships/modals/SignOutModal/SignOutModal'
import { SignOutModalCall } from '@/memberships/modals/SignOutModal/types'
import { SwitchMemberModal, SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'
import { TransferInviteModal, TransferInvitesModalCall } from '@/memberships/modals/TransferInviteModal'
import { UpdateMembershipModal, UpdateMembershipModalCall } from '@/memberships/modals/UpdateMembershipModal'
import { AddNewProposalModal, AddNewProposalModalCall } from '@/proposals/modals/AddNewProposal'
import { VoteForProposalModal, VoteForProposalModalCall } from '@/proposals/modals/VoteForProposal'
import { VoteRationaleModalCall } from '@/proposals/modals/VoteRationale/types'
import { VoteRationale } from '@/proposals/modals/VoteRationale/VoteRationale'
import { ApplicationDetailsModal, ApplicationDetailsModalCall } from '@/working-groups/modals/ApplicationDetailsModal'
import { ApplyForRoleModal, ApplyForRoleModalCall } from '@/working-groups/modals/ApplyForRoleModal'
import { ChangeAccountModal, ChangeAccountModalCall } from '@/working-groups/modals/ChangeAccountModal'
import {
  IncreaseWorkerStakeModal,
  IncreaseWorkerStakeModalCall,
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
  | ModalName<DeleteThreadModalCall>
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
  | ModalName<RestoreVotesModalCall>
  // | ModalName<AddBountyModalCall>
  // | ModalName<BountyWithdrawContributionModalCall>
  // | ModalName<BountyContributeFundsModalCall>
  // | ModalName<BountyCancelModalCall>
  // | ModalName<WithdrawStakeModalCall>
  // | ModalName<SubmitWorkModalCall>
  // | ModalName<BountyAnnounceWorkEntryModalCall>
  // | ModalName<ClaimRewardModalCall>
  // | ModalName<SubmitJudgementModalCall>
  // | ModalName<BountyWithdrawWorkEntryModalCall>
  | ModalName<SignOutModalCall>
  | ModalName<DisconnectWalletModalCall>
  | ModalName<ClaimVestingModalCall>
  | ModalName<UpdateMembershipModalCall>
  | ModalName<ReportContentModalCall>
  | ModalName<PostReplyModalCall>
  | ModalName<InviteMemberModalCall>

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
  DeleteThreadModal: <DeleteThreadModal />,
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
  InviteMemberModal: <InviteMemberModal />,
  OnBoardingModal: <OnBoardingModal />,
  RestoreVotes: <RestoreVotesModal />,
  // AddBounty: <AddBountyModal />,
  // BountyWithdrawContributionModal: <WithdrawContributionModal />,
  // BountyCancel: <BountyCancelModal />,
  // SubmitWork: <SubmitWorkModal />,
  // BountyContributeFundsModal: <ContributeFundsModal />,
  // ClaimReward: <ClaimRewardModal />,
  // BountyAnnounceWorkEntryModal: <AnnounceWorkEntryModal />,
  // BountyWithdrawWorkEntryModal: <WithdrawWorkEntryModal />,
  // WithdrawStakeModal: <WithdrawStakeModal />,
  // SubmitJudgementModal: <SubmitJudgementModal />,
  SignOut: <SignOutModal />,
  DisconnectWallet: <DisconnectWalletModal />,
  ClaimVestingModal: <ClaimVestingModal />,
  UpdateMembershipModal: <UpdateMembershipModal />,
  ReportContentModal: <ReportContentModal />,
  PostReplyModal: <PostReplyModal />,
}

const GUEST_ACCESSIBLE_MODALS: ModalNames[] = [
  'BuyMembership',
  'OnBoardingModal',
  'SwitchMember',
  'VoteForCouncil',
  'Member',
  'TransferTokens',
  'ApplicationDetails',
  'SearchResults',
  'CandidacyPreview',
  'RevealVote',
  'RecoverBalance',
  'DisconnectWallet',
  'ClaimVestingModal',
  'ReportContentModal',
]

export const MODAL_WITH_CLOSE_CONFIRMATION: ModalNames[] = [
  'AddNewProposalModal',
  'AnnounceCandidateModal',
  'CreatePost',
  'CreateThreadModal',
  'ApplyForRoleModal',
  'VoteForProposalModal',
]

export const GlobalModals = () => {
  const { modal, hideModal, currentModalMachine, showModal, modalData, isClosing } = useModal()
  const { active: activeMember } = useMyMemberships()
  const { status } = useTransactionStatus()
  const Modal = useMemo(() => (modal && modal in modals ? memo(() => modals[modal as ModalNames]) : null), [modal])

  const [container, setContainer] = useState(document.body)
  useEffect(() => {
    const container = document.getElementById('modal-container')
    if (container) setContainer(container)
  }, [])

  const potentialFallback = useGlobalModalHandler(currentModalMachine, hideModal)

  if (modal && !GUEST_ACCESSIBLE_MODALS.includes(modal as ModalNames) && !activeMember) {
    showModal<SwitchMemberModalCall>({
      modal: 'SwitchMember',
      data: {
        originalModalName: modal as ModalNames,
        originalModalData: modalData,
      },
    })
    return null
  }

  if (Modal || potentialFallback) {
    return ReactDOM.createPortal(
      <TransactionFeesProvider>
        {potentialFallback}
        {Modal && <Modal />}
        {isClosing && <ConfirmModal />}
        {status === 'loadingFees' && <LoaderModal onClose={hideModal} />}
      </TransactionFeesProvider>,
      container
    )
  }

  return null
}

export const LoaderModal = ({ onClose }: { onClose: () => void }) => (
  <SpinnerGlass onClick={onClose}>
    <Loading />
  </SpinnerGlass>
)

const SpinnerGlass = styled(ModalGlass)`
  display: grid;
  place-items: center;
  background-color: transparent;
`

const useGlobalModalHandler = (machine: UnknownMachine<any, any, any> | undefined, hideModal: () => void) => {
  if (!machine) return null

  const [state, send] = machine

  if (state.matches('canceled')) {
    const backTarget = state.meta?.['(machine).canceled']?.backTarget
    backTarget ? send(backTarget) : hideModal()
  }

  if (state.matches('error') && get(state.meta, ['(machine).error', 'message'])) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        {get(state.meta, ['(machine).error', 'message'])}
      </FailureModal>
    )
  }

  if (state.matches('success') && get(state.meta, ['(machine).success', 'message'])) {
    return <SuccessModal onClose={hideModal} text={get(state.meta, ['(machine).success', 'message'])} />
  }

  if (state.matches('requirementsVerification')) {
    return <LoaderModal onClose={hideModal} />
  }

  return null
}
