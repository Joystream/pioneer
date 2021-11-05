import { useContext } from 'react'

import { TransactionContext } from '../providers/transaction/context'

export function useTransactionStatus() {
  return useContext(TransactionContext)
}
