import faker from 'faker'
import React, { useCallback, useMemo, useState } from 'react'
import { generatePath, useHistory } from 'react-router-dom'

import { lockIcon } from '@/accounts/components/AccountLocks'
import { BalanceLock } from '@/accounts/types'
import { BountyRoutes } from '@/bounty/constants'
import { useGetLatestBountyByMemberIdQuery } from '@/bounty/queries'
import { DropDownButton } from '@/common/components/buttons/DropDownToggle'
import { TokenValue } from '@/common/components/typography'
import { Address } from '@/common/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

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

interface BountyLockItemProps {
  lock: BalanceLock
  address: Address
  isRecoverable?: boolean
}

export const BountyLockItem = ({ lock, address, isRecoverable }: BountyLockItemProps) => {
  const { push } = useHistory()
  const {
    helpers: { getMemberIdByBoundAccountAddress },
  } = useMyMemberships()

  const [isDropped, setDropped] = useState(false)

  const memberId = useMemo(() => getMemberIdByBoundAccountAddress(address), [address])
  const { data } = useGetLatestBountyByMemberIdQuery({ variables: { memberId } })
  const eventData = data?.bounties[0].createdInEvent
  const bountyId = data?.bounties[0].id

  const goToBounty = useCallback(() => {
    if (!bountyId) {
      return null
    }
    return push(generatePath(BountyRoutes.bounty, { id: bountyId }))
  }, [bountyId])

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

        <LocksButtons>
          {bountyId && <LockLinkButton label="Show Bounty" onClick={goToBounty} />}
          {recoverButton}
        </LocksButtons>
      </StyledDropDown>
    </DetailsItemVoteWrapper>
  )
}
