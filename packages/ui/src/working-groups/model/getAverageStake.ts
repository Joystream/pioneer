import BN from 'bn.js'

import { WorkerFieldsFragment } from '@/working-groups/queries'

export const getAverageStake = (workers: Pick<WorkerFieldsFragment, 'stake'>[]): BN => {
  const totalStake = workers.reduce((a, b) => a.add(new BN(b.stake)), new BN(0))

  return totalStake.divn(workers.length)
}
