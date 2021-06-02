import BN from 'bn.js'

import { GroupRewardPeriods, isKnownGroupName, Worker } from '../types'

export function getNextPayout(workers: Pick<Worker, 'group'>[], blockNumber: BN) {
  const blocksUntilNext = (interval: BN) => interval.sub(blockNumber.mod(interval))

  const nextPayoutPerGroup = workers
    .map((worker) => worker.group.name)
    .filter(distinct)
    .filter(isKnownGroupName)
    .map((name) => GroupRewardPeriods[name])
    .map(blocksUntilNext)

  return nextPayoutPerGroup.length
    ? nextPayoutPerGroup.reduce((closest, time) => (closest = BN.min(closest, time)))
    : undefined
}

const distinct = (name: string, index: number, all: string[]) => index === all.indexOf(name)
