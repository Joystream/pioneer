import { createContext } from 'react'
import { ActorRef } from 'xstate'

export interface UseTransaction {
  isTransactionPending: boolean
  setPending: (state: boolean) => void
  transactionService?: ActorRef<any>,
  showStatus: (service: ActorRef<any>) => void
  hideStatus: () => void
  statusShown: boolean
}

export const TransactionContext = createContext<UseTransaction>({
  isTransactionPending: false,
  setPending: () => undefined,
  showStatus: () => undefined,
  hideStatus: () => undefined,
  statusShown: false,
})
