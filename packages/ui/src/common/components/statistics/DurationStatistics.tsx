import React from 'react'
import styled from 'styled-components'

import { Colors, Fonts } from '@/common/constants'
import { dateFromNow } from '@/common/model/formatters'
import { spacing } from '@/common/utils/styles'

import { StatisticItem, StatisticItemProps } from './StatisticItem'

export interface DurationStatisticsProps extends StatisticItemProps {
  value: string
}

export const DurationStatistics = (props: DurationStatisticsProps) => {
  const { days, minutes } = dateFromNow(props.value)
  return (
    <StatisticItem {...props}>
      <Days unit="d">
        {days} <Unit>d</Unit>
      </Days>
      :
      <Days unit="min">
        {minutes} <Unit>min</Unit>
      </Days>
    </StatisticItem>
  )
}

const Days = styled.div<{ unit: string }>`
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
  margin-right: ${spacing(1)};

  &:last-child {
    margin-left: ${spacing(1)};
  }
`

const Unit = styled.span`
  display: inline-block;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: ${Colors.Black[400]};
  font-family: ${Fonts.Grotesk};
`
