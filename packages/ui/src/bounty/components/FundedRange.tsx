import React from 'react'
import styled, { css } from 'styled-components'

import { ProgressBarWithRange } from '@/common/components/Progress'
import { StatisticItem } from '@/common/components/statistics'
import { TextSmall, TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'

export interface FundedRangeProps {
  rangeTitle: string
  rangeValue: number
  maxRangeTitle: string
  maxRangeValue: number
  minRangeTitle: string
  minRangeValue: number
}

interface FlatProps {
  flat?: boolean
}

type Props = FundedRangeProps & FlatProps

export const FundedRange = React.memo(
  ({ rangeTitle, rangeValue, maxRangeTitle, maxRangeValue, minRangeTitle, minRangeValue, flat }: Props) => {
    return (
      <FundedRangeWrapper flat={flat}>
        <TopWrapper>
          <ProgressBarWrapper>
            <FundedTitle>
              <TextSmall>{rangeTitle}</TextSmall>
              <TokenValue value={rangeValue} size="s" />
            </FundedTitle>
            <ProgressBarWithRange value={rangeValue} minRange={minRangeValue} maxRange={maxRangeValue} size="big" />
          </ProgressBarWrapper>
          <MaxRangeWrapper flat={flat}>
            <MaxRangeTitle>{maxRangeTitle}</MaxRangeTitle>
            <TokenValue value={maxRangeValue} size="s" />
          </MaxRangeWrapper>
        </TopWrapper>
        <ProgressBarInfoVertical inset="45px 40% 0">
          <TextSmall>{minRangeTitle}</TextSmall>
          <TokenValue value={minRangeValue} size="s" />
        </ProgressBarInfoVertical>
      </FundedRangeWrapper>
    )
  }
)

const flatWrapper = css`
  flex: 0;
  box-shadow: none;
  border: 1px solid ${Colors.Black[300]};
`

const centerTitle = css`
  > p {
    color: ${Colors.Black[500]};
    align-self: center;
  }
`

const TopWrapper = styled.div`
  display: flex;
`

const MaxRangeWrapper = styled.div<FlatProps>`
  margin-left: ${({ flat }) => flat && '20px'};
  width: fit-content;
  margin-top: 7px;
`

const MaxRangeTitle = styled(TextSmall)`
  color: ${Colors.Black[500]};
  margin-bottom: 3px;
`

const FundedRangeWrapper = styled(StatisticItem)<FlatProps>`
  min-width: 55%;
  display: inline;
  ${({ flat }) => flat && flatWrapper}
`

const FundedTitle = styled.div`
  display: flex;
  column-gap: 6px;
  padding-bottom: 7px;
  ${centerTitle}
`

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding: 0 10px 7px 0;
`

const ProgressBarInfoVertical = styled.div<{ inset: string }>`
  display: flex;
  inset: ${({ inset }) => inset};
  column-gap: 6px;
  align-items: center;
  justify-content: center;
  ${centerTitle}
`
