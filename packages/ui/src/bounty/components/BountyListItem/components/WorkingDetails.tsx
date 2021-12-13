import React from 'react'

import { DetailBox } from '@/bounty/components/BountyListItem/components/DetailBox'
import { TokenValue } from '@/common/components/typography'
import { MemberStack } from '@/memberships/components/MemberStack'
import membersMock from '@/mocks/data/raw/members.json'

export const WorkingDetails = () => {
  return (
    <>
      <DetailBox title="Bounty">
        <TokenValue size="l" value={100} />
      </DetailBox>
      <DetailBox title="Entries">
        <MemberStack members={membersMock} max={5} />
      </DetailBox>
      <DetailBox title="Submitted work">1</DetailBox>
      <DetailBox title="Stake">
        <TokenValue value={1000} />
      </DetailBox>
    </>
  )
}
