import React from 'react'

import { DurationStatistics } from '@/common/components/statistics'

interface LockReleaseTimeProps {
  value: string
}

export const LockReleaseTime = ({ value }: LockReleaseTimeProps) => {
  return <DurationStatistics title="Estimated time to recover" value={value} />
}
