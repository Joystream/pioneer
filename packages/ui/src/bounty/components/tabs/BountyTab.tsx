import React from 'react'
import styled from 'styled-components'

import { Description } from '@/bounty/components/Descriptions'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'

// todo add forum thread
export const BountyTab = () => {
  return (
    <RowGapBlock gap={4}>
      <Description imageUrl="https://picsum.photos/500/300" title="Bounty Title" description="Lorem ipsum" />
      <ForumThreadWrapper>
        <TextMedium bold>Bounty discussion thread</TextMedium>
      </ForumThreadWrapper>
    </RowGapBlock>
  )
}

const ForumThreadWrapper = styled.div`
  margin: 30px 0;
`
