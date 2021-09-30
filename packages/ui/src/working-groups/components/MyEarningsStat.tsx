import React from 'react'

import { MultiValueStat } from '@/common/components/statistics'
import { useMyEarnings } from '@/working-groups/hooks/useMyEarnings'

export const MyEarningsStat = () => {
  const earnings = useMyEarnings()

  return (
    <MultiValueStat
      title="Earned in past"
      values={[
        { label: '24 hours', value: earnings?.last24hours },
        { label: 'Month', value: earnings?.month },
      ]}
    />
  )
}
