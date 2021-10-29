import BN from 'bn.js'

import { BN_ZERO } from '@/common/constants'
import {
  PastCouncilBudgetSetEventFieldsFragment,
  PastCouncilNewMissedRewardLevelReachedEventFieldsFragment,
  PastCouncilRewardPaidEventFieldsFragment,
  PastCouncilWorkingGroupFieldsFragment,
} from '@/council/queries'
import { asWorkingGroupName } from '@/working-groups/types'

export interface PastCouncilWorkingGroup {
  id: string
  name: string
  totalPaidReward: BN
  totalMissedReward: BN
  budget: BN
}

const groupBy = (items: any[], key: any) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  )

const getTotalMissedReward = (
  events: PastCouncilNewMissedRewardLevelReachedEventFieldsFragment[],
  groupId: string
): BN => {
  events = events.filter((event) => event.groupId === groupId)

  const groupedEvents = groupBy(events, 'workerId')
  console.log(groupedEvents)
  return BN_ZERO
}

export const asPastCouncilWorkingGroup = (
  budgetSetEvents: PastCouncilBudgetSetEventFieldsFragment[],
  rewardPaidEvents: PastCouncilRewardPaidEventFieldsFragment[],
  newMissedRewardLevelReachedEvents: PastCouncilNewMissedRewardLevelReachedEventFieldsFragment[]
) => (fields: PastCouncilWorkingGroupFieldsFragment): PastCouncilWorkingGroup => ({
  id: fields.id,
  name: asWorkingGroupName(fields.name),
  totalPaidReward: rewardPaidEvents
    .filter((rewardEvent) => rewardEvent.groupId === fields.id)
    .reduce((a, b) => a.addn(b.amount), BN_ZERO),
  totalMissedReward: getTotalMissedReward(newMissedRewardLevelReachedEvents, fields.id),
  budget: new BN(budgetSetEvents.find((budgetEvent) => budgetEvent.groupId === fields.id)?.newBudget ?? 0),
})
