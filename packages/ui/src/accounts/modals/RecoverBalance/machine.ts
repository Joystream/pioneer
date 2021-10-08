import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

import { isTransactionError, isTransactionSuccess, transactionMachine } from '@/common/model/machines'
import { EmptyObject } from '@/common/types'

interface Context {
  transactionEvents?: EventRecord[]
}

type State =
  | { value: 'transaction'; context: EmptyObject }
  | { value: 'success'; context: EmptyObject }
  | { value: 'error'; context: Required<Context> }

export type RecoverBalanceEvent = { type: 'FAIL' } | { type: 'PASS' }

export const recoverBalanceMachine = createMachine<Context, RecoverBalanceEvent, State>({
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
