import { assign, createMachine } from 'xstate'

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
      on: {
        SUCCESS: 'success',
        ERROR: 'error',
      },
    },
    success: { type: 'final' },
    error: { type: 'final' },
  },
})
