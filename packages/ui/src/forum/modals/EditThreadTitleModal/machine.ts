import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

import { EmptyObject } from '@/common/types'

import { isTransactionError, isTransactionSuccess, transactionMachine } from '../../../common/model/machines'

interface Context {
  transactionEvents?: EventRecord[]
}

type EditThreadTitleState =
  | { value: 'transaction'; context: EmptyObject }
  | { value: 'success'; context: EmptyObject }
  | { value: 'error'; context: EmptyObject }
  | { value: 'error'; context: Required<Context> }

export type EditThreadTitleEvent = { type: 'SUCCESS' } | { type: 'ERROR' }

export const editThreadTitleMachine = createMachine<Context, EditThreadTitleEvent, EditThreadTitleState>({
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
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
          },
        ],
      },
    },
    success: { type: 'final' },
    error: { type: 'final' },
  },
})
