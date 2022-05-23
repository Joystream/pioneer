import React from 'react'

import { useGetLatestBountyByMemberIdQuery } from '@/bounty/queries'
import { BlockTime } from '@/common/components/BlockTime'
import { Address, asBlock } from '@/common/types'
import { useCandidateIdByMember } from '@/council/hooks/useCandidateIdByMember'
import { useGetCouncilorElectionEventQuery, useGetCouncilVotesQuery } from '@/council/queries'
import { useGetNewCandidateEventsQuery } from '@/council/queries/__generated__/councilEvents.generated'
import { useGetMemberInvitedEventsQuery } from '@/memberships/queries'
import { Member } from '@/memberships/types'
import { randomBlock } from '@/mocks/helpers/randomBlock'
import { useGetLatestProposalByMemberIdQuery } from '@/proposals/queries'
import { useGetWorkingGroupApplicationsQuery } from '@/working-groups/queries'

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

export const CouncilorLockDate = ({ memberId }: LockDateProps) => {
  const { data } = useGetCouncilorElectionEventQuery({ variables: { memberId } })

  const eventData = data?.memberships[0]?.councilMembers[0]?.electedInCouncil
  if (!eventData) {
    return null
  }

  const block = asBlock({
    createdAt: eventData.electedAtTime,
    inBlock: eventData.electedAtBlock,
    network: eventData.electedAtNetwork,
  })

  return <BlockTime block={block} layout="column" />
}

export const ProposalLockDate = ({ memberId }: LockDateProps) => {
  const { data } = useGetLatestProposalByMemberIdQuery({ variables: { memberId } })

  const eventData = data?.proposals[0].createdInEvent
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

export const BountyLockDate = ({ memberId }: LockDateProps) => {
  const { data } = useGetLatestBountyByMemberIdQuery({ variables: { memberId } })

  const eventData = data?.bounties[0].createdInEvent
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

export const WorkingGroupLockDate = ({ memberId }: LockDateProps) => {
  const { data } = useGetWorkingGroupApplicationsQuery({
    variables: {
      where: {
        applicant: {
          id_eq: memberId,
        },
      },
    },
  })

  const eventData = data?.workingGroupApplications[0].createdInEvent
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

export const VoteLockDate = ({ address }: LockDateProps) => {
  const { data } = useGetCouncilVotesQuery({ variables: { where: { castBy_eq: address } } })
  const votesData = data?.castVotes[0]?.castEvent
  const eventData = votesData && votesData[0]

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

export const InvitationLockDate = ({ memberId }: LockDateProps) => {
  const { data } = useGetMemberInvitedEventsQuery({ variables: { memberId } })
  const eventData = data?.memberInvitedEvents[0]

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
