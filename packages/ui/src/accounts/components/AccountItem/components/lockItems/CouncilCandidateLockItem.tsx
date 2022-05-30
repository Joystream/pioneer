import faker from 'faker'
import React, { useCallback, useMemo } from 'react'
import { generatePath, useHistory } from 'react-router-dom'

import { useModal } from '@/common/hooks/useModal'
import { asBlock } from '@/common/types'
import { CouncilRoutes } from '@/council/constants'
import { useCandidateIdByMember } from '@/council/hooks/useCandidateIdByMember'
import { CandidacyPreviewModalCall } from '@/council/modals/CandidacyPreview/types'
import { useGetNewCandidateEventsQuery } from '@/council/queries/__generated__/councilEvents.generated'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { LockItem } from '../LockItem'
import { LockLinkButton } from '../LockLinkButton'
import { LockItemProps } from '../types'

export const CouncilCandidateLockItem = ({ lock, address, isRecoverable }: LockItemProps) => {
  const { push } = useHistory()
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

  const recoveryTime = faker.date.soon(1).toISOString()

  const goToCandidate = useCallback(() => {
    if (!candidateId) {
      return null
    }
    showModal<CandidacyPreviewModalCall>({
      modal: 'CandidacyPreview',
      data: { id: candidateId },
    })
  }, [candidateId])

  const goToElection = useCallback(() => {
    return push(generatePath(CouncilRoutes.pastCouncils, { id: electionId }))
  }, [electionId])

  const linkButtons = useMemo(() => {
    return (
      <>
        <LockLinkButton label="View candidate" onClick={goToCandidate} />
        <LockLinkButton label="View election" onClick={goToElection} />
      </>
    )
  }, [])

  return (
    <LockItem
      lock={lock}
      address={address}
      isRecoverable={isRecoverable}
      createdInEvent={createdInEvent}
      recoveryTime={recoveryTime}
      linkButtons={linkButtons}
    />
  )
}
