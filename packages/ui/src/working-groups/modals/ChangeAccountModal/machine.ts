import { assign, createMachine } from 'xstate'

import { isTransactionError, isTransactionSuccess, transactionMachine } from '../../../common/model/machines'
import { Address } from '../../../common/types'

type EmptyObject = Record<string, never>

interface ChangeAccountContext {
  selectedAddress?: Address
}

type ChangeAccountState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'transaction'; context: Required<ChangeAccountContext> }
  | { value: 'success'; context: Required<ChangeAccountContext> }
  | { value: 'error'; context: Required<ChangeAccountContext> }

export type ChangeAccountEvent =
  | { type: 'PASS' }
  | { type: 'FAIL' }
  | { type: 'DONE'; selectedAddress: Address }
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }

export const changeAccountMachine = createMachine<ChangeAccountContext, ChangeAccountEvent, ChangeAccountState>({
  initial: 'prepare',
  states: {
    prepare: {
      on: {
        DONE: {
          target: 'transaction',
          actions: assign({ selectedAddress: (_, event) => event.selectedAddress }),
        },
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
