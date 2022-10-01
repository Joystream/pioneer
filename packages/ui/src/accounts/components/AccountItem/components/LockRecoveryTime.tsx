import React, { useMemo } from 'react'

import { formatDurationDate } from '@/common/components/statistics'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextInlineMedium } from '@/common/components/typography'
import { DurationValue } from '@/common/components/typography/DurationValue'

import { DetailLabel, RecoveryTimeWrapper, UnrecoverableLabel } from './styles'
import { LockRecoveryTimeProps } from './types'

export const LockRecoveryTime = ({ time, unrecoverableLabel, tooltipLabel }: LockRecoveryTimeProps) => {
  const timeValue = useMemo(() => {
    if (time) {
      const duration = Date.parse(time) - Date.now()

      if (duration <= 0) {
        return <TextInlineMedium>-</TextInlineMedium>
      }

      return <DurationValue value={formatDurationDate(duration)} />
    }

    if (unrecoverableLabel) {
      return <UnrecoverableLabel lighter>{unrecoverableLabel}</UnrecoverableLabel>
    }

    return null
  }, [unrecoverableLabel, time])

  return (
    <div>
      <DetailLabel>Estimated time to recover:</DetailLabel>
      <RecoveryTimeWrapper>
        {timeValue}
        {tooltipLabel && (
          <Tooltip tooltipText={tooltipLabel}>
            <TooltipDefault />
          </Tooltip>
        )}
      </RecoveryTimeWrapper>
    </div>
  )
}
