import BN from 'bn.js'
import React, { FC, useEffect, useMemo, useState } from 'react'

import { useBalance } from '@/accounts/hooks/useBalance'
import { Balances } from '@/accounts/types'
import { BN_ZERO } from '@/common/constants'
import { useDefaultAfterTimeout } from '@/common/hooks/useDefaultAfterTimeout'
import { useObservable } from '@/common/hooks/useObservable'
import { useTransactionStatus } from '@/common/hooks/useTransactionStatus'
import { whenDefined } from '@/common/utils'

import { Transaction, TransactionFeesContext } from './context'

export const getFeeSpendableBalance = (balance: Balances): BN =>
  balance.total.sub(
    // Invitation lock should not be subtracted from total balance, since it can be used to cover fees
    balance.locks.reduce((prev, next) => {
      if (next.type !== 'Invitation' && prev.lt(next.amount)) {
        return next.amount
      }
      return prev
    }, BN_ZERO)
  )

export const TransactionFeesProvider: FC = ({ children }) => {
  const [transaction, setTransaction] = useState<Transaction>()
  const [signer, setSigner] = useState<string>()

  const paymentInfo = useObservable(
    () => whenDefined(signer, (signer) => transaction?.paymentInfo(signer)),
    [signer, transaction]
  )
  const transactionFee = useDefaultAfterTimeout<BN>(paymentInfo?.partialFee, 3000, BN_ZERO)
  const balance = useBalance(signer)
  const feeInfo = useMemo(() => {
    if (balance && transactionFee) {
      return { transactionFee, canAfford: getFeeSpendableBalance(balance).gte(transactionFee) }
    }
  }, [JSON.stringify(balance), transactionFee?.toString()])

  const { status, setStatus } = useTransactionStatus()
  useEffect(() => {
    if (transaction && signer && (!balance || !transactionFee)) {
      if (status === null) {
        setStatus('loadingFees')
      }
    } else if (status === 'loadingFees') {
      setStatus(null)
    }
  }, [status, !balance, !transactionFee, !transaction, !signer])

  return (
    <TransactionFeesContext.Provider value={{ transaction, feeInfo, setTransaction, setSigner }}>
      {children}
    </TransactionFeesContext.Provider>
  )
}
