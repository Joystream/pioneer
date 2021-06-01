import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { WarnedIcon } from '@/common/components/icons/activities/WarnedIcon'
import { MultiStatisticItem } from '@/common/components/statistics/MultiTokenValueStat'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

import { StatisticItemProps, StatisticItemSpacedContent } from './StatisticItem'
import { TokenValueStat, TotalValue } from './TokenValueStat'

export interface StakeStatProps extends StatisticItemProps {
  value: number | BN
  minStake: number
}

const title = 'Stake Height'

export const StakeStat = ({ value, minStake }: StakeStatProps) => {
  if (new BN(value).gte(new BN(minStake))) {
    return <TokenValueStat value={value} title={title} />
  }

  return (
    <MultiStatisticItem title={title} TooltipIcon={Icon} tooltipText={'Some text'}>
      <StatisticItemSpacedContent>
        <TotalValue value={value} textColor={Colors.Red[400]} />
      </StatisticItemSpacedContent>
      <StatisticItemSpacedContent>
        <MinStakeText>
          Minimal Stake: <TotalValue value={minStake} />
        </MinStakeText>
      </StatisticItemSpacedContent>
    </MultiStatisticItem>
  )
}

const MinStakeText = styled(TextMedium)`
  color: ${Colors.Black[500]};
`
const Icon = styled(WarnedIcon)`
  color: ${Colors.Red[400]};
`
