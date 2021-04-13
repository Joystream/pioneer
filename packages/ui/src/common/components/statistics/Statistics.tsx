import React from 'react'
import styled from 'styled-components'

import { TokenValueStat, StatisticItemProps } from './StatisticItem'

interface StatisticsProps {
  stats: Array<StatisticItemProps>
}

export const Statistics = ({ stats }: StatisticsProps) => {
  return (
    <Stats>
      {stats.map(({ title, helperText, value, className }) => (
        <TokenValueStat title={title} helperText={helperText} value={value} className={className} />
      ))}
    </Stats>
  )
}

const Stats = styled.ul`
  display: flex;
  width: 100%;
  justify-items: flex-start;
  margin-top: 8px;
`
