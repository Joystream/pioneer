import BN from 'bn.js'

import { BN_ZERO } from '@/common/constants'
import { WorkerStatusToTypename } from '@/working-groups/types'

import { useGetGroupDebtQuery } from '../queries'

export const useGroupDebt = (groupId: string) => {
  const { data, loading } = useGetGroupDebtQuery({
    variables: { where: { group: { id_eq: groupId }, status_json: { isTypeOf_eq: WorkerStatusToTypename['active'] } } },
  })

  if (loading || !data) {
    return {
      debt: null,
    }
  }

  return {
    debt: data.workers.reduce((a, b) => a.add(new BN(b.missingRewardAmount ?? 0)), BN_ZERO),
  }
}
