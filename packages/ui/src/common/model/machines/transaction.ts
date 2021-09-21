import { EventRecord } from '@polkadot/types/interfaces/system'
import BN from 'bn.js'
import { ActionTypes, assign, createMachine, DoneInvokeEvent, send } from 'xstate'

import { EmptyObject } from '@/common/types'

export type TransactionSuccessEvent = { type: 'SUCCESS'; events: EventRecord[]; fee: BN }
export type TransactionErrorEvent = { type: 'ERROR'; events: EventRecord[]; fee: BN }
export type TransactionEvent =
  | { type: 'SIGNED' }
  | { type: 'SIGN' }
  | { type: 'SIGN_INTERNAL' }
  | { type: 'SIGN_EXTERNAL' }
  | { type: 'PENDING' }
  | TransactionSuccessEvent
  | TransactionErrorEvent

const onTransactionError: any = {
  target: 'error',
  actions: [
    assign({
      events: (context, event: TransactionErrorEvent) => event.events,
      fee: (context, event: TransactionErrorEvent) => event.fee,
    }),
    send({ type: ActionTypes.ErrorPlatform, isError: 'true' }),
  ],
}

interface TransactionContext {
  events?: EventRecord[]
  fee?: BN
}

type TransactionState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'signing'; context: EmptyObject }
  | { value: 'signWithExtension'; context: EmptyObject }
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
        SIGN_INTERNAL: 'pending',
        SIGN_EXTERNAL: 'signWithExtension',
      },
    },
    signWithExtension: {
      on: {
        PENDING: 'pending',
        ERROR: onTransactionError,
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
        ERROR: onTransactionError,
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
})

export const isTransactionSuccess = (context: unknown, event: DoneInvokeEvent<{ isError: boolean }>) =>
  !event.data.isError
export const isTransactionError = (context: unknown, event: DoneInvokeEvent<{ isError: boolean }>) => event.data.isError
