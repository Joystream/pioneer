import React from 'react'
import styled from 'styled-components'

import { lockIcon } from '@/accounts/components/AccountLocks'
import { RecoverBalanceModalCall } from '@/accounts/modals/RecoverBalance'
import { BalanceLock } from '@/accounts/types'
import { ButtonPrimary } from '@/common/components/buttons'
import { TokenValue } from '@/common/components/typography'
import { BorderRad, Colors } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { Address } from '@/common/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

type DetailsItemDataProps = {
  lock: BalanceLock
  isRecoverable?: boolean
  address?: Address
}

export const LockItem = ({ lock, isRecoverable, address }: DetailsItemDataProps) => {
  const { showModal } = useModal()
  const {
    helpers: { getMemberIdByBoundAccountAddress },
  } = useMyMemberships()

  const onClick = () => {
    if (!address) return
    const memberId = getMemberIdByBoundAccountAddress(address)
    if (!memberId) return

    showModal<RecoverBalanceModalCall>({
      modal: 'RecoverBalance',
      data: { address, lock, memberId },
    })
  }

  return (
    <DetailsItemVoteWrapper>
      <AccountDetailsWrap>
        <DetailsInfo>
          {lockIcon(lock.type)}
          <DetailsName>{lock.type}</DetailsName>
        </DetailsInfo>
        <div />
        {isRecoverable ? <div /> : null}
        <TokenValue value={lock.amount} />
        {isRecoverable && (
          <>
            <div />
            <ButtonPrimary size="small" onClick={onClick}>
              Recover
            </ButtonPrimary>
          </>
        )}
      </AccountDetailsWrap>
    </DetailsItemVoteWrapper>
  )
}

const DetailsItemVoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const AccountDetailsWrap = styled.div`
  display: grid;
  grid-template-columns: 260px repeat(4, 132px) 86px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: end;
  align-items: center;
  width: 100%;
  padding: 4px 16px;
  height: 46px;
  border-radius: ${BorderRad.s};
  background-color: ${Colors.White};
`

const DetailsInfo = styled.div`
  display: flex;
  width: 100%;
  column-gap: 16px;
`

const DetailsName = styled.h6`
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  color: ${Colors.Black[900]};
`
