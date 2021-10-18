import React from 'react'

import { DurationValue } from '@/common/components/typography/DurationValue'
import { AN_HOUR, A_DAY, A_MINUTE, A_WEEK } from '@/common/constants'
import { splitDuration } from '@/common/model/formatters'

import { StatisticItem, StatisticItemProps } from './StatisticItem'

const format = splitDuration([
  [A_WEEK, 'w'],
  [A_DAY, 'd'],
  [AN_HOUR, 'h'],
  [A_MINUTE, 'min'],
])

interface DurationStatisticsProps extends StatisticItemProps {
  value: string
  from?: string
}

export const DurationStatistics = (props: DurationStatisticsProps) => {
  const duration = Date.parse(props.value) - (props.from ? Date.parse(props.from) : Date.now())
  return (
    <StatisticItem {...props}>
      <DurationValue value={duration > A_MINUTE ? format(duration) : [['< 1', 'min']]} />
    </StatisticItem>
  )
}
