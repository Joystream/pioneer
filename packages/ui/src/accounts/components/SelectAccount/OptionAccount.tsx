import React from 'react'

import { BalanceInfoInRow, InfoTitle, InfoValue } from '../../../common/components/Modals'
import { TokenValue } from '../../../common/components/typography'
import { Account } from '../../../common/types'
import { useBalance } from '../../hooks/useBalance'
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
