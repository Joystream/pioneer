import React from 'react'
import styled from 'styled-components'

import { DetailBox } from '@/bounty/components/BountyListItem/components/DetailBox'
import { ProgressBarWithRange } from '@/common/components/Progress'
import { TextSmall, TokenValue } from '@/common/components/typography'

export const FundingDetails = () => {
  return (
    <>
      <ProgressBarWrapper>
        <ProgressBarWithRange value={20} minRange={50} maxRange={100} size="medium" />
        <DetailBox title="Maximal range">
          <TokenValue value={10000} />
        </DetailBox>
        <ProgressBarInfoVertical inset="">
          <TextSmall>Funded</TextSmall>
          <TokenValue value={10000} size="l" />
        </ProgressBarInfoVertical>
        <ProgressBarInfoVertical inset="45px 40% 0">
          <TextSmall>Minimal range</TextSmall>
          <TokenValue value={10000} />
        </ProgressBarInfoVertical>
      </ProgressBarWrapper>
      <DetailBox title="Cherry">
        <TokenValue value={10000} />
      </DetailBox>
    </>
  )
}

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
