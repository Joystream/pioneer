import BN from 'bn.js'
import { assign, createMachine, DoneInvokeEvent, EventObject, MachineConfig, send } from 'xstate'
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
            fee: (context, event: EventObject & { fee: BN }) => event.fee,
          }),
        },
        ERROR: {
          target: 'error',
          actions: [
            assign({
              events: (context, event: EventObject & { events: [] }) => event.events,
              fee: (context, event: EventObject & { fee: BN }) => event.fee,
            }),
            send({ type: actionTypes.errorPlatform, isError: 'true' }),
          ],
        },
      },
    },
    success: {
      type: 'final',
      data: {
        events: (context: any, event: any) => event.events,
        fee: (context: any, event: any) => event.fee,
        isError: false,
      },
    },
    error: {
      type: 'final',
      data: {
        events: (context: any, event: any) => event.events,
        fee: (context: any, event: any) => event.fee,
        isError: true,
      },
    },
  },
}

export const transactionMachine = createMachine(transactionConfig)

export const isTransactionSuccess = (context: unknown, event: DoneInvokeEvent<{ isError: boolean }>) =>
  !event.data.isError
export const isTransactionError = (context: unknown, event: DoneInvokeEvent<{ isError: boolean }>) => event.data.isError
