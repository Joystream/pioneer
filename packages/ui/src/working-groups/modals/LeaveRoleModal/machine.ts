import { assign, createMachine } from 'xstate'

import { isTransactionError, isTransactionSuccess, transactionMachine } from '../../../common/model/machines'

type EmptyObject = Record<string, never>

interface LeaveRoleContext {
  rationale?: string
}

type LeaveRoleState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'transaction'; context: Required<LeaveRoleContext> }
  | { value: 'success'; context: Required<LeaveRoleContext> }
  | { value: 'error'; context: Required<LeaveRoleContext> }

export type LeaveRoleEvent =
  | { type: 'PASS' }
  | { type: 'FAIL' }
  | { type: 'DONE'; rationale: string }
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }

export const leaveRoleMachine = createMachine<LeaveRoleContext, LeaveRoleEvent, LeaveRoleState>({
  initial: 'prepare',
  states: {
    prepare: {
      on: {
        DONE: {
          target: 'transaction',
          actions: assign({ rationale: (_, event) => event.rationale }),
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
