import faker from 'faker'
import React, { useMemo, useState } from 'react'

import { lockIcon } from '@/accounts/components/AccountLocks'
import { DropDownButton } from '@/common/components/buttons/DropDownToggle'
import { TokenValue } from '@/common/components/typography'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { useGetMemberInvitedEventsQuery } from '@/memberships/queries'

import { BalanceAmount } from '../BalanceAmount'
import { LockDate } from '../LockDate'
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

import { LockItemProps } from './types'

export const InvitationLockItem = ({ lock, address, isRecoverable }: LockItemProps) => {
  const {
    helpers: { getMemberIdByBoundAccountAddress },
  } = useMyMemberships()

  const [isDropped, setDropped] = useState(false)

  const memberId = useMemo(() => getMemberIdByBoundAccountAddress(address), [address])
  const { data } = useGetMemberInvitedEventsQuery({ variables: { memberId } })
  const eventData = data?.memberInvitedEvents[0]

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

        <LocksButtons>{recoverButton}</LocksButtons>
      </StyledDropDown>
    </DetailsItemVoteWrapper>
  )
}
