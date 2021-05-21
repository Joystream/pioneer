import React from 'react'

import { ToggleButton } from '../../../common/components/buttons/Toggle'
import { Arrow } from '../../../common/components/icons'
import { BalanceInfoInRow, InfoTitle, InfoValue, LockedAccount } from '../../../common/components/Modal'
import { TokenValue } from '../../../common/components/typography'
import { useBalance } from '../../hooks/useBalance'
import { Account } from '../../types'
import { AccountInfo } from '../AccountInfo'

interface SelectedAccountProps {
  account: Account
}
export const SelectedAccount = ({ account }: SelectedAccountProps) => {
  const { transferable } = useBalance(account.address) || {}

  return (
    <LockedAccount>
      <AccountInfo account={account} />
      <BalanceInfoInRow>
        <InfoTitle>Transferable balance</InfoTitle>
        <InfoValue>
          <TokenValue value={transferable} />
        </InfoValue>
      </BalanceInfoInRow>
      <ToggleButton className="ui-toggle" disabled square>
        <Arrow direction="down" />
      </ToggleButton>
    </LockedAccount>
  )
}
