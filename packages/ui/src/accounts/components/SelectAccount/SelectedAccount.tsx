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
  onDoubleClick?: () => void
}
export const SelectedAccount = ({ account, onDoubleClick }: SelectedAccountProps) => {
  const { transferable } = useBalance(account.address) || {}

  return (
    <LockedAccount onDoubleClick={onDoubleClick} style={{ cursor: onDoubleClick ? 'pointer' : 'default' }}>
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
