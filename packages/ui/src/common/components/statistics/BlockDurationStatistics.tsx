import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { BlockIcon, BlockIconStyles } from '@/common/components/icons'
import { TextInlineSmall } from '@/common/components/typography'
import { DurationValue } from '@/common/components/typography/DurationValue'
import { AN_HOUR, A_DAY, A_MINUTE, A_WEEK, Fonts } from '@/common/constants'
import { plural } from '@/common/helpers'
import { formatTokenValue, MILISECOND_PER_BLOCK, splitDuration } from '@/common/model/formatters'
import { isDefined, toNumber } from '@/common/utils'

import { ColumnGapBlock } from '../page/PageContent'

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
        <BlocksInfo gap={8}>
          <BlockIcon />
          <NumberOfBlocks lighter>
            {formatTokenValue(duration)} block{plural(props.value)}
          </NumberOfBlocks>
        </BlocksInfo>
      </ItemRow>
    </MultiStatisticItem>
  )
}

const BlocksInfo = styled(ColumnGapBlock)`
  margin-top: 2px;
`

const ItemRow = styled(StatisticItemSpacedContent)`
  justify-content: start;
`

const NumberOfBlocks = styled(TextInlineSmall)`
  font-family: ${Fonts.Grotesk};
  ${BlockIconStyles} {
    vertical-align: middle;
  }
`
