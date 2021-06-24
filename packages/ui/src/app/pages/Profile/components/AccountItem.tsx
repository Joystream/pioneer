import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { AccountLocks } from '@/accounts/components/AccountLocks'
import { TransferButton } from '@/accounts/components/TransferButton'
import { useBalance } from '@/accounts/hooks/useBalance'
import { Account } from '@/accounts/types'
import { DetailsItemVote, LockItem } from '@/app/pages/Profile/components/LockItem'
import { DropDownButton, DropDownToggle } from '@/common/components/buttons/DropDownToggle'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { Label } from '@/common/components/typography/Label'
import { Sizes, Colors } from '@/common/constants'
import { useToggle } from '@/common/hooks/useToggle'

interface AccountItemDataProps {
  account: Account
}

export const AccountItem = ({ account }: AccountItemDataProps) => {
  const address = account.address
  const balance = useBalance(address)
  const isSendDisabled = !balance?.transferable || !balance.transferable.gt(new BN(0))

  const [isDropped, setDropped] = useToggle()

  const displayLocks = () => {
    if (!balance || !balance.locks.length) {
      return <TextMedium light>No locks found.</TextMedium>
    }

    return balance.locks.map((lock, index) => <LockItem key={index} lock={lock} />)
  }

  return (
    <AccounItemWrapper>
      <AccountItemWrap key={address}>
        <AccountInfo account={account} />
        <TokenValue value={balance?.total} />
        <ValueAndLocks align="end">
          <TokenValue value={balance?.locked} />
          <AccountLocks locks={balance?.locks} />
        </ValueAndLocks>
        <TokenValue value={balance?.recoverable} />
        <TokenValue value={balance?.transferable} />
        <AccountControls>
          <TransferButton to={account} />
          <TransferButton from={account} disabled={isSendDisabled} />
          <DropDownButton onClick={setDropped} isDropped={isDropped} />
        </AccountControls>
      </AccountItemWrap>
      <StyledDropDown isDropped={isDropped}>
        <RowGapBlock gap={8}>
          <Label>Account Locks:</Label>
          {displayLocks()}
        </RowGapBlock>
        <RowGapBlock gap={8}>
          <Label>Recoverable balance</Label>
          <DetailsItemVote account={account} />
        </RowGapBlock>
      </StyledDropDown>
    </AccounItemWrapper>
  )
}

const AccounItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
