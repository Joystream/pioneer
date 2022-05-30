import React from 'react'

import { formatDurationDate } from '@/common/components/statistics'
import { DurationValue } from '@/common/components/typography/DurationValue'

import { DetailLabel } from './styles'

interface LockRecoveryTimeProps {
  value: string
  from?: string
}

export const LockRecoveryTime = ({ value, from }: LockRecoveryTimeProps) => {
  const duration = Date.parse(value) - (from ? Date.parse(from) : Date.now())
  return (
    <div>
      <DetailLabel>Estimated time to recover:</DetailLabel>
      <DurationValue value={formatDurationDate(duration)} />
    </div>
  )
}
