import React from 'react'

import { TokenValueStat } from '@/common/components/statistics'
import { sumStakes } from '@/common/utils/bn'
import { useMyWorkers } from '@/working-groups/hooks/useMyWorkers'

export const MyStakeStat = () => {
  const { workers } = useMyWorkers()
  const totalStake = sumStakes(workers)

  return <TokenValueStat title="Currently staking" value={totalStake} />
}
