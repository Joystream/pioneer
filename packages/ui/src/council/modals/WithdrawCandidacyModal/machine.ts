import { createMachine } from 'xstate'

import { isTransactionError, isTransactionSuccess, transactionMachine } from '@/common/model/machines'
import { EmptyObject } from '@/common/types'

export type WithdrawCandidacyState =
  | { value: 'warning'; context: EmptyObject }
  | { value: 'transaction'; context: EmptyObject }
  | { value: 'success'; context: EmptyObject }
  | { value: 'error'; context: EmptyObject }

export type WithdrawCandidacyEvent = { type: 'NEXT' }

type WithdrawCandidacyContext = EmptyObject

export const machine = createMachine<WithdrawCandidacyContext, WithdrawCandidacyEvent, WithdrawCandidacyState>({
  initial: 'warning',
  context: {},
  states: {
    warning: {
      on: {
        NEXT: 'transaction',
      },
    },
    transaction: {
      invoke: {
        id: 'transaction',
        src: transactionMachine,
        onDone: [
          {
            target: 'success',
            cond: isTransactionSuccess,
          },
          {
            target: 'error',
            cond: isTransactionError,
          },
        ],
      },
    },
    success: { type: 'final' },
    error: { type: 'final' },
  },
})
