import React from 'react'
import { Account } from '../../../common/types'
import { useBalance } from '../../../hooks/useBalance'
import { BalanceInfoInRow, InfoTitle, InfoValue, LockedAccount } from '../../../modals/common'
import { AccountInfo } from '../../AccountInfo'
import { ToggleButton } from '../../buttons/Toggle'
import { ArrowDownIcon } from '../../icons'
import { TokenValue } from '../../typography'

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
      <ToggleButton className="ui-toggle" disabled>
        <ArrowDownIcon />
      </ToggleButton>
    </LockedAccount>
  )
}
