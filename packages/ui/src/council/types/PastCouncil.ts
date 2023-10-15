import { BN_ZERO } from '@polkadot/util'
import BN from 'bn.js'

import { Network } from '@/common/api/queries'
import { asBlock, Block } from '@/common/types'
import {
  CouncilSpendingEventFieldsFragment,
  FundingRequestApprovedFragment,
  PastCouncilBudgetUpdatedEventFieldsFragment,
  PastCouncilDetailedFieldsFragment,
  PastCouncilFieldsFragment,
  PastCouncilRewardPaidEventFieldsFragment,
} from '@/council/queries'
import { asProposalDetails, DetailsFragment, FundingRequestDetails } from '@/proposals/types'

export interface PastCouncil {
  id: string
  endedAt: Block
}

export interface PastCouncilWithDetails extends PastCouncil {
  totalSpent: BN
  totalMissedRewards: BN
  totalPaidRewards: BN
  totalSpentOnProposals: BN
}

export const asPastCouncil = (fields: PastCouncilFieldsFragment): PastCouncil => ({
  id: fields.id,
  endedAt: asBlock({
    createdAt: fields.endedAtTime,
    inBlock: fields.endedAtBlock ?? -1,
    network: fields.endedAtNetwork ?? Network.Olympia,
  }),
})

const getTotalSpent = (
  councilFields: PastCouncilDetailedFieldsFragment,
  workingGroupBudgets: PastCouncilBudgetUpdatedEventFieldsFragment[],
  workingGroupRewardPaidEvents: PastCouncilRewardPaidEventFieldsFragment[],
  fundingRequestsApproved: FundingRequestApprovedFragment[]
) => {
  const totalAccumulatedReward = councilFields.councilMembers.reduce(
    (a, b) => a.add(new BN(b.accumulatedReward)),
    BN_ZERO
  )
  const totalBudgetChange = workingGroupBudgets.reduce((a, b) => a.add(new BN(b.budgetChangeAmount)), BN_ZERO)
  const totalRewardPaid = workingGroupRewardPaidEvents.reduce((a, b) => a.add(new BN(b.amount)), BN_ZERO)
  const spentOnProposal = getSpentOnProposals(fundingRequestsApproved)
  return totalAccumulatedReward.add(totalBudgetChange).add(totalRewardPaid).add(spentOnProposal)
}

export const getSpentOnProposals = (fundingRequests: FundingRequestApprovedFragment[]) => {
  return fundingRequests.reduce((sum, fundingRequest) => {
    const details = asProposalDetails(fundingRequest.details as DetailsFragment) as FundingRequestDetails
    const amount = details.destinations?.reduce((a, b) => a.add(b.amount), BN_ZERO) || BN_ZERO

    return sum.add(amount)
  }, BN_ZERO)
}

export const asPastCouncilWithDetails = (
  workingGroupRewardPaidEvents: PastCouncilRewardPaidEventFieldsFragment[],
  workingGroupBudgets: PastCouncilBudgetUpdatedEventFieldsFragment[],
  councilFields: PastCouncilDetailedFieldsFragment,
  spendingEvents: CouncilSpendingEventFieldsFragment[],
  fundingRequestsApproved: FundingRequestApprovedFragment[]
): PastCouncilWithDetails => {
  return {
    ...asPastCouncil(councilFields),
    totalSpent: getTotalSpent(
      councilFields,
      workingGroupBudgets,
      workingGroupRewardPaidEvents,
      fundingRequestsApproved
    ),
    totalMissedRewards: councilFields.councilMembers.reduce((a, b) => a.add(new BN(b.unpaidReward)), BN_ZERO).neg(),
    totalPaidRewards: councilFields.councilMembers.reduce((a, b) => a.add(new BN(b.accumulatedReward)), BN_ZERO),
    totalSpentOnProposals: getSpentOnProposals(fundingRequestsApproved),
  }
}
