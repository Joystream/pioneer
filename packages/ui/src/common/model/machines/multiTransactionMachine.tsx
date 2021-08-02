import { assign, createMachine, DoneInvokeEvent } from 'xstate'

import {
  isTransactionError,
  isTransactionSuccess,
  TransactionErrorEvent,
  TransactionEvent,
  transactionMachine,
  TransactionSuccessEvent,
} from '@/common/model/machines/transaction'

export interface MultiTransactionContext {
  transactions: any[]
  transactionEvents?: any[]
}

export type MultiTransactionState =
  | { value: 'transactions'; context: MultiTransactionContext }
  | { value: 'success'; context: MultiTransactionContext }

export type MultiTransactionEvent = { type: 'DONE' } | TransactionEvent

export const multiTransactionMachine = createMachine<
  MultiTransactionContext,
  MultiTransactionEvent,
  MultiTransactionState
>({
  context: {
    transactions: [],
    transactionEvents: [],
  },
  initial: 'transactions',
  states: {
    transactions: {
      invoke: {
        id: 'transactions',
        src: transactionMachine,
        onDone: [
          {
            target: 'success',
            actions: assign({
              transactionEvents: (context, event: DoneInvokeEvent<TransactionSuccessEvent>) => event.data.events,
            }),
            cond: isTransactionSuccess,
          },
          {
            target: 'error',
            actions: assign({
              transactionEvents: (context, event: DoneInvokeEvent<TransactionErrorEvent>) => event.data.events,
            }),
            cond: isTransactionError,
          },
        ],
      },
      on: {
        DONE: {
          target: 'success',
          cond: (context: any) => context.transactions.length === 1,
          actions: assign({
            transactions: (context: any) => {
              context.transactions.pop()
              return context.transactions
            },
          }),
        },
      },
    },
    success: { type: 'final' },
    error: { type: 'final' },
  },
})
