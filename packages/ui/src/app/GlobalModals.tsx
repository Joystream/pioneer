import { get } from 'lodash'
import React, { memo, ReactElement, useMemo } from 'react'
import ReactDOM from 'react-dom'

import { ClaimVestingModalCall } from '@/accounts/modals/ClaimVestingModal'
import { ClaimVestingModal } from '@/accounts/modals/ClaimVestingModal/ClaimVestingModal'
import { MoveFundsModal, MoveFundsModalCall } from '@/accounts/modals/MoveFoundsModal'
import { RecoverBalanceModal, RecoverBalanceModalCall } from '@/accounts/modals/RecoverBalance'
import { TransferModal, TransferModalCall } from '@/accounts/modals/TransferModal'
import { AddBountyModalCall, AddBountyModal } from '@/bounty/modals/AddBountyModal'
import { AnnounceWorkEntryModal, BountyAnnounceWorkEntryModalCall } from '@/bounty/modals/AnnounceWorkEntryModal'
import { BountyCancelModal, BountyCancelModalCall } from '@/bounty/modals/CancelBountyModal'
import { ClaimRewardModal, ClaimRewardModalCall } from '@/bounty/modals/ClaimRewardModal'
import { ContributeFundsModal, BountyContributeFundsModalCall } from '@/bounty/modals/ContributeFundsModal'
import { SubmitJudgementModal, SubmitJudgementModalCall } from '@/bounty/modals/SubmitJudgementModal'
import { SubmitWorkModal, SubmitWorkModalCall } from '@/bounty/modals/SubmitWorkModal'
import { WithdrawStakeModal } from '@/bounty/modals/WithdrawalStakeModal'
import { WithdrawStakeModalCall } from '@/bounty/modals/WithdrawalStakeModal/types'
import {
  BountyWithdrawContributionModalCall,
  WithdrawContributionModal,
} from '@/bounty/modals/WithdrawContributionModal'
import { BountyWithdrawWorkEntryModalCall, WithdrawWorkEntryModal } from '@/bounty/modals/WithdrawWorkEntryModal'
import { FailureModal } from '@/common/components/FailureModal'
import { SearchResultsModal, SearchResultsModalCall } from '@/common/components/Search/SearchResultsModal'
import { SuccessModal } from '@/common/components/SuccessModal'
import { WaitModal } from '@/common/components/WaitModal'
import { useModal } from '@/common/hooks/useModal'
import { useTransactionStatus } from '@/common/hooks/useTransactionStatus'
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
import { MemberModalCall, MemberProfile } from '@/memberships/components/MemberProfile'
import { BuyMembershipModal, BuyMembershipModalCall } from '@/memberships/modals/BuyMembershipModal'
import { DisconnectWalletModal, DisconnectWalletModalCall } from '@/memberships/modals/DisconnectWalletModal'
import { SignOutModal } from '@/memberships/modals/SignOutModal/SignOutModal'
import { SignOutModalCall } from '@/memberships/modals/SignOutModal/types'
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
  | ModalName<AddBountyModalCall>
  | ModalName<BountyWithdrawContributionModalCall>
  | ModalName<BountyContributeFundsModalCall>
  | ModalName<BountyCancelModalCall>
  | ModalName<WithdrawStakeModalCall>
  | ModalName<SubmitWorkModalCall>
  | ModalName<BountyAnnounceWorkEntryModalCall>
  | ModalName<ClaimRewardModalCall>
  | ModalName<SubmitJudgementModalCall>
  | ModalName<BountyWithdrawWorkEntryModalCall>
  | ModalName<SignOutModalCall>
  | ModalName<DisconnectWalletModalCall>
  | ModalName<ClaimVestingModalCall>
  | ModalName<ReportContentModalCall>

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
  OnBoardingModal: <OnBoardingModal />,
  RestoreVotes: <RestoreVotesModal />,
  AddBounty: <AddBountyModal />,
  BountyWithdrawContributionModal: <WithdrawContributionModal />,
  BountyCancel: <BountyCancelModal />,
  SubmitWork: <SubmitWorkModal />,
  BountyContributeFundsModal: <ContributeFundsModal />,
  ClaimReward: <ClaimRewardModal />,
  BountyAnnounceWorkEntryModal: <AnnounceWorkEntryModal />,
  BountyWithdrawWorkEntryModal: <WithdrawWorkEntryModal />,
  WithdrawStakeModal: <WithdrawStakeModal />,
  SubmitJudgementModal: <SubmitJudgementModal />,
  SignOut: <SignOutModal />,
  DisconnectWallet: <DisconnectWalletModal />,
  ClaimVestingModal: <ClaimVestingModal />,
  ReportContentModal: <ReportContentModal />,
}

export const GlobalModals = () => {
  const { modal, hideModal, currentModalMachine } = useModal()
  const { status } = useTransactionStatus()
  const Modal = useMemo(() => (modal && modal in modals ? memo(() => modals[modal as ModalNames]) : null), [modal])

  const potentialFallback = useGlobalModalHandler(currentModalMachine, hideModal)

  if (Modal || potentialFallback) {
    return ReactDOM.createPortal(
      <TransactionFeesProvider>
        {potentialFallback}
        {Modal && <Modal />}
        {status === 'loadingFees' && <WaitModal onClose={hideModal} requirementsCheck />}
      </TransactionFeesProvider>,
      document.body
    )
  }

  return null
}

const useGlobalModalHandler = (machine: UnknownMachine<any, any, any> | undefined, hideModal: () => void) => {
  if (!machine) return null

  const [state] = machine

  if (state.matches('canceled')) {
    hideModal()
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

  return null
}
