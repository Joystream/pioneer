import faker from 'faker'
import React, { useCallback, useMemo, useState } from 'react'
import { generatePath, useHistory } from 'react-router-dom'

import { lockIcon } from '@/accounts/components/AccountLocks'
import { DropDownButton } from '@/common/components/buttons/DropDownToggle'
import { TokenValue } from '@/common/components/typography'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { WorkingGroupsRoutes } from '@/working-groups/constants'
import { useGetWorkingGroupApplicationsQuery } from '@/working-groups/queries'

import { BalanceAmount } from '../BalanceAmount'
import { LockDate } from '../LockDate'
import { LockLinkButton } from '../LockLinkButton'
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

import { LockRecoveryTime } from './LockRecoveryTime'
import { LockItemProps } from './types'

export const WorkingGroupLockItem = ({ lock, address, isRecoverable }: LockItemProps) => {
  const { push } = useHistory()
  const {
    helpers: { getMemberIdByBoundAccountAddress },
  } = useMyMemberships()

  const [isDropped, setDropped] = useState(false)

  const memberId = useMemo(() => getMemberIdByBoundAccountAddress(address), [address])
  const { data } = useGetWorkingGroupApplicationsQuery({
    variables: {
      where: {
        applicant: {
          id_eq: memberId,
        },
      },
    },
  })
  const application = data?.workingGroupApplications[0]
  const eventData = application?.createdInEvent
  const openingId = application?.opening.id

  const goToOpening = useCallback(() => {
    if (!openingId) {
      return null
    }
    return push(generatePath(WorkingGroupsRoutes.openingById, { id: openingId }))
  }, [openingId])

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
          {openingId && <LockLinkButton label="Show Opening" onClick={goToOpening} />}
          {recoverButton}
        </LocksButtons>
      </StyledDropDown>
    </DetailsItemVoteWrapper>
  )
}
