import React from 'react'
import styled from 'styled-components'

import { DetailBox } from '@/bounty/components/BountyListItem/components/DetailBox'
import { ProgressBar } from '@/common/components/Progress'
import { TokenValue } from '@/common/components/typography'

export const FundingDetails = () => {
  return (
    <>
      <StyledProgressBar size="big" end={30} />
      <DetailBox title="Maximal range">
        <TokenValue value={10000} />
      </DetailBox>
      <DetailBox title="Cherry">
        <TokenValue value={10000} />
      </DetailBox>
    </>
  )
}

const StyledProgressBar = styled(ProgressBar)`
  max-width: 160px;
`
