import BN from 'bn.js'

import { asWorkingGroupName } from '@/working-groups/types'

import { typenameToProposalDetails } from '../model/proposalDetails'
import { ProposalWithDetailsFieldsFragment } from '../queries'

import { ProposalType } from './proposals'

type DetailsFragment = ProposalWithDetailsFieldsFragment['details']
type ProposalDetailsTypename = DetailsFragment['__typename']

interface BaseProposalDetails {
  type: ProposalType
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

export type ProposalDetails = BaseProposalDetails | FundingRequestDetails | CreateLeadOpeningDetails

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

interface DetailsCast<T extends ProposalDetailsTypename> {
  (fragment: DetailsFragment & { __typename: T }): ProposalDetails
}

const detailsCasts: Partial<Record<ProposalDetailsTypename, DetailsCast<any>>> = {
  FundingRequestProposalDetails: asFundingRequest,
  CreateWorkingGroupLeadOpeningProposalDetails: asCreateLeadOpening,
}

export const asProposalDetails = (fragment: DetailsFragment): ProposalDetails => {
  const type = fragment.__typename as ProposalDetailsTypename
  const result = detailsCasts[type]?.(fragment)
  return result ?? { type: typenameToProposalDetails(type) }
}
