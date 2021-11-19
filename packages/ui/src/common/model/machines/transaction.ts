import { EventRecord } from '@polkadot/types/interfaces/system'
import BN from 'bn.js'
import { ActionTypes, assign, createMachine, DoneInvokeEvent, send } from 'xstate'

import { EmptyObject } from '@/common/types'

export type TransactionProcessingEvent = { type: 'PROCESSING'; events: EventRecord[]; fee: BN }
export type TransactionSuccessEvent = { type: 'SUCCESS'; events: EventRecord[]; fee: BN }
export type TransactionErrorEvent = { type: 'ERROR'; events: EventRecord[]; fee: BN }
export type TransactionEvent =
  | { type: 'SIGNED' }
  | { type: 'SIGN' }
  | { type: 'SIGN_EXTERNAL' }
  | { type: 'CANCELED' }
  | { type: 'PENDING' }
  | { type: 'FINALIZING' }
  | TransactionProcessingEvent
  | TransactionSuccessEvent
  | TransactionErrorEvent

interface TransactionContext {
  events?: EventRecord[]
  fee?: BN
}

type TransactionState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'signing'; context: EmptyObject }
  | { value: 'signWithExtension'; context: EmptyObject }
  | { value: 'canceled'; context: EmptyObject }
  | { value: 'finalizing'; context: EmptyObject }
  | { value: 'processing'; context: Required<TransactionContext> }
  | { value: 'success'; context: Required<TransactionContext> }
  | { value: 'error'; context: Required<TransactionContext> }

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
      },
    },
    pending: {
      on: {
        FINALIZING: 'finalizing',
        ERROR: 'error',
      },
    },
    finalizing: {
      on: {
        PROCESSING: 'processing',
        ERROR: 'error',
      },
    },
    processing: {
      on: {
        SUCCESS: {
          target: 'success',
          actions: assign({
            events: (_, event) => event.events,
            fee: (_, event) => event.fee,
          }),
        },
        ERROR: {
          target: 'error',
          actions: [
            assign({
              events: (_, event) => event.events,
              fee: (_, event) => event.fee,
            }),
            send({ type: ActionTypes.ErrorPlatform, isError: 'true' }),
          ],
        },
      },
    },
    success: {
      type: 'final',
      data: {
        events: (_: TransactionContext, event: TransactionSuccessEvent) => event.events,
        fee: (_: TransactionContext, event: TransactionSuccessEvent) => event.fee,
        finalStatus: 'success',
      },
    },
    error: {
      type: 'final',
      data: {
        events: (_: TransactionContext, event: TransactionErrorEvent) => event.events,
        fee: (_: TransactionContext, event: TransactionErrorEvent) => event.fee,
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
