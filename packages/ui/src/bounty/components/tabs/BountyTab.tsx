import React from 'react'
import styled from 'styled-components'

import { Description } from '@/bounty/components/Descriptions'
import { Bounty } from '@/bounty/types/Bounty'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'

// todo add forum thread
interface Props {
  bounty: Bounty
}

export const BountyTab = ({ bounty }: Props) => {
  return (
    <RowGapBlock gap={4}>
      <Description imageUrl="https://picsum.photos/500/300" title={bounty.title} description={bounty.title} />
      <ForumThreadWrapper>
        <TextMedium bold>Bounty discussion thread</TextMedium>
      </ForumThreadWrapper>
    </RowGapBlock>
  )
}

const ForumThreadWrapper = styled.div`
  margin: 30px 0;
`
