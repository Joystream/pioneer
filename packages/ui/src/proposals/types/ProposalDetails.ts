import BN from 'bn.js'

import { KeysOfUnion } from '@/common/types/helpers'
import { asWorkingGroupName, GroupIdName } from '@/working-groups/types'

import { asMember, Member } from '../../memberships/types'
import { ProposalWithDetailsFieldsFragment, WorkerProposalDetailsFragment } from '../queries'

import { ProposalType } from '.'

export type DetailsFragment = ProposalWithDetailsFieldsFragment['details']
type ProposalDetailsTypename = DetailsFragment['__typename']

interface BaseProposalDetails {
  type: undefined
}

type ProposalDetailsNew<Type extends ProposalType, Details> = { type: Type } & Details

export type DestinationsDetail = {
  destinations?: {
    account: string
    amount: number
  }[]
}
export type NewByteCodeIdDetail = {
  newBytecodeId?: string
}
export type GroupDetail = {
  group?: {
    id: GroupIdName
    name: string
  }
}
export type AmountDetail = {
  amount: BN
}
export type StakeAmountDetail = {
  stakeAmount: BN
}
export type UnstakingPeriodDetail = {
  unstakingPeriod: BN
}
export type RewardPerBlockDetail = {
  rewardPerBlock: BN
}
export type OpeningDescriptionDetail = {
  openingDescription?: string
}
export type SignalTextDetail = {
  signalText: string
}
export type MemberDetail = {
  member?: Member
}
export type GroupNameDetail = {
  groupName: string
}

export type InvitationsCountDetail = {
  invitationsCount: BN
}

export type ProposalDetail = {
  proposal?: {
    id: string
    title: string
  }
}

export type FundingRequestDetails = ProposalDetailsNew<'fundingRequest', DestinationsDetail>
export type CreateLeadOpeningDetails = ProposalDetailsNew<
  'createWorkingGroupLeadOpening',
  StakeAmountDetail & UnstakingPeriodDetail & RewardPerBlockDetail & OpeningDescriptionDetail & GroupDetail
>
export type DecreaseLeadStakeDetails = ProposalDetailsNew<
  'decreaseWorkingGroupLeadStake',
  MemberDetail & GroupNameDetail & AmountDetail
>
export type SlashLeadDetails = ProposalDetailsNew<
  'slashWorkingGroupLead',
  MemberDetail & GroupNameDetail & AmountDetail
>
export type RuntimeUpgradeDetails = ProposalDetailsNew<'runtimeUpgrade', NewByteCodeIdDetail>

export type UpdateGroupBudgetDetails = ProposalDetailsNew<'updateWorkingGroupBudget', GroupDetail & AmountDetail>

export type MaxValidatorCountDetails = ProposalDetailsNew<'setMaxValidatorCount', AmountDetail>

export type FillWorkingGroupLeadOpeningDetails = ProposalDetailsNew<
  'fillWorkingGroupLeadOpening',
  MemberDetail & GroupDetail
>

export type SetWorkingGroupLeadRewardDetails = ProposalDetailsNew<
  'setWorkingGroupLeadReward',
  MemberDetail & GroupDetail & AmountDetail
>

export type TerminateWorkingGroupLeadDetails = ProposalDetailsNew<
  'terminateWorkingGroupLead',
  MemberDetail & GroupDetail & AmountDetail
>

export type SignalDetails = ProposalDetailsNew<'signal', SignalTextDetail>

export type SetMembershipPriceDetails = ProposalDetailsNew<'setMembershipPrice', AmountDetail>

export type SetCouncilBudgetIncrementDetails = ProposalDetailsNew<'setCouncilBudgetIncrement', AmountDetail>

export type CancelWorkingGroupLeadOpeningDetails = ProposalDetailsNew<
  'cancelWorkingGroupLeadOpening',
  GroupNameDetail | OpeningDescriptionDetail
>

export type SetReferralCutDetails = ProposalDetailsNew<'setReferralCut', AmountDetail>

export type SetInitialInvitationBalanceDetails = ProposalDetailsNew<'setInitialInvitationBalance', AmountDetail>

export type SetInitialInvitationCountDetails = ProposalDetailsNew<'setInitialInvitationCount', InvitationsCountDetail>

export type SetCouncilorRewardDetails = ProposalDetailsNew<'setCouncilorReward', AmountDetail>

export type VetoDetails = ProposalDetailsNew<'veto', ProposalDetail>

