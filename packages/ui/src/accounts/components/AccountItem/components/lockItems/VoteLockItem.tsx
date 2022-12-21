import React, { useMemo } from 'react'
import { generatePath } from 'react-router-dom'

import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { asBlock } from '@/common/types'
import { ElectionRoutes } from '@/council/constants'
import { useCouncilRemainingPeriod } from '@/council/hooks/useCouncilRemainingPeriod'
import { useCurrentElection } from '@/council/hooks/useCurrentElection'
import { useGetCouncilVotesQuery } from '@/council/queries'
import { asMember } from '@/memberships/types'

import { LockItem } from '../LockItem'
import { LockLinkButton } from '../LockLinkButton'
import { LockDetailsProps } from '../types'

export const VoteLockItem = ({ lock, address, isRecoverable }: LockDetailsProps) => {
  const { election } = useCurrentElection()
  const { data } = useGetCouncilVotesQuery({ variables: { where: { castBy_eq: address } } })
  const vote = data?.castVotes[0]
  const eventData = vote?.castEvent?.[0]
  const createdInEvent = eventData && asBlock(eventData)

  const voteFor = vote?.voteFor?.member
  const voteForMember = voteFor && asMember(voteFor)

  const remainingPeriod = useCouncilRemainingPeriod('electionEnd')
  const recoveryTime = useMemo(
    () =>
      !remainingPeriod
        ? { unrecoverableLabel: 'Depends on election results' }
        : {
            time: new Date(Date.now() + remainingPeriod * MILLISECONDS_PER_BLOCK).toISOString(),
            unrecoverableLabel: 'Depends on election results',
            tooltipLabel: 'Estimated time is calculated for complete election with each stage.',
          },
    [remainingPeriod]
  )

  const electionId = vote?.electionRound.id

  const goToElectionButton = useMemo(() => {
    if (!electionId || !election) {
      return null
    }

    const pointsToPastElection = election.cycleId !== vote.electionRound.cycleId

    const electionPath = pointsToPastElection
      ? generatePath(ElectionRoutes.pastElection, { id: electionId })
      : generatePath(ElectionRoutes.currentElection)
    return <LockLinkButton label="Show Election" to={electionPath} />
  }, [electionId, election?.cycleId, vote?.electionRound.cycleId])

  return (
    <LockItem
      lock={lock}
      address={address}
      isRecoverable={isRecoverable}
      createdInEvent={createdInEvent}
      lockRecovery={recoveryTime}
      memberInfo={voteForMember}
      linkButtons={goToElectionButton}
    />
  )
}
