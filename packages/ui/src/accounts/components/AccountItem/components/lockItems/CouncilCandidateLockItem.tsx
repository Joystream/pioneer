import React, { useMemo } from 'react'
import { generatePath } from 'react-router-dom'

import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { asBlock } from '@/common/types'
import { ElectionRoutes } from '@/council/constants'
import { useCandidateIdByMember } from '@/council/hooks/useCandidateIdByMember'
import { CandidacyPreviewModalCall } from '@/council/modals/CandidacyPreview/types'
import { useGetNewCandidateEventsQuery } from '@/council/queries/__generated__/councilEvents.generated'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { LockItem } from '../LockItem'
import { LockLinkButton } from '../LockLinkButton'
import { LockDetailsProps } from '../types'

export const CouncilCandidateLockItem = ({ lock, address, isRecoverable }: LockDetailsProps) => {
  const { api } = useApi()
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
  const electionStart = eventData?.candidate.electionRound.referendumStageVoting?.createdAt
  const voteStageDuration = api?.consts.referendum?.voteStageDuration.toNumber()
  const revealStageDuration = api?.consts.referendum?.revealStageDuration.toNumber()

  const recoveryTime = useMemo(() => {
    if (!electionStart || !voteStageDuration || !revealStageDuration) {
      return
    }
    const startTime = Date.parse(electionStart)
    const durationTime = (voteStageDuration + revealStageDuration) * MILLISECONDS_PER_BLOCK
    const endDate = new Date(startTime + durationTime).toISOString()

    return { time: endDate }
  }, [electionStart, voteStageDuration, revealStageDuration])

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
    const electionPath = generatePath(ElectionRoutes.pastElection, { id: electionId })
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
