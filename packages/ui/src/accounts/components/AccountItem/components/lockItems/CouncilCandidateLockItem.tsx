import React, { useMemo } from 'react'
import { generatePath } from 'react-router-dom'

import { useModal } from '@/common/hooks/useModal'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { asBlock } from '@/common/types'
import { ElectionRoutes } from '@/council/constants'
import { useCandidateIdByMember } from '@/council/hooks/useCandidateIdByMember'
import { useCouncilRemainingPeriod } from '@/council/hooks/useCouncilRemainingPeriod'
import { CandidacyPreviewModalCall } from '@/council/modals/CandidacyPreview/types'
import { useGetNewCandidateEventsQuery } from '@/council/queries/__generated__/councilEvents.generated'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { LockItem } from '../LockItem'
import { LockLinkButton } from '../LockLinkButton'
import { LockDetailsProps } from '../types'

export const CouncilCandidateLockItem = ({ lock, address, isRecoverable }: LockDetailsProps) => {
  const { showModal } = useModal()
  const {
    helpers: { getMemberIdByBoundAccountAddress },
  } = useMyMemberships()

  const memberId = useMemo(() => getMemberIdByBoundAccountAddress(address), [address])
  const { candidateId } = useCandidateIdByMember(memberId || '-1')
  const { data } = useGetNewCandidateEventsQuery({ variables: { lockAccount: address } })

  const eventData = data?.newCandidateEvents[0]
  const createdInEvent = eventData && asBlock(eventData)

  const electionId = eventData?.candidate.electionRoundId

  const remainingPeriod = useCouncilRemainingPeriod('electionEnd')
  const recoveryTime = useMemo(
    () =>
      !remainingPeriod
        ? { unrecoverableLabel: 'Recoverable after lost election or end of the council term' }
        : {
            time: new Date(Date.now() + remainingPeriod * MILLISECONDS_PER_BLOCK).toISOString(),
            unrecoverableLabel: 'Recoverable after lost election or end of the council term',
            tooltipLabel: 'Estimated time is calculated for complete election with each stage.',
          },
    [remainingPeriod]
  )

  const goToCandidateButton = useMemo(() => {
    if (!candidateId) {
      return null
    }
    const goToCandidate = () =>
      showModal<CandidacyPreviewModalCall>({
        modal: 'CandidacyPreview',
        data: { id: candidateId },
      })
    return <LockLinkButton label="Show Candidacy" onClick={goToCandidate} />
  }, [candidateId])

  const goToElectionButton = useMemo(() => {
    if (!electionId) {
      return null
    }

    const pointsToPastElection = recoveryTime.time && Date.parse(recoveryTime.time) - Date.now() <= 0

    const electionPath = pointsToPastElection
      ? generatePath(ElectionRoutes.pastElection, { id: electionId })
      : generatePath(ElectionRoutes.currentElection)
    return <LockLinkButton label="Show Election" to={electionPath} />
  }, [electionId])

  const linkButtons = (
    <>
      {goToCandidateButton}
      {goToElectionButton}
    </>
  )

  return (
    <LockItem
      lock={lock}
      address={address}
      isRecoverable={isRecoverable}
      createdInEvent={createdInEvent}
      lockRecovery={recoveryTime}
      linkButtons={linkButtons}
    />
  )
}
