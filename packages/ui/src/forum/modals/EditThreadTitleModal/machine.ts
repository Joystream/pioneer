import { createMachine } from 'xstate'

import { EmptyObject } from '@/common/types'

import { isTransactionError, isTransactionSuccess, transactionMachine } from '../../../common/model/machines'

type EditThreadTitleState =
  | { value: 'transaction'; context: EmptyObject }
  | { value: 'success'; context: EmptyObject }
  | { value: 'error'; context: EmptyObject }

export type EditThreadTitleEvent = { type: 'SUCCESS' } | { type: 'ERROR' }

export const editThreadTitleMachine = createMachine<EmptyObject, EditThreadTitleEvent, EditThreadTitleState>({
  initial: 'transaction',
  states: {
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
