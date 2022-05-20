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

export const CouncilCandidateLockDate = ({ memberId }: LockDateProps) => {
  const { candidateId } = useCandidateIdByMember(memberId || '-1')
  const { data } = useGetNewCandidateEventsQuery({ variables: { candidateId } })

  const eventData = data?.newCandidateEvents[0]

  if (!eventData) {
    return null
  }
  const block = asBlock({
    createdAt: eventData.createdAt,
    inBlock: eventData.inBlock,
    network: eventData.network,
  })

  return <BlockTime block={block} layout="column" />
}
