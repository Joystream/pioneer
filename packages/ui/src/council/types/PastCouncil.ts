import { BN_ZERO } from '@polkadot/util'
import BN from 'bn.js'

import {
  CouncilSpendingEventFieldsFragment,
  FundingRequestApprovedFragment,
  PastCouncilDetailedFieldsFragment,
  PastCouncilFieldsFragment
} from '@/council/queries'
import { asProposalDetails, DetailsFragment, FundingRequestDetails } from '@/proposals/types'

export interface PastCouncil {
  id: string
  endedAtBlock: number
}

export interface PastCouncilWithDetails extends PastCouncil {
  totalSpent: BN
  totalMissedRewards: BN
  totalPaidRewards: BN
  totalSpentOnProposals: BN
}

export const asPastCouncil = (fields: PastCouncilFieldsFragment): PastCouncil => ({
  id: fields.id,
  endedAtBlock: fields.endedAtBlock as number
})

export const getTotalSpent = (spendingEvents: CouncilSpendingEventFieldsFragment[]) =>
  spendingEvents.reduce((a, b) => a.addn(b.amount), BN_ZERO)

export const getSpentOnProposals = (fundingRequests: FundingRequestApprovedFragment[]) => {
  return fundingRequests.reduce((sum, fundingRequest) => {
    const details = asProposalDetails(fundingRequest.proposal.details as DetailsFragment) as FundingRequestDetails
    const amount = details.destinations?.reduce((a, b) => a.addn(b.amount), BN_ZERO) || BN_ZERO

    return sum.add(amount)
  }, BN_ZERO)
}

export const asPastCouncilWithDetails = (
  councilFields: PastCouncilDetailedFieldsFragment,
  spendingEvents: CouncilSpendingEventFieldsFragment[],
  fundingRequestsApproved: FundingRequestApprovedFragment[]
): PastCouncilWithDetails => {
  return {
    ...asPastCouncil(councilFields),
    totalSpent: getTotalSpent(spendingEvents),
    totalMissedRewards: councilFields.councilMembers.reduce((a, b) => a.addn(b.unpaidReward), BN_ZERO).neg(),
    totalPaidRewards: councilFields.councilMembers.reduce((a, b) => a.addn(b.accumulatedReward), BN_ZERO),
    totalSpentOnProposals: getSpentOnProposals(fundingRequestsApproved)
  }
}
