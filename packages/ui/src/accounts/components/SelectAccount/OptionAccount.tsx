import React from 'react'
import styled from 'styled-components'

import { AccountInfo } from '@/accounts/components/AccountInfo'
import { AccountLocks, AccountLocksWrapper } from '@/accounts/components/AccountLocks'
import { useBalance } from '@/accounts/hooks/useBalance'
import { AccountOption } from '@/accounts/types'
import { BalanceInfoNarrow, InfoTitle, InfoValue } from '@/common/components/Modal'
import { TokenValue } from '@/common/components/typography'
import { Colors } from '@/common/constants'

interface Props {
  option: AccountOption
  isForStaking?: boolean
  variant?: 's' | 'm' | 'l'
}

export const OptionAccount = ({ option, isForStaking, variant }: Props) => {
  const balances = useBalance(option.address)
  const balance = isForStaking ? balances?.total : balances?.transferable
  const balanceType = isForStaking ? 'Total' : 'Transferable'
  const locks = option.optionLocks
  const isLocked = !!locks?.length

  return (
    <>
      <AccountInfo account={option} locked={isLocked} variant={variant} />
      <BalanceInfoNarrow>
        <InfoTitle>{balanceType} balance</InfoTitle>
        <InfoValueWithLocks>
          <Value value={balance} locked={isLocked} />
          <AccountLocks locks={balances?.locks} />
        </InfoValueWithLocks>
      </BalanceInfoNarrow>
    </>
  )
}

const Value = styled(TokenValue)<{ locked?: boolean }>`
  color: ${({ locked }) => (locked ? Colors.Black[500] : 'default')};
`

export const InfoValueWithLocks = styled(InfoValue)`
  ${AccountLocksWrapper} {
    right: 0;
  }
`
