import React from 'react'
import styled from 'styled-components'

import { AccountLocks, AccountLocksWrapper } from '@/accounts/components/AccountLocks'

import { BalanceInfoInRow, InfoTitle, InfoValue } from '../../../common/components/Modal'
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
        <InfoValueWithLocks>
          <TokenValue value={balance?.transferable} />
          <AccountLocks locks={balance?.locks} />
        </InfoValueWithLocks>
      </BalanceInfoInRow>
    </>
  )
}

const InfoValueWithLocks = styled(InfoValue)`
  ${AccountLocksWrapper} {
    right: 0;
  }
`
