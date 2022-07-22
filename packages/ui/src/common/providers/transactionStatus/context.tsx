import { EventRecord } from '@polkadot/types/interfaces/system'
import { createContext } from 'react'
import { ActorRef, State } from 'xstate'

import { TransactionEvent, TransactionContext as TxContext, TransactionStateValue } from '@/common/model/machines'

export interface UseTransaction {
  isTransactionPending: boolean
  status: TransactionStateValue | null
  transactionEvents: EventRecord[] | null
  setStatus: (status: TransactionStateValue | null) => void
  setService: (service: ActorRef<TransactionEvent, State<TxContext>>) => void
}

export const TransactionStatusContext = createContext<UseTransaction>({
  isTransactionPending: false,
  status: null,
  transactionEvents: null,
  setStatus: () => undefined,
  setService: () => undefined,
})
