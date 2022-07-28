import React from 'react'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { AccountLocks, AccountLocksWrapper } from '@/accounts/components/AccountLocks'
import { useBalance } from '@/accounts/hooks/useBalance'
import { isRivalrous, stakingBalance } from '@/accounts/model/lockTypes'
import { AccountOption, LockType } from '@/accounts/types'
import { BalanceInfoInRow, InfoTitle, InfoValue } from '@/common/components/Modal'
import { TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'

interface Props {
  option: AccountOption
  newLockType?: LockType
}

export const OptionAccount = ({ option, newLockType }: Props) => {
  const balances = useBalance(option.address)
  const balance = balances && newLockType && stakingBalance(balances, newLockType)
  const balanceType = newLockType && isRivalrous(newLockType) ? 'Transferable' : 'Total'
  const locks = option.optionLocks
  const isLocked = !!locks?.length

  return (
    <>
      <AccountInfo account={option} locked={isLocked} />
      <BalanceInfoInRow>
        <InfoTitle>{balanceType} balance</InfoTitle>
        <InfoValueWithLocks>
          <Value value={balance} locked={isLocked} />
          <AccountLocks locks={balances?.locks} />
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
