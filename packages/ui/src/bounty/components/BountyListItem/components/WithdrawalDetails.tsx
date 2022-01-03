import React, { memo } from 'react'

import { DetailBox } from '@/bounty/components/BountyListItem/components/DetailBox'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { MemberStack } from '@/memberships/components/MemberStack'
import { Member } from '@/memberships/types'

interface Props {
  winners?: Member[]
  entrants?: Member[]
}

export const WithdrawalDetails = memo(({ winners, entrants }: Props) => {
  return (
    <>
      <DetailBox title="Winners">
        {winners?.length ? (
          <MemberStack members={winners} max={5} />
        ) : (
          <TextMedium black bold>
            None
          </TextMedium>
        )}
      </DetailBox>
      {entrants?.length && (
        <DetailBox title="Entries">
          <MemberStack members={entrants} max={5} />
        </DetailBox>
      )}
      {/* TODO: handle unwithdrawn fund value */}
      <DetailBox title="Unwithdrawn funds">
        <TokenValue value={10000} />
      </DetailBox>
    </>
  )
})
