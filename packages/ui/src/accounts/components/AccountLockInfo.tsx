import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { lockIcon } from '@/accounts/components/AccountLocks'
import { AccountRow } from '@/common/components/Modal'
import { TokenValue } from '@/common/components/typography'
import { Colors, Sizes } from '@/common/constants'

import { Account } from '../types'

import { AccountInfo } from './AccountInfo'

interface SelectedAccountProps {
  account: Account
  stake: BN
}

export const AccountLockInfo = ({ account, stake }: SelectedAccountProps) => {
  return (
    <LockInfoContainer>
      <AccountInfo account={account} />
      <div>
        {lockIcon('Voting')}
        Stake from council
      </div>
      <TokenValue value={stake} />
    </LockInfoContainer>
  )
}

export const LockInfoContainer = styled(AccountRow)`
  padding: 8px 0 8px 16px;
  grid-template-columns: 1fr 1fr 1fr;
  height: ${Sizes.selectHeight};
  min-height: ${Sizes.selectHeight};
  max-height: ${Sizes.selectHeight};
  background-color: ${Colors.Black[75]};
  border: 1px solid ${Colors.Black[200]};
`
