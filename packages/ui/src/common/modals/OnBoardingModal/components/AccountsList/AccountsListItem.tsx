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
  selected?: boolean
}

export const AccountsListItem = ({ account, totalBalance, selected }: AccountList) => {
  return (
    <AccountListWrapper selected={selected}>
      <AccountItemWrap>
        <AccountInfo account={account} />
        <TokenValue value={totalBalance} />
      </AccountItemWrap>
    </AccountListWrapper>
  )
}

const AccountListWrapper = styled.div<{ selected?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  cursor: pointer;
  transition: ${Transitions.all};

  background-color: ${({ selected }) => (selected ? Colors.Blue[50] : 'transparent')};

  svg {
    width: 16px;
    height: 16px;
    color: ${Colors.Blue[500]};
  }
`

export const AccountItemWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 40px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: end;
  align-items: center;
  width: 100%;
  height: ${Sizes.accountHeight};
  padding: 16px 8px 16px 16px;
  margin-left: -1px;
`
