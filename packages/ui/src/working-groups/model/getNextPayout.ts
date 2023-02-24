import BN from 'bn.js'

import { Api } from '@/api'

import { Worker } from '../types'

export function getNextPayout(workers: Pick<Worker, 'group'>[], blockNumber: BN, api?: Api) {

  const userGroups = [...new Set(workers.map((worker) => worker.group.id))];

  const nextPayoutPerGroup = userGroups.flatMap((name) => {
    const interval = api?.consts[name].rewardPeriod.toNumber()

    return interval ? [interval - (blockNumber.toNumber() % interval)] : [];

  })

  if (nextPayoutPerGroup.length === 0) {
    return
  }

  return Math.min(...nextPayoutPerGroup)
}
