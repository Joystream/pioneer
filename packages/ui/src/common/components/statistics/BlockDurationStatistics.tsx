import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { BlockIcon, BlockIconStyles } from '@/common/components/icons'
import { TextInlineSmall } from '@/common/components/typography'
import { DurationValue } from '@/common/components/typography/DurationValue'
import { AN_HOUR, A_DAY, A_MINUTE, A_WEEK, Fonts } from '@/common/constants'
import { plural } from '@/common/helpers'
import { formatTokenValue, MILLISECONDS_PER_BLOCK, splitDuration } from '@/common/model/formatters'
import { isDefined, toNumber } from '@/common/utils'

import { ColumnGapBlock } from '../page/PageContent'

import { MultiStatisticItem } from './MultiValueStat'
import { StatisticItem, StatisticItemProps, StatisticItemSpacedContent } from './StatisticItem'

const format = splitDuration([
  [A_WEEK / MILLISECONDS_PER_BLOCK, 'w'],
  [A_DAY / MILLISECONDS_PER_BLOCK, 'd'],
  [AN_HOUR / MILLISECONDS_PER_BLOCK, 'h'],
  [A_MINUTE / MILLISECONDS_PER_BLOCK, 'min'],
])

export const formatDuration = (duration: number): ['< 1' | number, string][] => {
  if (duration < A_MINUTE / MILLISECONDS_PER_BLOCK) {
    return [['< 1', 'min']]
  }
  return format(duration)
}

interface BlockDurationStatisticsProps extends StatisticItemProps {
  value?: number | BN
  hideBlockNumber?: boolean
  dynamicBlockCount?: number
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
        <DurationValue value={formatDuration(duration)} blocksLeft={props.dynamicBlockCount} />
      </ItemRow>

      {!props.hideBlockNumber && (
        <ItemRow>
          <BlocksInfo gap={8}>
            <BlockIcon />
            <NumberOfBlocks lighter>
              {formatTokenValue(duration)} block{plural(props.value)}
            </NumberOfBlocks>
          </BlocksInfo>
        </ItemRow>
      )}
    </MultiStatisticItem>
  )
}

export const BlocksInfo = styled(ColumnGapBlock)`
  margin-top: 2px;
`

export const ItemRow = styled(StatisticItemSpacedContent)`
  justify-content: start;
`

export const NumberOfBlocks = styled(TextInlineSmall)`
  font-family: ${Fonts.Grotesk};
  ${BlockIconStyles} {
    vertical-align: middle;
  }
`
