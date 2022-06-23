import { DependencyList, useContext, useEffect } from 'react'

import { Transaction, TransactionFeesContext } from '@/common/providers/transactionFees/context'
import { Address } from '@/common/types'

export function useTransactionFee(
  signer?: Address,
  getTransaction?: () => Transaction | undefined,
  deps?: DependencyList
) {
  const { transaction, feeInfo, setSigner, setTransaction } = useContext(TransactionFeesContext)

  useEffect(() => {
    if (signer) {
      setSigner(signer)
    }
  }, [signer, setSigner])

  useEffect(() => {
    if (signer && getTransaction) {
      setTransaction(getTransaction())
    }
  }, [signer, !!getTransaction, setTransaction, ...(deps ?? [])])

  return { transaction, feeInfo }
}
