import React from 'react'
import { Account } from '../../../common/types'
import { useBalance } from '../../../hooks/useBalance'
import { BalanceInfoInRow, InfoTitle, InfoValue } from '../../../modals/common'
import { AccountInfo } from '../../AccountInfo'
import { TokenValue } from '../../typography'

interface Props {
  account: Account
}

export const OptionAccount = ({ account }: Props) => {
  const balance = useBalance(account)

  return (
    <>
      <AccountInfo account={account} />
      <BalanceInfoInRow>
        <InfoTitle>Transferable balance</InfoTitle>
        <InfoValue>
          <TokenValue value={balance?.transferable} />
        </InfoValue>
      </BalanceInfoInRow>
    </>
  )
}
