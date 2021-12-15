import React from 'react'
import styled from 'styled-components'

import { ProgressBarWithRange } from '@/common/components/Progress'
import { StatisticItem } from '@/common/components/statistics'
import { TextSmall, TokenValue } from '@/common/components/typography'

export interface TileSectionProps {
  rangeTitle: string
  rangeValue: number
  maxRangeTitle: string
  maxRangeValue: number
  minRangeTitle: string
  minRangeValue: number
}

export const FundedRange = React.memo(
  ({ rangeTitle, rangeValue, maxRangeTitle, maxRangeValue, minRangeTitle, minRangeValue }: TileSectionProps) => {
    return (
      <FundedRangeWrapper>
        <FundedTitle>
          <TextSmall>{rangeTitle}</TextSmall>
          <TokenValue value={rangeValue} size="l" />
        </FundedTitle>
        <ProgressBarWrapper>
          <ProgressBarWithRange value={20} minRange={50} maxRange={100} /> <TextSmall>{maxRangeTitle}</TextSmall>
          <TokenValue value={maxRangeValue} size="l" />
          <ProgressBarInfoVertical inset="45px 40% 0">
            <TextSmall>{minRangeTitle}</TextSmall>
            <TokenValue value={minRangeValue} />
          </ProgressBarInfoVertical>
        </ProgressBarWrapper>
      </FundedRangeWrapper>
    )
  }
)

const FundedRangeWrapper = styled(StatisticItem)`
  display: inline;
`

const FundedTitle = styled.div`
  display: flex;
  column-gap: 10px;
`

const ProgressBarWrapper = styled.div`
  position: relative;
  display: flex;
  column-gap: 10px;
  > *:first-child {
    align-self: center;
  }
`

const ProgressBarInfoVertical = styled.div<{ inset: string }>`
  display: flex;
  width: max-content;
  position: absolute;
  inset: ${({ inset }) => inset};
  column-gap: 4px;
  align-items: center;
`
