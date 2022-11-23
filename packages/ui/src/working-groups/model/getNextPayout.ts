import { BN_MILLION, BN_ZERO } from '@polkadot/util'
import BN from 'bn.js'

import { Api } from '@/api'

import { Worker } from '../types'

export function getNextPayout(workers: Pick<Worker, 'group'>[], blockNumber: BN, api?: Api) {
  const blocksUntilNext = (interval?: BN) => interval?.sub(blockNumber.mod(interval))

  const userGroups = [...new Set(workers.map((worker) => worker.group.id))]
  const nextPayoutPerGroup = userGroups.map((name) => api?.consts[name].rewardPeriod.toBn()).map(blocksUntilNext)

  if (nextPayoutPerGroup.length) {
    return nextPayoutPerGroup.reduce((closest, time) => (closest = BN.min(closest ?? BN_ZERO, time ?? BN_MILLION)))
  }
  return new BN(-1)
}
