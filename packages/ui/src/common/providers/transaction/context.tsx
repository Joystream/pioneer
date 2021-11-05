import { createContext } from 'react'

export interface UseTransaction {
  isTransactionPending: boolean
  setPending: (state: boolean) => void
}

export const TransactionContext = createContext<UseTransaction>({
  isTransactionPending: false,
  setPending: () => undefined,
})
