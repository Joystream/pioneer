import React, { useMemo, useState } from 'react'

import { lockIcon } from '@/accounts/components/AccountLocks'
import { BalanceLock } from '@/accounts/types'
import { BlockTime } from '@/common/components/BlockTime'
import { DropDownButton } from '@/common/components/buttons/DropDownToggle'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { Address } from '@/common/types'
import { MemberInfo } from '@/memberships/components'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { BalanceAmount } from '../BalanceAmount'
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

interface BoundAccountLockItemProps {
  lock: BalanceLock
  address: Address
  isRecoverable?: boolean
}

export const BoundAccountLockItem = ({ lock, address, isRecoverable }: BoundAccountLockItemProps) => {
  const {
    members,
    helpers: { getMemberIdByBoundAccountAddress },
  } = useMyMemberships()

  const [isDropped, setDropped] = useState(false)

  const boundMembership = members.find((m) => m.boundAccounts.includes(String(address)))
  const memberId = useMemo(() => getMemberIdByBoundAccountAddress(address), [address])

  const boundLockEvent = boundMembership?.boundAccountsEvents?.find((event) => event.account === address)
  const block = boundLockEvent?.createdAtBlock

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
          {block ? <BlockTime block={block} layout="column" /> : <TextMedium value>Unknown</TextMedium>}
        </div>

        <BalanceAmount amount={lock.amount} isRecoverable={isRecoverable} />

        <div>
          <DetailLabel>Bound to:</DetailLabel>
          {boundMembership && <MemberInfo member={boundMembership} onlyTop />}
        </div>

        <LocksButtons>{recoverButton}</LocksButtons>
      </StyledDropDown>
    </DetailsItemVoteWrapper>
  )
}
