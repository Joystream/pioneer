import React from 'react'

import { DetailBox } from '@/bounty/components/BountyListItem/components/DetailBox'
import { TokenValue } from '@/common/components/typography'
import { MemberStack } from '@/memberships/components/MemberStack'
import BN from 'bn.js'
import { EntryMiniature } from '@/bounty/types/Bounty'

interface Props {
  totalFunding: BN
  entrantStake: BN
  entries?: EntryMiniature[]
}

export const WorkingDetails = ({ totalFunding, entrantStake, entries }: Props) => {
  const entrants = entries?.map((entry) => entry.worker)

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
