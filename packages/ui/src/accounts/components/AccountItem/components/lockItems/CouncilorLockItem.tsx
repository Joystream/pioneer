import { BN_ZERO } from '@polkadot/util'
import BN from 'bn.js'
import faker from 'faker'
import React, { useCallback, useMemo, useState } from 'react'
import { generatePath, useHistory } from 'react-router-dom'

import { lockIcon } from '@/accounts/components/AccountLocks'
import { DropDownButton } from '@/common/components/buttons/DropDownToggle'
import { TokenValue } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { MILLISECONDS_PER_BLOCK } from '@/common/model/formatters'
import { CouncilRoutes } from '@/council/constants'
import { useGetCouncilorElectionEventQuery } from '@/council/queries'
import { useMember } from '@/memberships/hooks/useMembership'
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

export const CouncilorLockItem = ({ lock, address, isRecoverable }: LockItemProps) => {
  const { api } = useApi()
  const { push } = useHistory()
  const {
    helpers: { getMemberIdByBoundAccountAddress },
  } = useMyMemberships()

  const [isDropped, setDropped] = useState(false)

  const memberId = useMemo(() => getMemberIdByBoundAccountAddress(address), [address])
  const { member } = useMember(memberId)
  const { data } = useGetCouncilorElectionEventQuery({ variables: { memberId } })
  const eventData = data?.memberships[0]?.councilMembers[0]?.electedInCouncil
  const councilId = eventData?.id

  const goToCouncil = useCallback(() => {
    if (member?.isCouncilMember) {
      return push(CouncilRoutes.council)
    }
    return push(generatePath(CouncilRoutes.pastCouncils, { id: councilId }))
  }, [councilId, member?.isCouncilMember])

  const recoverButton = useMemo(
    () => <RecoverButton memberId={memberId} lock={lock} address={address} isRecoverable={isRecoverable} />,
    [memberId, lock, address, isRecoverable]
  )

  const recoveryTime = useMemo(() => {
    if (!eventData || !api) {
      return null
    }
    const startTime = new Date(eventData.electedAtTime).getTime()
    const idleDuration = api.consts.council.idlePeriodDuration
    const electionDuration = api.consts.referendum.voteStageDuration?.add(api.consts.referendum.revealStageDuration)
    const duration = idleDuration.add(electionDuration).toNumber() * MILLISECONDS_PER_BLOCK
    const endDate = new Date(startTime + duration).toISOString()

    return endDate
  }, [eventData?.electedAtBlock, api])

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
          <LockDate
            createdAt={eventData?.electedAtTime}
            inBlock={eventData?.electedAtBlock}
            network={eventData?.electedAtNetwork}
          />
        </div>
        <div>{recoveryTime && <LockRecoveryTime value={recoveryTime} />}</div>
        <BalanceAmount amount={lock.amount} isRecoverable={isRecoverable} />
        <LocksButtons>
          <LockLinkButton label="Show Council" onClick={goToCouncil} />
          {recoverButton}
        </LocksButtons>
      </StyledDropDown>
    </DetailsItemVoteWrapper>
  )
}
