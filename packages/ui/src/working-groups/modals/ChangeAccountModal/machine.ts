import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

import { isTransactionError, isTransactionSuccess, transactionMachine } from '../../../common/model/machines'
import { Address } from '../../../common/types'

type EmptyObject = Record<string, never>

interface ChangeAccountContext {
  selectedAddress?: Address
}

interface TransactionContext {
  transactionEvents?: EventRecord[]
}

type Context = ChangeAccountContext & TransactionContext

type ChangeAccountState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'transaction'; context: Required<ChangeAccountContext> }
  | { value: 'success'; context: Required<ChangeAccountContext> }
  | { value: 'error'; context: Required<Context> }

export type ChangeAccountEvent =
  | { type: 'PASS' }
  | { type: 'FAIL' }
  | { type: 'DONE'; selectedAddress: Address }
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }

export const changeAccountMachine = createMachine<Context, ChangeAccountEvent, ChangeAccountState>({
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
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
          },
        ],
      },
    },
    success: { type: 'final' },
    error: { type: 'final' },
  },
})
