import React from 'react'

import { DetailBox } from '@/bounty/components/BountyListItem/components/DetailBox'
import { TokenValue } from '@/common/components/typography'
import { MemberStack } from '@/memberships/components/MemberStack'
import memberMock from '@/mocks/data/raw/members.json'

export const WithdrawalDetails = () => {
  return (
    <>
      <DetailBox title="Winners">
        <MemberStack members={memberMock} max={5} />
      </DetailBox>
      <DetailBox title="Entries">
        <MemberStack members={memberMock} max={5} />
      </DetailBox>
      <DetailBox title="Unwithdrawn funds">
        <TokenValue value={10000} />
      </DetailBox>
    </>
  )
}
