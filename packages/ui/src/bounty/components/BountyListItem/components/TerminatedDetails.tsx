import React, { memo } from 'react'

import { DetailBox } from '@/bounty/components/BountyListItem/components/DetailBox'
import { MemberStack } from '@/memberships/components/MemberStack'
import { Member } from '@/memberships/types'
import membersMock from '@/mocks/data/raw/members.json'

interface Props {
  entrants?: Member[]
}

export const TerminatedDetails = memo(({ entrants }: Props) => {
  return (
    <>
      {!!entrants?.length && (
        <DetailBox title="Entries">
          <MemberStack members={membersMock} max={5} />
        </DetailBox>
      )}
    </>
  )
})
