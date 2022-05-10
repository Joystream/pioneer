import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { lockIcon } from '@/accounts/components/AccountLocks'
import { TableListItem } from '@/common/components/List'
import { TokenValue } from '@/common/components/typography'
import { Colors, Sizes } from '@/common/constants'

import { Account, LockType } from '../types'

import { AccountInfo } from './AccountInfo'

export interface AccountLockInfoProps {
  account: Account
  amount: BN
  lockType: LockType
}

export const AccountLockInfo = ({ account, amount, lockType }: AccountLockInfoProps) => {
  return (
    <LockInfoContainer $colLayout={lockInfoLayout}>
      <AccountInfo account={account} />
      <div>
        {lockIcon(lockType)}
        {lockType ?? 'Unknown'} stake
      </div>
      <TokenValueWrapper>
        <TokenValue value={amount} />
      </TokenValueWrapper>
    </LockInfoContainer>
  )
}

export const lockInfoLayout = '3fr 2fr 2fr'

export const LockInfoContainer = styled(TableListItem)`
  padding: 8px 0 8px 16px;
  width: 100%;
  height: ${Sizes.selectHeight};
  min-height: ${Sizes.selectHeight};
  max-height: ${Sizes.selectHeight};
  background-color: ${Colors.Black[75]};
  border: 1px solid ${Colors.Black[200]};

  > *:nth-child(2) {
    display: flex;
    column-gap: 4px;
  }
`

export const TokenValueWrapper = styled.div`
  display: flex;
  justify-content: right;
  padding-right: 44px;
`
