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

export const formatDurationDate = (duration: number): [string | number, string][] => {
  if (duration < A_MINUTE) {
    return [['< 1', 'min']]
  }
  return format(duration)
}

interface DurationStatisticsProps extends StatisticItemProps {
  value: string
  from?: string
}

export const DurationStatistics = (props: DurationStatisticsProps) => {
  const duration = Date.parse(props.value) - (props.from ? Date.parse(props.from) : Date.now())
  return (
    <StatisticItem {...props}>
<<<<<<< HEAD
      {duration > 0 ? <DurationValue value={formatDurationDate(duration)} /> : <></> }
=======
<<<<<<< HEAD
      {duration > 0 ? <DurationValue value={formatDurationDate(duration)} /> : <></> }
=======
      {duration > 0 ? <DurationValue value={formatDurationDate(duration)} /> : <></>}
>>>>>>> 41c69925efbc2a424cdd540aaf66282beb89ee13
>>>>>>> 0eca37350b580e9a27ab91592c86fa5b0a7f4191
    </StatisticItem>
  )
}
