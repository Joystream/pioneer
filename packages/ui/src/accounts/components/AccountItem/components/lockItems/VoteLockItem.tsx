import React, { useCallback, useMemo } from 'react'
import { generatePath, useHistory } from 'react-router-dom'

import { asBlock } from '@/common/types'
import { CouncilRoutes } from '@/council/constants'
import { useGetCouncilVotesQuery } from '@/council/queries'
import { asMember } from '@/memberships/types'

import { LockItem } from '../LockItem'
import { LockLinkButton } from '../LockLinkButton'
import { LockItemProps } from '../types'

export const VoteLockItem = ({ lock, address, isRecoverable }: LockItemProps) => {
  const { push } = useHistory()
  const { data } = useGetCouncilVotesQuery({ variables: { where: { castBy_eq: address } } })
  const vote = data?.castVotes[0]
  const eventData = vote?.castEvent?.[0]
  const createdInEvent = eventData && asBlock(eventData)

  const voteFor = vote?.voteFor?.member
  const voteForMember = voteFor && asMember(voteFor)

  const electionId = vote?.electionRound.cycleId
  const goToElection = useCallback(() => {
    return push(generatePath(CouncilRoutes.pastCouncils, { id: electionId }))
  }, [electionId])

  const linkButton = useMemo(() => <LockLinkButton label="Show Election" onClick={goToElection} />, [goToElection])

  return (
    <LockItem
      lock={lock}
      address={address}
      isRecoverable={isRecoverable}
      createdInEvent={createdInEvent}
      memberInfo={voteForMember}
      linkButtons={linkButton}
    />
  )
}
