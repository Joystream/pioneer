import faker from 'faker'
import React, { useCallback, useMemo, useState } from 'react'
import { generatePath, useHistory } from 'react-router-dom'

import { lockIcon } from '@/accounts/components/AccountLocks'
import { BalanceLock } from '@/accounts/types'
import { DropDownButton } from '@/common/components/buttons/DropDownToggle'
import { TokenValue } from '@/common/components/typography'
import { Address } from '@/common/types'
import { CouncilRoutes } from '@/council/constants'
import { useGetCouncilorElectionEventQuery, useGetCouncilVotesQuery } from '@/council/queries'
import { MemberInfo } from '@/memberships/components'
import { useMember } from '@/memberships/hooks/useMembership'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { asMember } from '@/memberships/types'

import { BalanceAmount } from '../BalanceAmount'
import { LockDate } from '../LockDate'
import { LockLinkButton } from '../LockLinkButton'
import { LockReleaseTime } from '../LockReleaseDate'
import { RecoverButton } from '../RecoverButton'
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

interface VoteLockItemProps {
  lock: BalanceLock
  address: Address
  isRecoverable?: boolean
}

export const VoteLockItem = ({ lock, address, isRecoverable }: VoteLockItemProps) => {
  const { push } = useHistory()
  const {
    helpers: { getMemberIdByBoundAccountAddress },
  } = useMyMemberships()

  const [isDropped, setDropped] = useState(false)

  const memberId = useMemo(() => getMemberIdByBoundAccountAddress(address), [address])
  const { data } = useGetCouncilVotesQuery({ variables: { where: { castBy_eq: address } } })
  const vote = data?.castVotes[0]
  const eventData = vote?.castEvent?.[0]
  const electionId = vote?.electionRound.cycleId
  const voteFor = vote?.voteFor?.member

  const goToElection = useCallback(() => {
    return push(generatePath(CouncilRoutes.pastCouncils, { id: electionId }))
  }, [electionId])

  const recoverButton = useMemo(
    () => <RecoverButton memberId={memberId} lock={lock} address={address} isRecoverable={isRecoverable} />,
    [memberId, lock, address, isRecoverable]
  )

  return (
    <DetailsItemVoteWrapper>
      <AccountDetailsWrap
      // onClick={() => setDropped(!isDropped)}
      >
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
          <LockReleaseTime value={faker.date.soon(1).toISOString()} />
        </div>

        <BalanceAmount amount={lock.amount} isRecoverable={isRecoverable} />

        <div>
          <DetailLabel>Voted for:</DetailLabel>
          {voteFor && <MemberInfo member={asMember(voteFor)} onlyTop />}
        </div>

        <LocksButtons>
          {electionId && <LockLinkButton label="Show Election" onClick={goToElection} />}
          {recoverButton}
        </LocksButtons>
      </StyledDropDown>
    </DetailsItemVoteWrapper>
  )
}
