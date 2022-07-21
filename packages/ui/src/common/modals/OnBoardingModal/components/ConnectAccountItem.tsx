import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { Account } from '@/accounts/types'
import { CheckboxIcon } from '@/common/components/icons'
import { TokenValue } from '@/common/components/typography'
import { BorderRad, Colors, Sizes, Transitions } from '@/common/constants'

interface ConnectAccountItemProps {
  account: Account
  totalBalance: BN
  selected?: boolean
}

export const ConnectAccountItem = ({ account, totalBalance, selected }: ConnectAccountItemProps) => {
  return (
    <SelectListWrapper selected={selected}>
      <SelectItemInnerWrap>
        <AccountInfo account={account} />
        <TokenValue value={totalBalance} />
        {selected && <CheckboxIcon />}
      </SelectItemInnerWrap>
    </SelectListWrapper>
  )
}

export const SelectListWrapper = styled.div<{ selected?: boolean }>`
  display: flex;
  width: 100%;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  cursor: pointer;
  transition: ${Transitions.all};

  background-color: ${({ selected }) => (selected ? Colors.Blue[50] : 'transparent')};
`

export const SelectItemInnerWrap = styled.div`
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

  svg {
    color: ${Colors.LogoPurple};
  }
`
