import React from 'react'

import { Account } from '../../../common/types'
import { useBalance } from '../../../hooks/useBalance'
import { BalanceInfoInRow, InfoTitle, InfoValue } from '../../../modals/common'
import { AccountInfo } from '../../AccountInfo'
import { TokenValue } from '../../typography'

interface Props {
  option: Account
}

export const OptionAccount = ({ option }: Props) => {
  const balance = useBalance(option)

  return (
    <>
      <AccountInfo account={option} />
      <BalanceInfoInRow>
        <InfoTitle>Transferable balance</InfoTitle>
        <InfoValue>
          <TokenValue value={balance?.transferable} />
        </InfoValue>
      </BalanceInfoInRow>
    </>
  )
}
