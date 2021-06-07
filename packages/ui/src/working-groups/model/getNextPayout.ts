import BN from 'bn.js'

import { GroupRewardPeriods, isKnownGroupName, Worker } from '../types'

export function getNextPayout(workers: Pick<Worker, 'group'>[], blockNumber: BN) {
  const blocksUntilNext = (interval: BN) => interval.sub(blockNumber.mod(interval))

  const userGroups = [...new Set(workers.map((worker) => worker.group.name))]
  const nextPayoutPerGroup = userGroups
    .filter(isKnownGroupName)
    .map((name) => GroupRewardPeriods[name])
    .map(blocksUntilNext)

  if (nextPayoutPerGroup.length) {
    return nextPayoutPerGroup.reduce((closest, time) => (closest = BN.min(closest, time)))
  }
  return new BN(-1)
}
