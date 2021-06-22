import { assign, EventObject, MachineConfig, sendParent } from 'xstate'
import { actionTypes } from 'xstate/lib/actions'

export const formConfig = {
  id: 'form',
  initial: 'initial',
  states: {
    initial: {
      on: { INPUT: 'validating' },
    },
    validating: {
      on: {
        VALID: 'valid',
        INVALID: 'invalid',
      },
    },
    valid: {
      on: { INPUT: 'validating', DONE: 'done' },
    },
    invalid: {
      on: { INPUT: 'validating' },
    },
    done: { type: 'final' },
  },
} as const

export const transactionConfig: MachineConfig<any, any, any> = {
  id: 'transaction',
  initial: 'prepare',
  context: {
    events: [],
  },
  states: {
    prepare: {
      on: {
        SIGN: 'signing',
      },
    },
    signing: {
      on: {
        SIGN_INTERNAL: 'pending',
        SIGN_EXTERNAL: 'signWithExtension',
      },
    },
    signWithExtension: {
      on: {
        SIGNED: 'pending',
      },
    },
    pending: {
      on: {
        SUCCESS: {
          target: 'success',
          actions: assign({
            events: (context, event: EventObject & { events: [] }) => event.events,
          }),
        },
        ERROR: {
          target: 'error',
          actions: assign({
            events: (context, event: EventObject & { events: [] }) => event.events,
          }),
        },
      },
    },
    success: {
      type: 'final',
      data: { events: (context: any, event: any) => event.events },
    },
    error: {
      type: 'final',
      data: { events: (context: any, event: any) => event.events },
      entry: sendParent((context, event) => ({ type: actionTypes.error, data: { events: event.events } })),
    },
  },
} as const
