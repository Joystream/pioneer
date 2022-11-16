import { useContext } from 'react'

import { TransactionStatusContext } from '../providers/transactionStatus/context'

export function useTransactionStatus() {
  return useContext(TransactionStatusContext)
}
