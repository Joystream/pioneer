import { assign, createMachine } from 'xstate'

import { isTransactionError, isTransactionSuccess, transactionMachine } from '../../../common/model/machines'

import { UpdateMemberForm } from './types'

type EmptyObject = Record<string, never>

interface UpdateMembershipContext {
  form?: UpdateMemberForm
}

type UpdateMembershipState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'transaction'; context: Required<UpdateMembershipContext> }
  | { value: 'success'; context: Required<UpdateMembershipContext> }
  | { value: 'error'; context: Required<UpdateMembershipContext> }

export type UpdateMembershipEvent =
  | { type: 'PASS' }
  | { type: 'FAIL' }
  | { type: 'DONE'; form: UpdateMemberForm }
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }

export const updateMembershipMachine = createMachine<
  UpdateMembershipContext,
  UpdateMembershipEvent,
  UpdateMembershipState
>({
  initial: 'prepare',
  states: {
    prepare: {
      on: {
        DONE: {
          target: 'transaction',
          actions: assign({ form: (_, event) => event.form }),
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
