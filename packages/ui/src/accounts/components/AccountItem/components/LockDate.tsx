import React from 'react'

import { BlockTime } from '@/common/components/BlockTime'
import { Address, asBlock } from '@/common/types'
import { useCandidateIdByMember } from '@/council/hooks/useCandidateIdByMember'
import { useGetNewCandidateEventsQuery } from '@/council/queries/__generated__/councilEvents.generated'
import { Member } from '@/memberships/types'

interface LockDateProps {
  address: Address
  memberId?: string
}

interface BoundLockDateProps {
  address: Address
  boundMembership?: Member
}

export const BoundAccountLockData = ({ address, boundMembership }: BoundLockDateProps) => {
  const boundLockEvent = boundMembership?.boundAccountsEvents?.find((event) => event.account === address)
  const block = boundLockEvent?.createdAtBlock

  if (!block) {
    return null
  }

  return <BlockTime block={block} layout="column" />
}