export type ProposalDetails =
  | BaseProposalDetails
  | FundingRequestDetails
  | CreateLeadOpeningDetails
  | DecreaseLeadStakeDetails
  | SlashLeadDetails
  | RuntimeUpgradeDetails
  | UpdateGroupBudgetDetails
  | MaxValidatorCountDetails
  | FillWorkingGroupLeadOpeningDetails
  | SetWorkingGroupLeadRewardDetails
  | TerminateWorkingGroupLeadDetails
  | SetMembershipPriceDetails
  | SetCouncilBudgetIncrementDetails
  | SignalDetails
  | CancelWorkingGroupLeadOpeningDetails
  | SetReferralCutDetails
  | SetInitialInvitationBalanceDetails
  | SetInitialInvitationCountDetails
  | SetCouncilorRewardDetails
  | VetoDetails

export type ProposalDetailsKeys = KeysOfUnion<ProposalDetails>

const asFundingRequest: DetailsCast<'FundingRequestProposalDetails'> = (fragment): FundingRequestDetails => {
  return {
    type: 'fundingRequest',
    destinations: fragment.destinationsList?.destinations.map((d) => ({ account: d.account, amount: d.amount })),
  }
}

const asWorkerDetails = (fragment: WorkerProposalDetailsFragment | null | undefined) => ({
  groupName: fragment ? asWorkingGroupName(fragment.group.name ?? 'Unknown') : 'Unknown',
  member: fragment ? asMember(fragment.membership) : undefined,
})

const asCreateLeadOpening: DetailsCast<'CreateWorkingGroupLeadOpeningProposalDetails'> = (
  fragment
): CreateLeadOpeningDetails => {
  const group = fragment.group
    ? {
        id: fragment.group.id as GroupIdName,
        name: asWorkingGroupName(fragment.group.name),
      }
    : undefined
  return {
    type: 'createWorkingGroupLeadOpening',
    group,
    stakeAmount: new BN(fragment.stakeAmount),
    unstakingPeriod: new BN(fragment.unstakingPeriod),
    rewardPerBlock: new BN(fragment.rewardPerBlock),
    openingDescription: fragment.metadata?.description ?? undefined,
  }
}

const asLeadStakeDetails = (
  fragment: ProposalWithDetailsFieldsFragment['details'] &
    (
      | { __typename: 'DecreaseWorkingGroupLeadStakeProposalDetails' }
      | { __typename: 'SlashWorkingGroupLeadProposalDetails' }
    )
) => {
  return {
    ...asWorkerDetails(fragment.lead),
    amount: new BN(fragment.amount),
  }
}

const asDecreaseLeadStake: DetailsCast<'DecreaseWorkingGroupLeadStakeProposalDetails'> = (
  fragment
): DecreaseLeadStakeDetails => ({
  type: 'decreaseWorkingGroupLeadStake',
  ...asLeadStakeDetails(fragment),
})

const asSlashLead: DetailsCast<'SlashWorkingGroupLeadProposalDetails'> = (fragment): SlashLeadDetails => ({
  type: 'slashWorkingGroupLead',
  ...asLeadStakeDetails(fragment),
})

const asRuntimeUpgrade: DetailsCast<'RuntimeUpgradeProposalDetails'> = (fragment): RuntimeUpgradeDetails => ({
  type: 'runtimeUpgrade',
  newBytecodeId: fragment.newRuntimeBytecode?.id,
})

const asUpdateWorkingGroupBudget: DetailsCast<'UpdateWorkingGroupBudgetProposalDetails'> = (
  fragment
): UpdateGroupBudgetDetails => ({
  type: 'updateWorkingGroupBudget',
  amount: new BN(fragment.amount),
  group: {
    id: fragment.group?.id as GroupIdName,
    name: asWorkingGroupName(fragment.group?.name ?? 'Unknown'),
  },
})

const asSetMaxValidatorCount: DetailsCast<'SetMaxValidatorCountProposalDetails'> = (
  fragment
): MaxValidatorCountDetails => ({
  type: 'setMaxValidatorCount',
  amount: new BN(fragment.newMaxValidatorCount),
})

const asFillGroupLeadOpening: DetailsCast<'FillWorkingGroupLeadOpeningProposalDetails'> = (
  fragment
): FillWorkingGroupLeadOpeningDetails => ({
  type: 'fillWorkingGroupLeadOpening',
  member: fragment.application ? asMember(fragment.application.applicant) : undefined,
  group: fragment.opening
    ? {
        id: fragment.opening.group.id as GroupIdName,
        name: fragment.opening.group.name,
      }
    : undefined,
})

const asSetWorkingGroupLeadReward: DetailsCast<'SetWorkingGroupLeadRewardProposalDetails'> = (
  fragment
): SetWorkingGroupLeadRewardDetails => ({
  type: 'setWorkingGroupLeadReward',
  ...asWorkerDetails(fragment.lead),
  amount: new BN(fragment.newRewardPerBlock),
})

