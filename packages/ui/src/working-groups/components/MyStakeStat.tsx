import React from 'react'

import { TokenValueStat } from '@/common/components/statistics'
import { useMyWorkers } from '@/working-groups/hooks/useMyWorkers'
import { Worker } from '@/working-groups/types'

const getTotalStake = (workers: Worker[]) => workers.reduce((total, worker) => total + Number(worker.stake), 0)

export const MyStakeStat = () => {
  const { workers } = useMyWorkers()
  const totalStake = getTotalStake(workers)

  return <TokenValueStat title="Currently staking" value={totalStake} />
}
