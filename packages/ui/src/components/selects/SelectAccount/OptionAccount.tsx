import React from 'react'
import { Account } from '../../../common/types'
import { useBalance } from '../../../hooks/useBalance'
import { BalanceInfoInRow, InfoTitle, InfoValue } from '../../../modals/common'
import { AccountInfo } from '../../AccountInfo'
import { TokenValue } from '../../typography'
import { OptionComponent, OptionComponentContainer } from '../selects'

interface Props {
  account: Account
  onChange?: (account: Account) => void
}

export function OptionAccount({ account, onChange }: Props) {
  const balance = useBalance(account)

  return (
    <OptionComponentContainer onClick={() => onChange && onChange(account)}>
      <OptionComponent>
        <AccountInfo account={account} />
        <BalanceInfoInRow>
          <InfoTitle>Transferable balance</InfoTitle>
          <InfoValue>
            <TokenValue value={balance?.transferable} />
          </InfoValue>
        </BalanceInfoInRow>
      </OptionComponent>
    </OptionComponentContainer>
  )
}
