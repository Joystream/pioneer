import React from 'react'
import styled from 'styled-components'

import { Description } from '@/bounty/components/Descriptions'
import { Bounty } from '@/bounty/types/Bounty'
import { RowGapBlock } from '@/common/components/page/PageContent'

import { BountyDiscussion } from '../BountyDiscussion/BountyDiscussion'

interface Props {
  bounty: Bounty
}

export const BountyTab = React.memo(({ bounty }: Props) => {
  return (
    <RowGapBlock gap={4}>
      <Description imageUrl={bounty.imageUri} title={bounty.title} description={bounty.description} />
      {bounty.discussionThreadId && (
        <ForumThreadWrapper>
          <BountyDiscussion discussionThreadId={bounty.discussionThreadId} />
        </ForumThreadWrapper>
      )}
    </RowGapBlock>
  )
})

const ForumThreadWrapper = styled.div`
  margin: 30px 0;
`
