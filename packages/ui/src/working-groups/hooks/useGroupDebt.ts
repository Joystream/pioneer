import BN from 'bn.js'

import { WorkerStatusTypename } from '@/working-groups/types'

import { useGetGroupDebtQuery } from '../queries'

export const useGroupDebt = (groupId: string) => {
  const { data, loading } = useGetGroupDebtQuery({
    variables: { where: { group_eq: groupId, status_json: { isTypeOf_in: [WorkerStatusTypename['active']] } } },
  })

  if (loading || !data) {
    return {
      debt: null,
    }
  }

  return {
    debt: new BN(data.workers.reduce((a, b) => a + b.missingRewardAmount, 0)),
  }
}
