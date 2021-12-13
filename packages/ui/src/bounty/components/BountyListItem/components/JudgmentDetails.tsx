import React from 'react'

import { DetailBox } from '@/bounty/components/BountyListItem/components/DetailBox'
import { MemberStack } from '@/memberships/components/MemberStack'
import membersMock from '@/mocks/data/raw/members.json'

export const JudgmentDetails = () => {
  return (
    <>
      <DetailBox title="Entries">
        <MemberStack members={membersMock} max={5} />
      </DetailBox>
      <DetailBox title="Submitted work">2</DetailBox>
      <DetailBox title="Withdrawn work">0</DetailBox>
    </>
  )
}
