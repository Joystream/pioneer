import { assign, createMachine } from 'xstate'

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
      on: {
        SUCCESS: 'success',
        ERROR: 'error',
      },
    },
    success: { type: 'final' },
    error: { type: 'final' },
  },
})
