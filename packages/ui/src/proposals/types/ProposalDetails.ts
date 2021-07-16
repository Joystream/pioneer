import BN from 'bn.js'

import { asWorkingGroupName } from '@/working-groups/types'

import { ProposalWithDetailsFieldsFragment } from '../queries'

type DetailsFragment = ProposalWithDetailsFieldsFragment['details']
type ProposalDetailsTypename = DetailsFragment['__typename']

interface BaseProposalDetails {
  type: undefined
}

export interface FundingRequestDetails {
  type: 'fundingRequest'
  destinations?: {
    account: string
    amount: number
  }[]
}

export interface CreateLeadOpeningDetails {
  type: 'createWorkingGroupLeadOpening'
  group?: {
    id: string
    name: string
  }
  stakeAmount: BN
  unstakingPeriod: BN
  rewardPerBlock: BN
  openingDescription?: string
}

export interface DecreaseLeadStakeDetails {
  type: 'decreaseWorkingGroupLeadStake'
  member?: {
    id: string
    handle: string
  }
  groupName: string
}

export type ProposalDetails =
  | BaseProposalDetails
  | FundingRequestDetails
  | CreateLeadOpeningDetails
  | DecreaseLeadStakeDetails

const asFundingRequest: DetailsCast<'FundingRequestProposalDetails'> = (fragment): FundingRequestDetails => {
  return {
    type: 'fundingRequest',
    destinations: fragment.destinationsList?.destinations.map((d) => ({ account: d.account, amount: d.amount })),
  }
}

const asCreateLeadOpening: DetailsCast<'CreateWorkingGroupLeadOpeningProposalDetails'> = (
  fragment
): CreateLeadOpeningDetails => {
  const group = fragment.group
    ? {
        id: fragment.group.id,
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

const asDecreaseLeadStake: DetailsCast<'DecreaseWorkingGroupLeadStakeProposalDetails'> = (
  fragment
): DecreaseLeadStakeDetails => {
  const groupName = asWorkingGroupName(fragment.lead?.group.name ?? 'Unknown')
  const member = fragment.lead
    ? {
        id: fragment.lead.membership.id,
        handle: fragment.lead.membership.handle,
      }
    : undefined

  return {
    type: 'decreaseWorkingGroupLeadStake',
    member,
    groupName,
  }
}

interface DetailsCast<T extends ProposalDetailsTypename> {
  (fragment: DetailsFragment & { __typename: T }): ProposalDetails
}

const detailsCasts: Partial<Record<ProposalDetailsTypename, DetailsCast<any>>> = {
  FundingRequestProposalDetails: asFundingRequest,
  CreateWorkingGroupLeadOpeningProposalDetails: asCreateLeadOpening,
  DecreaseWorkingGroupLeadStakeProposalDetails: asDecreaseLeadStake,
}

export const asProposalDetails = (fragment: DetailsFragment): ProposalDetails => {
  const type = fragment.__typename as ProposalDetailsTypename
  const result = detailsCasts[type]?.(fragment)
  return result ?? { type: undefined }
}
