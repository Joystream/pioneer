import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { ProgressBarWithRange } from '@/common/components/Progress'
import { StatisticItem } from '@/common/components/statistics'
import { TextSmall, TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'

export interface FundedRangeProps {
  rangeValue: number
  maxRangeValue: number
  minRangeValue: number
}

export const FundedRange = React.memo(({ rangeValue, maxRangeValue, minRangeValue }: FundedRangeProps) => {
  const { t } = useTranslation('bounty')
  return (
    <FundedRangeWrapper>
      <FundedTitle>
        <TextSmall>{t('tiles.progressBar.funded')}</TextSmall>
        <TokenValue value={rangeValue} size="l" />
      </FundedTitle>
      <ProgressBarWrapper>
        <ProgressBarWithRange value={20} minRange={50} maxRange={100} />
        <MaxRangeWrapper>
          <MaxRangeTitle>{t('tiles.progressBar.maxRange')}</MaxRangeTitle>
          <TokenValue value={maxRangeValue} size="l" />
        </MaxRangeWrapper>
        <ProgressBarInfoVertical inset="45px 40% 0">
          <TextSmall>{t('tiles.progressBar.minRange')}</TextSmall>
          <TokenValue value={minRangeValue} />
        </ProgressBarInfoVertical>
      </ProgressBarWrapper>
    </FundedRangeWrapper>
  )
})

const MaxRangeWrapper = styled.div``

const MaxRangeTitle = styled(TextSmall)`
  color: ${Colors.Black[500]};
`

const FundedRangeWrapper = styled(StatisticItem)`
  min-width: 55%;
  display: inline;
`

const FundedTitle = styled.div`
  display: flex;
  column-gap: 10px;
  position: absolute;
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
