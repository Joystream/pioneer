import BN from 'bn.js'
import React, { memo } from 'react'
import styled from 'styled-components'

import { DetailBox } from '@/bounty/components/BountyListItem/components/DetailBox'
import { FundingType, isFundingLimited } from '@/bounty/types/Bounty'
import { ProgressBar, ProgressBarWithRange } from '@/common/components/Progress'
import { TextSmall, TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'

interface Props {
  fundingType: FundingType
  totalFunding: BN
  cherry: BN
}

export const FundingDetails = memo(({ fundingType, totalFunding, cherry }: Props) => {
  if (!isFundingLimited(fundingType)) {
    const { target } = fundingType
    const currentProgress = totalFunding.div(fundingType.target).toNumber()
    const color = currentProgress < 1 ? Colors.Orange[300] : Colors.Blue[500]
    return (
      <ProgressBarWrapper>
        <ProgressBar end={currentProgress} size="medium" color={color} />
        <DetailBox title="Maximal range">
          <TokenValue value={target} />
        </DetailBox>
        <ProgressBarInfoVertical inset="">
          <TextSmall>Funded</TextSmall>
          <TokenValue value={totalFunding} size="l" />
        </ProgressBarInfoVertical>
      </ProgressBarWrapper>
    )
  }

  const { minAmount, maxAmount } = fundingType

  return (
    <>
      <ProgressBarWrapper>
        <ProgressBarWithRange
          value={totalFunding.toNumber()}
          minRange={minAmount.toNumber()}
          maxRange={maxAmount.toNumber()}
          size="medium"
        />
        <DetailBox title="Maximal range">
          <TokenValue value={maxAmount} />
        </DetailBox>
        <ProgressBarInfoVertical inset="">
          <TextSmall>Funded</TextSmall>
          <TokenValue value={totalFunding} size="l" />
        </ProgressBarInfoVertical>
        <ProgressBarInfoVertical inset="45px 40% 0">
          <TextSmall>Minimal range</TextSmall>
          <TokenValue value={minAmount} />
        </ProgressBarInfoVertical>
      </ProgressBarWrapper>
      <DetailBox title="Cherry">
        <TokenValue value={cherry} />
      </DetailBox>
    </>
  )
})

const ProgressBarWrapper = styled.div`
  position: relative;
  max-width: 50%;
  width: 100%;
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
