import BN from 'bn.js'
import React from 'react'

import { TokenValue } from '@/common/components/typography'

import { BalanceDetails, DetailLabel } from './styles'

interface BalanceAmountProps {
  amount: BN
  isRecoverable?: boolean
}

export const BalanceAmount = ({ amount, isRecoverable }: BalanceAmountProps) => {
  return (
    <BalanceDetails>
      <DetailLabel>{isRecoverable ? 'Recoverable' : 'Locked'} balance:</DetailLabel>
      <TokenValue value={amount} />
    </BalanceDetails>
  )
}
