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
export type MemberDetail = {
  member?: Member
}
export type GroupNameDetail = {
  groupName: string
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
}

export const asProposalDetails = (fragment: DetailsFragment): ProposalDetails => {
  const type = fragment.__typename as ProposalDetailsTypename
  const result = detailsCasts[type]?.(fragment)
  return result ?? { type: undefined }
}
