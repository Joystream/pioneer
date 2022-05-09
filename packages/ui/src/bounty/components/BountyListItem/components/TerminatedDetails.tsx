import React, { memo } from 'react'

import { DetailBox } from '@/bounty/components/BountyListItem/components/DetailBox'
import { MemberStack } from '@/memberships/components/MemberStack'
import { Member } from '@/memberships/types'

interface Props {
  entrants?: Member[]
}

export const TerminatedDetails = memo(({ entrants }: Props) => {
  return (
    <>
      {!!entrants?.length && (
        <DetailBox title="Entries">
          <MemberStack members={entrants} max={5} />
        </DetailBox>
      )}
    </>
  )
})
