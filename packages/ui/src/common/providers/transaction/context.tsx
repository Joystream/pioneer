import { createContext } from 'react'
import { ActorRef, State } from 'xstate'

import { TransactionEvent, TransactionContext as TxContext, TransactionState } from '@/common/model/machines'

export interface UseTransaction {
  isTransactionPending: boolean
  status: TransactionState['value'] | null
  setService: (service: ActorRef<TransactionEvent, State<TxContext>>) => void
}

export const TransactionContext = createContext<UseTransaction>({
  isTransactionPending: false,
  status: null,
  setService: () => undefined,
})
