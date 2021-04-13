import React from 'react'
import styled from 'styled-components'

import { TokenValueStat, TokenValueStatProps } from './TokenValueStat'

interface StatisticsProps {
  stats: Array<TokenValueStatProps>
}

export const Statistics = ({ stats }: StatisticsProps) => {
  return (
    <Stats>
      {stats.map((stat) => (
        <TokenValueStat {...stat} />
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
