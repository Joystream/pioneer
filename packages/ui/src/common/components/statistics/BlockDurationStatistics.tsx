import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { BlockIcon, BlockIconStyles } from '@/common/components/icons'
import { TextSmall } from '@/common/components/typography'
import { DurationValue } from '@/common/components/typography/DurationValue'
import { AN_HOUR, A_DAY, A_MINUTE, A_WEEK, Fonts } from '@/common/constants'
import { plural } from '@/common/helpers'
import { formatTokenValue, MILISECOND_PER_BLOCK, splitDuration } from '@/common/model/formatters'
import { isDefined, toNumber } from '@/common/utils'

import { MultiStatisticItem } from './MultiValueStat'
import { StatisticItem, StatisticItemProps, StatisticItemSpacedContent } from './StatisticItem'

const format = splitDuration([
  [A_WEEK / MILISECOND_PER_BLOCK, 'w'],
  [A_DAY / MILISECOND_PER_BLOCK, 'd'],
  [AN_HOUR / MILISECOND_PER_BLOCK, 'h'],
  [A_MINUTE / MILISECOND_PER_BLOCK, 'min'],
])

interface BlockDurationStatisticsProps extends StatisticItemProps {
  value?: number | BN
}

export const BlockDurationStatistics = (props: BlockDurationStatisticsProps) => {
  if (!isDefined(props.value)) {
    return (
      <StatisticItem {...props}>
        <span>-</span>
      </StatisticItem>
    )
  }

  const duration = toNumber(props.value)

  return (
    <MultiStatisticItem {...props}>
      <ItemRow>
        <DurationValue value={duration > A_MINUTE / MILISECOND_PER_BLOCK ? format(duration) : []} />
      </ItemRow>

      <ItemRow>
        <NumberOfBlocks lighter>
          <BlockIcon /> {formatTokenValue(duration)} block{plural(props.value)}
        </NumberOfBlocks>
      </ItemRow>
    </MultiStatisticItem>
  )
}

const ItemRow = styled(StatisticItemSpacedContent)`
  justify-content: start;
`

const NumberOfBlocks = styled(TextSmall)`
  font-family: ${Fonts.Grotesk};
  ${BlockIconStyles} {
    vertical-align: middle;
  }
`
