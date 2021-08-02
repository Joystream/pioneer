import { assign, createMachine } from 'xstate'

export interface MultiTransactionContext {
  transactions: any[]
}

export type MultiTransactionState =
  | { value: 'transaction'; context: MultiTransactionContext }
  | { value: 'success'; context: MultiTransactionContext }

export type DoneEvent = { type: 'DONE' }

export const multiTransaction = createMachine<MultiTransactionContext, DoneEvent, MultiTransactionState>({
  context: {
    transactions: ['foo'],
  },
  states: {
    transaction: {
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
    success: {},
  },
  initial: 'transaction',
})
