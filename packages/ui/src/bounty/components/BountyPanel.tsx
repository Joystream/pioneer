import React from 'react'

import { Description } from '@/bounty/components/Descriptions'
import { RowGapBlock } from '@/common/components/page/PageContent'

export const BountyPanel = () => {
  return (
    <RowGapBlock gap={4}>
      <Description imageUrl="https://picsum.photos/500/300" title="Bounty Title" description="Lorem ipsum" />
      <div>FORUM THREAD</div>
    </RowGapBlock>
  )
}
