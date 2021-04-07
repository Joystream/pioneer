import React from 'react'

import { BalanceInfoInRow, InfoTitle, InfoValue } from '../../../common/components/Modals'
import { TokenValue } from '../../../common/components/typography'
import { useBalance } from '../../hooks/useBalance'
import { Account } from '../../types'
import { AccountInfo } from '../AccountInfo'

interface Props {
  option: Account
}

export const OptionAccount = ({ option }: Props) => {
  const balance = useBalance(option.address)

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
