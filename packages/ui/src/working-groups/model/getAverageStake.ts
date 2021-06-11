import BN from 'bn.js'

import { WorkerFieldsFragment } from '@/working-groups/queries'

export const getAverageStake = (workers: Pick<WorkerFieldsFragment, 'stake'>[]): BN => {
  const totalStake = workers.reduce((a, b) => a + b.stake, 0)

  return new BN(Math.round(totalStake / workers.length))
}
