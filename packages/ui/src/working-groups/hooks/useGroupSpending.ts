import BN from 'bn.js'

import { useGetBudgetSpendingQuery } from '../queries'

export interface UseGroupSpending {
  spending: BN | null
}

export const useGroupSpending = (groupId: string): UseGroupSpending => {
  const { data, loading } = useGetBudgetSpendingQuery({ variables: { where: { group_eq: groupId } } })

  if (loading || !data) {
    return {
      spending: null,
    }
  }

  return {
    spending: new BN(data.budgetSpendingEvents.reduce((a, b) => a + b.amount, 0)),
  }
}
