import BN from 'bn.js'
import { ActionTypes, assign, createMachine, DoneInvokeEvent, MachineConfig, send } from 'xstate'

export type TransactionSuccessEvent = { type: 'SUCCESS'; events: any[]; fee: BN }
export type TransactionErrorEvent = { type: 'ERROR'; events: any[]; fee: BN }
export type TransactionEvent =
  | { type: 'SIGNED' }
  | { type: 'SIGN' }
  | { type: 'SIGN_INTERNAL' }
  | { type: 'SIGN_EXTERNAL' }
  | TransactionSuccessEvent
  | TransactionErrorEvent

export const transactionConfig: MachineConfig<any, any, TransactionEvent> = {
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
            events: (context, event) => event.events,
            fee: (context, event) => event.fee,
          }),
        },
        ERROR: {
          target: 'error',
          actions: [
            assign({
              events: (context, event) => event.events,
              fee: (context, event) => event.fee,
            }),
            send({ type: ActionTypes.ErrorPlatform, isError: 'true' }),
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
