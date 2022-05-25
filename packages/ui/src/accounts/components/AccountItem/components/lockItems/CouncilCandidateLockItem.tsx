import faker from 'faker'
import React, { useCallback, useMemo, useState } from 'react'
import { generatePath, useHistory } from 'react-router-dom'

import { lockIcon } from '@/accounts/components/AccountLocks'
import { DropDownButton } from '@/common/components/buttons/DropDownToggle'
import { TokenValue } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { CouncilRoutes } from '@/council/constants'
import { useCandidateIdByMember } from '@/council/hooks/useCandidateIdByMember'
import { CandidacyPreviewModalCall } from '@/council/modals/CandidacyPreview/types'
import { useGetNewCandidateEventsQuery } from '@/council/queries/__generated__/councilEvents.generated'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import {
  AccountDetailsWrap,
  ButtonsCell,
  DetailLabel,
  DetailsItemVoteWrapper,
  DetailsName,
  LocksButtons,
  StyledDropDown,
  TitleCell,
  ValueCell,
} from '../styles'

import { BalanceAmount } from './BalanceAmount'
import { LockDate } from './LockDate'
import { LockLinkButton } from './LockLinkButton'
import { LockRecoveryTime } from './LockRecoveryTime'
import { RecoverButton } from './RecoverButton'
import { LockItemProps } from './types'

export const CouncilCandidateLockItem = ({ lock, address, isRecoverable }: LockItemProps) => {
  const { push } = useHistory()
  const { showModal } = useModal()
  const {
    helpers: { getMemberIdByBoundAccountAddress },
  } = useMyMemberships()

  const [isDropped, setDropped] = useState(false)

  const memberId = useMemo(() => getMemberIdByBoundAccountAddress(address), [address])
  const { candidateId } = useCandidateIdByMember(memberId || '-1')
  const { data } = useGetNewCandidateEventsQuery({ variables: { candidateId } })

  const eventData = data?.newCandidateEvents[0]
  const electionId = eventData?.candidate.electionRoundId

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

  const recoverButton = useMemo(
    () => <RecoverButton memberId={memberId} lock={lock} address={address} isRecoverable={isRecoverable} />,
    [memberId, lock, address, isRecoverable]
  )

  return (
    <DetailsItemVoteWrapper>
      <AccountDetailsWrap onClick={() => setDropped(!isDropped)}>
        <TitleCell>
          {lockIcon(lock.type)}
          <DetailsName>{lock.type ?? 'Unknown lock'}</DetailsName>
        </TitleCell>
        {!isDropped && (
          <ValueCell isRecoverable={isRecoverable}>
            <TokenValue value={lock.amount} />
          </ValueCell>
        )}
        <ButtonsCell>
          {!isDropped && recoverButton}
          <DropDownButton onClick={() => setDropped(!isDropped)} isDropped={isDropped} />
        </ButtonsCell>
      </AccountDetailsWrap>
      <StyledDropDown isDropped={isDropped}>
        <div>
          <DetailLabel>Lock date</DetailLabel>
          <LockDate createdAt={eventData?.createdAt} inBlock={eventData?.inBlock} network={eventData?.network} />
        </div>
        <div>
          <LockRecoveryTime value={faker.date.soon(1).toISOString()} />
        </div>
        <BalanceAmount amount={lock.amount} isRecoverable={isRecoverable} />
        <LocksButtons>
          {candidateId && <LockLinkButton label="Show Candidacy" onClick={goToCandidate} />}
          <LockLinkButton label="Show Election" onClick={goToElection} />
          {recoverButton}
        </LocksButtons>
      </StyledDropDown>
    </DetailsItemVoteWrapper>
  )
}
