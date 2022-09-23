import { EventRecord } from '@polkadot/types/interfaces/system'
import BN from 'bn.js'
import { ActionTypes, assign, createMachine, DoneInvokeEvent, send } from 'xstate'

import { EmptyObject } from '@/common/types'

export type TransactionProcessingEvent = { type: 'PROCESSING'; events: EventRecord[] }
export type TransactionSuccessEvent = { type: 'SUCCESS' }
export type TransactionErrorEvent = { type: 'ERROR'; events: EventRecord[] }
export type TransactionEvent =
  | { type: 'SIGNED' }
  | { type: 'SIGN' }
  | { type: 'SIGN_EXTERNAL' }
  | { type: 'CANCELED' }
  | { type: 'PENDING' }
  | { type: 'FINALIZING'; fee: BN }
  | TransactionProcessingEvent
  | TransactionSuccessEvent
  | TransactionErrorEvent

export interface TransactionContext {
  events?: EventRecord[]
  fee?: BN
}

export type TransactionState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'signing'; context: EmptyObject }
  | { value: 'signWithExtension'; context: EmptyObject }
  | { value: 'canceled'; context: EmptyObject }
  | { value: 'pending'; context: EmptyObject }
  | { value: 'finalizing'; context: EmptyObject }
  | { value: 'processing'; context: Required<TransactionContext> }
  | { value: 'success'; context: Required<TransactionContext> }
  | { value: 'error'; context: Required<TransactionContext> }

export type TransactionStateValue = TransactionState['value'] | 'loadingFees'

export const transactionMachine = createMachine<TransactionContext, TransactionEvent, TransactionState>({
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
        SIGN_EXTERNAL: 'signWithExtension',
      },
    },
    signWithExtension: {
      on: {
        PENDING: 'pending',
        CANCELED: 'canceled',
        ERROR: {
          target: 'error',
          actions: assign({
            events: (_, event) => event.events,
          }),
        },
      },
    },
    pending: {
      on: {
        FINALIZING: {
          target: 'finalizing',
          actions: assign({
            fee: (_, event) => event.fee,
          }),
        },
        ERROR: {
          target: 'error',
          actions: assign({
            events: (_, event) => event.events,
          }),
        },
      },
    },
    finalizing: {
      on: {
        PROCESSING: {
          target: 'processing',
          actions: assign({
            events: (_, event) => event.events,
          }),
        },
        ERROR: {
          target: 'error',
          actions: assign({
            events: (_, event) => event.events,
          }),
        },
      },
    },
    processing: {
      on: {
        SUCCESS: {
          target: 'success',
        },
        ERROR: {
          target: 'error',
          actions: [
            assign({
              events: (_, event) => event.events,
            }),
            send({ type: ActionTypes.ErrorPlatform, isError: 'true' }),
          ],
        },
      },
    },
    success: {
      type: 'final',
      data: {
        events: (context: TransactionContext) => context.events,
        fee: (context: TransactionContext) => context.fee,
        finalStatus: 'success',
      },
    },
    error: {
      type: 'final',
      data: {
        events: (context: TransactionContext) => context.events,
        fee: (context: TransactionContext) => context.fee,
        finalStatus: 'error',
      },
    },
    canceled: {
      type: 'final',
      data: {
        finalStatus: 'canceled',
      },
    },
  },
})

type FinalStatus = 'success' | 'error' | 'canceled'

export const isTransactionSuccess = (context: unknown, event: DoneInvokeEvent<{ finalStatus: FinalStatus }>) =>
  event.data.finalStatus === 'success'
export const isTransactionError = (context: unknown, event: DoneInvokeEvent<{ finalStatus: FinalStatus }>) =>
  event.data.finalStatus === 'error'
export const isTransactionCanceled = (context: unknown, event: DoneInvokeEvent<{ finalStatus: FinalStatus }>) =>
  event.data.finalStatus === 'canceled'
