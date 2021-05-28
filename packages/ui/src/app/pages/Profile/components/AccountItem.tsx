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
    <>
      <AccountItemWrap key={address}>
        <AccountInfo account={account} />
        <TokenValue value={balance?.total} />
        <div>
          <TokenValue value={balance?.locked} />
          <br />
          <AccountLocks locks={balance?.locks} />
        </div>
        <TokenValue value={balance?.recoverable} />
        <TokenValue value={balance?.transferable} />
        <AccountControls>
          <TransferButton to={account} />
          <TransferButton from={account} disabled={isSendDisabled} />
          <DropDownButton onClick={setDropped} isDropped={isDropped} size="medium" />
        </AccountControls>
      </AccountItemWrap>
      <StyledDropDown isDropped={isDropped}>
        <StyledLabel>Account Locks:</StyledLabel>
        {displayLocks()}
      </StyledDropDown>
      <StyledDropDown isDropped={isDropped}>
        <StyledLabel>Recoverable balance</StyledLabel>
        <DetailsItemVote account={account} />
      </StyledDropDown>
    </>
  )
}

export const AccountItemWrap = styled.div`
  display: grid;
  grid-template-columns: 276px repeat(4, 128px) 136px;
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
  grid-template-columns: repeat(3, 40px);
  grid-template-rows: 40px;
  grid-column-gap: 8px;
`
const StyledDropDown = styled(DropDownToggle)`
  padding: 16px 16px 0 16px;
  background-color: ${Colors.Black[50]};

  &:last-child {
    padding: 16px;
  }
`

const StyledLabel = styled(Label)`
  margin-bottom: 8px;
`
