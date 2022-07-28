import React from 'react'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { AccountLocks, AccountLocksWrapper } from '@/accounts/components/AccountLocks'
import { useBalance } from '@/accounts/hooks/useBalance'
import { getAvailableBalanceForNewStaking } from '@/accounts/model/lockTypes'
import { AccountOption, LockType } from '@/accounts/types'
import { BalanceInfoInRow, InfoTitle, InfoValue } from '@/common/components/Modal'
import { TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'

interface Props {
  option: AccountOption
  newLockType?: LockType
}

export const OptionAccount = ({ option, newLockType }: Props) => {
  const balance = useBalance(option.address)
  const locks = option.optionLocks
  const isLocked = !!locks?.length

  return (
    <>
      <AccountInfo account={option} locked={isLocked} />
      <BalanceInfoInRow>
        <InfoTitle>{newLockType ? 'Available balance' : 'Transferable balance'}</InfoTitle>
        <InfoValueWithLocks>
          <Value
            value={
              newLockType && balance ? getAvailableBalanceForNewStaking(balance, newLockType) : balance?.transferable
            }
            locked={isLocked}
          />
          <AccountLocks locks={balance?.locks} />
        </InfoValueWithLocks>
      </BalanceInfoInRow>
    </>
  )
}

const Value = styled(TokenValue)<{ locked?: boolean }>`
  color: ${({ locked }) => (locked ? Colors.Black[500] : 'default')};
`

const InfoValueWithLocks = styled(InfoValue)`
  ${AccountLocksWrapper} {
    right: 0;
  }
`
