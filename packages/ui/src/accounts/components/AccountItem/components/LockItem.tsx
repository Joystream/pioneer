import React, { useMemo, useState } from 'react'

import { lockIcon } from '@/accounts/components/AccountLocks'
import { DropDownButton } from '@/common/components/buttons/DropDownToggle'
import { TokenValue } from '@/common/components/typography'
import { Block } from '@/common/types'
import { MemberInfo } from '@/memberships/components'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { Member } from '@/memberships/types'

import { BalanceAmount } from './BalanceAmount'
import { LockDate } from './LockDate'
import { LockRecoveryTime } from './LockRecoveryTime'
import { RecoverButton } from './RecoverButton'
import {
  AccountDetailsWrap,
  ButtonsCell,
  DetailLabel,
  DetailsName,
  LocksButtons,
  LockWrapper,
  StyledDropDown,
  TitleCell,
  ValueCell,
} from './styles'
import { LockDetailsProps, LockRecoveryTimeProps } from './types'

interface LockItemProps extends LockDetailsProps {
  createdInEvent?: Block
  lockRecovery?: LockRecoveryTimeProps
  memberInfo?: Member
  linkButtons?: React.ReactNode
}

export const LockItem = ({
  lock,
  address,
  isRecoverable,
  createdInEvent,
  lockRecovery,
  memberInfo,
  linkButtons,
}: LockItemProps) => {
  const {
    helpers: { getMemberIdByBoundAccountAddress },
  } = useMyMemberships()

  const [isDropped, setDropped] = useState(false)

  const memberId = useMemo(() => getMemberIdByBoundAccountAddress(address), [address])

  return (
    <LockWrapper>
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
          {!isDropped && (
            <RecoverButton memberId={memberId} lock={lock} address={address} isRecoverable={isRecoverable} isSmall />
          )}
          <DropDownButton onClick={() => setDropped(!isDropped)} isDropped={isDropped} />
        </ButtonsCell>
      </AccountDetailsWrap>
      <StyledDropDown isDropped={isDropped}>
        <div>
          <DetailLabel>Lock date</DetailLabel>
          <LockDate createdInEvent={createdInEvent} />
        </div>
        <div>
          {lockRecovery && !isRecoverable ? (
            <LockRecoveryTime
              time={lockRecovery.time}
              unrecoverableLabel={lockRecovery.unrecoverableLabel}
              tooltipLabel={lockRecovery.tooltipLabel}
            />
          ) : null}
        </div>
        <BalanceAmount amount={lock.amount} isRecoverable={isRecoverable} />
        {memberInfo && (
          <div>
            <DetailLabel>{lock.type === 'Voting' ? 'Voted for' : 'Bound to:'}</DetailLabel>
            <MemberInfo member={memberInfo} onlyTop />
          </div>
        )}
        <LocksButtons>
          {linkButtons}
          <RecoverButton memberId={memberId} lock={lock} address={address} isRecoverable={isRecoverable} />
        </LocksButtons>
      </StyledDropDown>
    </LockWrapper>
  )
}
