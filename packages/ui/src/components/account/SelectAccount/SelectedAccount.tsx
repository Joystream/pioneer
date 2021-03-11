import React from 'react'
import { Account } from '../../../common/types'
import { AccountInfo } from '../../AccountInfo'
import { TokenValue } from '../../typography'
import { useBalance } from '../../../hooks/useBalance'
import { BalanceInfoInRow, InfoTitle, InfoValue, LockedAccount } from '../../../modals/common'

interface SelectedAccountProps {
  account: Account
}
export const SelectedAccount = ({ account }: SelectedAccountProps) => {
  const { transferable } = useBalance(account) || {}

  return (
    <LockedAccount>
      <AccountInfo account={account} />
      <BalanceInfoInRow>
        <InfoTitle>Transferable balance</InfoTitle>
        <InfoValue>
          <TokenValue value={transferable} />
        </InfoValue>
      </BalanceInfoInRow>
    </LockedAccount>
  )
}
