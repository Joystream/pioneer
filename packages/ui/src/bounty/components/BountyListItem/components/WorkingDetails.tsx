import BN from 'bn.js'
import React from 'react'

import { DetailBox } from '@/bounty/components/BountyListItem/components/DetailBox'
import { TokenValue } from '@/common/components/typography'
import { MemberStack } from '@/memberships/components/MemberStack'
import { Member } from '@/memberships/types'

interface Props {
  totalFunding: BN
  entrantStake: BN
  entrants?: Member[]
}

export const WorkingDetails = ({ totalFunding, entrantStake, entrants }: Props) => {
  return (
    <>
      <DetailBox title="Bounty">
        <TokenValue size="l" value={totalFunding} />
      </DetailBox>
      {entrants && (
        <DetailBox title="Entries">
          <MemberStack members={entrants} max={5} />
        </DetailBox>
      )}
      <DetailBox title="Submitted work">1</DetailBox>
      <DetailBox title="Stake">
        <TokenValue value={entrantStake} />
      </DetailBox>
    </>
  )
}
