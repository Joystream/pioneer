import { assign, createMachine, EventObject, MachineConfig, send } from 'xstate'
import { actionTypes } from 'xstate/lib/actions'

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
      entry: send((context, event) => ({ type: actionTypes.error, data: { events: event.events } })),
    },
  },
} as const

export const transactionMachine = createMachine(transactionConfig)
