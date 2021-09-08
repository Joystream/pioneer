import React from 'react'
import styled from 'styled-components'

import { AN_HOUR, A_DAY, A_MINUTE, A_WEEK, Colors, Fonts } from '@/common/constants'
import { splitDuration } from '@/common/model/formatters'
import { intersperse } from '@/common/utils'

import { StatisticItem, StatisticItemProps } from './StatisticItem'

const format = splitDuration([
  [A_WEEK, 'w'],
  [A_DAY, 'd'],
  [AN_HOUR, 'h'],
  [A_MINUTE, 'min'],
])

export interface DurationStatisticsProps extends StatisticItemProps {
  value: string
  from?: string
}

export const DurationStatistics = (props: DurationStatisticsProps) => {
  const duration = Date.parse(props.value) - (props.from ? Date.parse(props.from) : Date.now())
  return (
    <StatisticItem {...props}>
      {duration > A_MINUTE ? (
        intersperse(
          format(duration)
            .flatMap(([amount, unit]) => (amount ? <Period key={unit} amount={amount} unit={unit} /> : []))
            .slice(0, 2),
          (index) => <Separator key={index} />
        )
      ) : (
        <Days>None</Days>
      )}
    </StatisticItem>
  )
}

const Period = ({ amount, unit }: { amount: number; unit: string }) => (
  <Days unit={unit}>
    {amount} <Unit>{unit}</Unit>
  </Days>
)

const Days = styled.div<{ unit?: string }>`
  display: inline-grid;
  position: relative;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: baseline;
  width: fit-content;
  font-weight: 700;
  color: ${Colors.Black[900]};
  font-family: ${Fonts.Grotesk};
  font-size: 20px;
`

const Unit = styled.span`
  display: inline-block;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: ${Colors.Black[400]};
  font-family: ${Fonts.Grotesk};
`

const Separator = styled((props) => <span {...props}>:</span>)`
  display: inline-block;
  margin: 8px;
`
