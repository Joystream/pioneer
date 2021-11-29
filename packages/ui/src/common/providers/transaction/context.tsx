import { createContext } from 'react'
import { ActorRef } from 'xstate'

export interface UseTransaction {
  isTransactionPending: boolean
  transactionService?: ActorRef<any>
  showStatus: (service: ActorRef<any>) => void
  hideStatus: () => void
  statusShown: boolean
}

export const TransactionContext = createContext<UseTransaction>({
  isTransactionPending: false,
  showStatus: () => undefined,
  hideStatus: () => undefined,
  statusShown: false,
})