const asTerminateWorkingGroupLead: DetailsCast<'TerminateWorkingGroupLeadProposalDetails'> = (
  fragment
): TerminateWorkingGroupLeadDetails => ({
  type: 'terminateWorkingGroupLead',
  ...asWorkerDetails(fragment.lead),
  amount: new BN(fragment.slashingAmount),
})

const asSetMembershipPrice: DetailsCast<'SetMembershipPriceProposalDetails'> = (
  fragment
): SetMembershipPriceDetails => ({
  type: 'setMembershipPrice',
  amount: new BN(fragment.newPrice),
})

const asSetCouncilBudgetIncrement: DetailsCast<'SetCouncilBudgetIncrementProposalDetails'> = (
  fragment
): SetCouncilBudgetIncrementDetails => ({
  type: 'setCouncilBudgetIncrement',
  amount: new BN(fragment.newAmount),
})

const asSignal: DetailsCast<'SignalProposalDetails'> = (fragment): SignalDetails => ({
  type: 'signal',
  signalText: fragment.text,
})

const asCancelGroupOpening: DetailsCast<'CancelWorkingGroupLeadOpeningProposalDetails'> = (
  fragment
): CancelWorkingGroupLeadOpeningDetails => ({
  type: 'cancelWorkingGroupLeadOpening',
  groupName: asWorkingGroupName(fragment.opening?.group.name ?? 'Unknown'),
  openingDescription: fragment.opening?.metadata.description ?? undefined,
})

const asSetReferralCut: DetailsCast<'SetReferralCutProposalDetails'> = (fragment): SetReferralCutDetails => ({
  type: 'setReferralCut',
  amount: new BN(fragment.newReferralCut),
})

const asSetInitialInvitationBalance: DetailsCast<'SetInitialInvitationBalanceProposalDetails'> = (
  fragment
): SetInitialInvitationBalanceDetails => ({
  type: 'setInitialInvitationBalance',
  amount: new BN(fragment.newInitialInvitationBalance),
})

const asSetInitialInvitationCount: DetailsCast<'SetInitialInvitationCountProposalDetails'> = (
  fragment
): SetInitialInvitationCountDetails => ({
  type: 'setInitialInvitationCount',
  invitationsCount: new BN(fragment.newInitialInvitationsCount),
})

const asSetCouncilorReward: DetailsCast<'SetCouncilorRewardProposalDetails'> = (
  fragment
): SetCouncilorRewardDetails => ({
  type: 'setCouncilorReward',
  amount: new BN(fragment.newRewardPerBlock),
})

const asVeto: DetailsCast<'VetoProposalDetails'> = (fragment): VetoDetails => ({
  type: 'veto',
  proposal: fragment.proposal ?? undefined,
})

interface DetailsCast<T extends ProposalDetailsTypename> {
  (fragment: DetailsFragment & { __typename: T }): ProposalDetails
}

const detailsCasts: Partial<Record<ProposalDetailsTypename, DetailsCast<any>>> = {
  FundingRequestProposalDetails: asFundingRequest,
  CreateWorkingGroupLeadOpeningProposalDetails: asCreateLeadOpening,
  DecreaseWorkingGroupLeadStakeProposalDetails: asDecreaseLeadStake,
  SlashWorkingGroupLeadProposalDetails: asSlashLead,
  RuntimeUpgradeProposalDetails: asRuntimeUpgrade,
  UpdateWorkingGroupBudgetProposalDetails: asUpdateWorkingGroupBudget,
  SetMaxValidatorCountProposalDetails: asSetMaxValidatorCount,
  FillWorkingGroupLeadOpeningProposalDetails: asFillGroupLeadOpening,
  SetWorkingGroupLeadRewardProposalDetails: asSetWorkingGroupLeadReward,
  TerminateWorkingGroupLeadProposalDetails: asTerminateWorkingGroupLead,
  SetMembershipPriceProposalDetails: asSetMembershipPrice,
  SetCouncilBudgetIncrementProposalDetails: asSetCouncilBudgetIncrement,
  SignalProposalDetails: asSignal,
  CancelWorkingGroupLeadOpeningProposalDetails: asCancelGroupOpening,
  SetReferralCutProposalDetails: asSetReferralCut,
  SetInitialInvitationBalanceProposalDetails: asSetInitialInvitationBalance,
  SetInitialInvitationCountProposalDetails: asSetInitialInvitationCount,
  SetCouncilorRewardProposalDetails: asSetCouncilorReward,
  VetoProposalDetails: asVeto,
}

export const asProposalDetails = (fragment: DetailsFragment): ProposalDetails => {
  const type = fragment.__typename as ProposalDetailsTypename
  const result = detailsCasts[type]?.(fragment)
  return result ?? { type: undefined }
}
