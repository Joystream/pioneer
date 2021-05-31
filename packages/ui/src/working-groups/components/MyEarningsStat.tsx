import BN from 'bn.js'
import React from 'react'

import { MultiTokenValueStat } from '@/common/components/statistics'
import { useMyEarnings } from '@/working-groups/hooks/useMyEarnings'

export const MyEarningsStat = () => {
  const earnings = useMyEarnings()

  return (
    <MultiTokenValueStat
      title="Earned in past"
      values={[
        { label: '24 hours', value: new BN(200) },
        { label: 'Month', value: new BN(102_000) },
      ]}
    />
  )
}
