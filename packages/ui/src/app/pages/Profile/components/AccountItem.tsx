import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { AccountInfo } from '../../../../accounts/components/AccountInfo'
import { TransferButton } from '../../../../accounts/components/TransferButton'
import { useBalance } from '../../../../accounts/hooks/useBalance'
import { Account } from '../../../../accounts/types'
import { DropDownButton, DropDownToggle } from '../../../../common/components/buttons/DropDownToggle'
import { TokenValue } from '../../../../common/components/typography'
import { Sizes } from '../../../../common/constants'
import { useToggle } from '../../../../common/hooks/useToggle'

interface AccountItemDataProps {
  account: Account
}

export const AccountItem = ({ account }: AccountItemDataProps) => {
  const address = account.address
  const balance = useBalance(address)
  const isSendDisabled = !balance?.transferable || !balance.transferable.gt(new BN(0))

  const [isDropped, setDropped] = useToggle()

  return (
    <>
      <AccountItemWrap key={address}>
        <AccountInfo account={account} />
        <TokenValue value={balance?.total} />
        <TokenValue value={balance?.locked} />
        <TokenValue value={balance?.recoverable} />
        <TokenValue value={balance?.transferable} />
        <AccountControls>
          <TransferButton to={account} />
          <TransferButton from={account} disabled={isSendDisabled} />
          <DropDownButton onClick={setDropped} isDropped={isDropped} size="medium" />
        </AccountControls>
      </AccountItemWrap>
      <DropDownToggle isDropped={isDropped}>I'm opened</DropDownToggle>
    </>
  )
}

const AccountItemWrap = styled.div`
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
