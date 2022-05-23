import React from 'react'

import { useGetLatestBountyByMemberIdQuery } from '@/bounty/queries'
import { Network } from '@/common/api/queries'
import { BlockTime } from '@/common/components/BlockTime'
import { TextMedium } from '@/common/components/typography'
import { Address, asBlock, Block } from '@/common/types'
import { useCandidateIdByMember } from '@/council/hooks/useCandidateIdByMember'
import { useGetCouncilorElectionEventQuery, useGetCouncilVotesQuery } from '@/council/queries'
import { useGetNewCandidateEventsQuery } from '@/council/queries/__generated__/councilEvents.generated'
import { useGetMemberInvitedEventsQuery } from '@/memberships/queries'
import { Member } from '@/memberships/types'
import { useGetLatestProposalByMemberIdQuery } from '@/proposals/queries'
import { useGetWorkingGroupApplicationsQuery } from '@/working-groups/queries'

interface PropsWithMemberId {
  memberId?: string
}

interface PropsWithAddress {
  address?: Address
}

interface BoundLockDateProps {
  address: Address
  boundMembership?: Member
}

interface LockDateProps {
  createdAt?: string
  inBlock?: number
  network?: Network
}

const LockDate = React.memo(({ createdAt, inBlock, network }: LockDateProps) => {
  if (!createdAt || !inBlock || !network) {
    return <TextMedium value>Unknown</TextMedium>
  }

  const block = asBlock({ createdAt, inBlock, network })

  return <BlockTime block={block} layout="column" />
})

export const BoundAccountLockDate = React.memo(({ address, boundMembership }: BoundLockDateProps) => {
  const boundLockEvent = boundMembership?.boundAccountsEvents?.find((event) => event.account === address)
  const block = boundLockEvent?.createdAtBlock

  if (!block) {
    return null
  }

  return <BlockTime block={block} layout="column" />
})

export const CouncilCandidateLockDate = React.memo(({ memberId }: PropsWithMemberId) => {
  const { candidateId } = useCandidateIdByMember(memberId || '-1')
  const { data } = useGetNewCandidateEventsQuery({ variables: { candidateId } })

  const eventData = data?.newCandidateEvents[0]

  return <LockDate createdAt={eventData?.createdAt} inBlock={eventData?.inBlock} network={eventData?.network} />
})

export const CouncilorLockDate = React.memo(({ memberId }: PropsWithMemberId) => {
  const { data } = useGetCouncilorElectionEventQuery({ variables: { memberId } })
  const eventData = data?.memberships[0]?.councilMembers[0]?.electedInCouncil

  return (
    <LockDate
      createdAt={eventData?.electedAtTime}
      inBlock={eventData?.electedAtBlock}
      network={eventData?.electedAtNetwork}
    />
  )
})

export const ProposalLockDate = React.memo(({ memberId }: PropsWithMemberId) => {
  const { data } = useGetLatestProposalByMemberIdQuery({ variables: { memberId } })
  const eventData = data?.proposals[0].createdInEvent

  return <LockDate createdAt={eventData?.createdAt} inBlock={eventData?.inBlock} network={eventData?.network} />
})

export const BountyLockDate = React.memo(({ memberId }: PropsWithMemberId) => {
  const { data } = useGetLatestBountyByMemberIdQuery({ variables: { memberId } })
  const eventData = data?.bounties[0].createdInEvent

  return <LockDate createdAt={eventData?.createdAt} inBlock={eventData?.inBlock} network={eventData?.network} />
})

export const WorkingGroupLockDate = React.memo(({ memberId }: PropsWithMemberId) => {
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

  return <LockDate createdAt={eventData?.createdAt} inBlock={eventData?.inBlock} network={eventData?.network} />
})

export const VoteLockDate = React.memo(({ address }: PropsWithAddress) => {
  const { data } = useGetCouncilVotesQuery({ variables: { where: { castBy_eq: address } } })
  const eventData = data?.castVotes[0]?.castEvent?.[0]

  return <LockDate createdAt={eventData?.createdAt} inBlock={eventData?.inBlock} network={eventData?.network} />
})

export const InvitationLockDate = React.memo(({ memberId }: PropsWithMemberId) => {
  const { data } = useGetMemberInvitedEventsQuery({ variables: { memberId } })
  const eventData = data?.memberInvitedEvents[0]

  return <LockDate createdAt={eventData?.createdAt} inBlock={eventData?.inBlock} network={eventData?.network} />
})
