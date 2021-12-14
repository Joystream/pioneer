import React from 'react'
import styled from 'styled-components'

import { BlockDurationStatistics, StatisticItem, Statistics } from '@/common/components/statistics'
import { TextHuge } from '@/common/components/typography'

export interface TileSectionProps {
  stage?: string
  labelTitle?: string
  tooltipText?: string
  durationTitle?: string
  value?: number
}

export const TileSection = React.memo(({ stage, labelTitle, tooltipText, durationTitle, value }: TileSectionProps) => {
  return (
    <Statistics>
      <StatisticItem title={labelTitle} tooltipText={tooltipText}>
        <TextHuge>{stage}</TextHuge>
      </StatisticItem>
      <BlockDurationStatistics title={durationTitle} value={value} />
    </Statistics>
  )
})
