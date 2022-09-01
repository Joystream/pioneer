import BN from 'bn.js'

import { BN_ZERO } from '@/common/constants'

import { useGetBudgetSpendingQuery } from '../queries'

export interface UseGroupSpending {
  spending: BN | null
}

export const useGroupSpending = (groupId: string): UseGroupSpending => {
  const { data, loading } = useGetBudgetSpendingQuery({ variables: { where: { group: { id_eq: groupId } } } })

  if (loading || !data) {
    return {
      spending: null,
    }
  }

  return {
    spending: new BN(data.budgetSpendingEvents.reduce((a, b) => a.add(new BN(b.amount)), BN_ZERO)),
  }
}
