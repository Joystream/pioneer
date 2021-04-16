import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { AccountInfo } from '../../../../accounts/components/AccountInfo'
import { TransferButton } from '../../../../accounts/components/TransferButton'
import { useBalance } from '../../../../accounts/hooks/useBalance'
import { Account } from '../../../../accounts/types'
import { ToggleableItem } from '../../../../common/components/buttons/Toggle'
import { TokenValue } from '../../../../common/components/typography'
import { Sizes } from '../../../../common/constants'

interface AccountItemDataProps {
  account: Account
}

export const AccountItem = ({ account }: AccountItemDataProps) => {
  const address = account.address
  const balance = useBalance(address)

  const isSendDisabled = !balance?.transferable || !balance.transferable.gt(new BN(0))

  return (
    <ToggleableItem>
      {(isOpen) => {
        return (
          <div>
            <AccountItemWrap key={address}>
              <AccountInfo account={account} />
              <AccountBalance>
                <TokenValue value={balance?.total} />
              </AccountBalance>
              <AccountBalance>
                <TokenValue value={balance?.locked} />
              </AccountBalance>
              <AccountBalance>
                <TokenValue value={balance?.recoverable} />
              </AccountBalance>
              <AccountBalance>
                <TokenValue value={balance?.transferable} />
              </AccountBalance>
              <AccountControls>
                <TransferButton to={account} />
                <TransferButton from={account} disabled={isSendDisabled} />
              </AccountControls>
            </AccountItemWrap>
            {isOpen && <div>I'm Open!</div>}
          </div>
        )
      }}
    </ToggleableItem>
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
  padding: 16px 0 16px 14px;
`

const AccountBalance = styled.p``

const AccountControls = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 40px);
  grid-template-rows: 40px;
  grid-column-gap: 8px;
`
