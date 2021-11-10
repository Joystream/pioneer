import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { Account } from '@/accounts/types'
import { TableListItemAsLinkHover } from '@/common/components/List'
import { TokenValue } from '@/common/components/typography'
import { BorderRad, Colors, Sizes, Transitions } from '@/common/constants'

interface AccountList {
  account: Account
  totalBalance: BN
}

export const AccountsListItem = ({ account, totalBalance }: AccountList) => {
  const address = account.address

  return (
    <AccountListWrapper>
      <AccountItemWrap key={address}>
        <AccountInfo account={account} />
        <TokenValue value={totalBalance} />
      </AccountItemWrap>
    </AccountListWrapper>
  )
}

const AccountListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  cursor: pointer;
  transition: ${Transitions.all};

  ${TableListItemAsLinkHover}
`

export const AccountItemWrap = styled.div`
  display: grid;
  grid-template-columns: 276px repeat(4, 128px) 104px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: end;
  align-items: center;
  width: 100%;
  height: ${Sizes.accountHeight};
  padding: 16px 8px 16px 16px;
  margin-left: -1px;
`
