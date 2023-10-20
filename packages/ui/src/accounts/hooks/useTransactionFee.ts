import { DependencyList, useContext, useEffect, useState } from 'react'

import { Transaction, TransactionFeesContext, Fee } from '@/common/providers/transactionFees/context'
import { Address } from '@/common/types'

export type UseTransactionFee = Fee & { isLoading: boolean }
export function useTransactionFee(
  signer?: Address,
  getTransaction?: () => Transaction | undefined | Promise<Transaction | undefined>,
  deps: DependencyList = []
): UseTransactionFee {
  const { transaction, feeInfo, setSigner, setTransaction } = useContext(TransactionFeesContext)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (signer) {
      setSigner(signer)
    }
  }, [signer, setSigner])

  useEffect(() => {
    if (signer && getTransaction) {
      setIsLoading(true)
      Promise.resolve(getTransaction()).then((tx) => {
        setIsLoading(false)
        setTransaction(tx)
      })
    }
  }, [signer, !!getTransaction, setTransaction, ...deps])

  return { transaction, isLoading, feeInfo }
}
