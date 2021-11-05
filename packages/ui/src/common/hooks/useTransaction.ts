import { useContext } from 'react'

import { TransactionContext } from '../providers/transaction/context'

export function useTransaction() {
  return useContext(TransactionContext)
}
