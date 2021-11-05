import { createContext } from 'react'

export interface UseTransaction {
  transactionPending: boolean
  setPending: (state: boolean) => void
}

export const TransactionContext = createContext<UseTransaction>({
  transactionPending: false,
  setPending: () => undefined,
})
