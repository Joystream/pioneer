import BN from 'bn.js'
import React, { useState } from 'react'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { AccountLocks } from '@/accounts/components/AccountLocks'
import { TransferButton } from '@/accounts/components/TransferButton'
import { useBalance } from '@/accounts/hooks/useBalance'
import { Account } from '@/accounts/types'
import { DropDownButton, DropDownToggle } from '@/common/components/buttons/DropDownToggle'
import { TableListItemAsLinkHover } from '@/common/components/List'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Skeleton } from '@/common/components/Skeleton'
import { TokenValue } from '@/common/components/typography'
import { BorderRad, Colors, Sizes, Transitions } from '@/common/constants'
import { isDefined, sumBN } from '@/common/utils'

import { LocksDetails } from './components/LocksDetails'

interface AccountItemDataProps {
  account: Account
}

export const AccountItem = ({ account }: AccountItemDataProps) => {
  const address = account.address
  const balance = useBalance(address)
  const isSendDisabled = !balance?.transferable || !balance.transferable.gt(new BN(0))

  const [isDropped, setDropped] = useState(false)

  return (
    <AccountItemWrapper>
      <AccountItemWrap key={address} onClick={() => setDropped(!isDropped)}>
        <AccountInfo account={account} />
        <TokenValue value={balance?.total} isLoading={!isDefined(balance?.total)} />
        <ValueAndLocks align={balance?.locked && 'end'}>
          <TokenValue value={balance?.locked} isLoading={!isDefined(balance?.locked)} />
          <AccountLocks locks={balance?.locks} />
        </ValueAndLocks>
        <TokenValue
          value={sumBN(balance?.recoverable, balance?.vestedClaimable)}
          isLoading={!isDefined(balance?.recoverable)}
        />
        <TokenValue value={balance?.transferable} isLoading={!isDefined(balance?.transferable)} />
        <AccountControls>
          <TransferButton to={account} />
          <TransferButton from={account} disabled={isSendDisabled} />
          <DropDownButton onClick={() => setDropped(!isDropped)} isDropped={isDropped} />
        </AccountControls>
      </AccountItemWrap>
      <StyledDropDown isDropped={isDropped}>
        <LocksDetails balance={balance} address={address} />
      </StyledDropDown>
    </AccountItemWrapper>
  )
}

const AccountItemWrapper = styled.div`
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

  ${Skeleton} {
    min-width: 100%;
    height: 1.2rem;
  }
`

const AccountControls = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 32px);
  grid-template-rows: 32px;
  grid-column-gap: 4px;
`
const StyledDropDown = styled(DropDownToggle)`
  row-gap: 16px;
  padding: 16px;
  background-color: ${Colors.Black[50]};
`

const ValueAndLocks = styled(RowGapBlock)`
  position: relative;
`
