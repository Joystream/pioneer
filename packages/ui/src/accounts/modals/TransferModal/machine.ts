import { EventRecord } from '@polkadot/types/interfaces/system'
import BN from 'bn.js'
import { assign, createMachine } from 'xstate'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'
import { EmptyObject } from '@/common/types'

import { Account } from '../../types'

interface TransferDetailsContext {
  from?: Account
  to?: Account
  amount?: BN
}

interface TransactionContext {
  fee?: BN
  transactionEvents?: EventRecord[]
}

type TransferContext = TransferDetailsContext & TransactionContext

type TransferState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'transaction'; context: Required<TransferDetailsContext> }
  | { value: 'success'; context: Required<TransferContext> }
  | { value: 'canceled'; context: Required<TransferContext> }
  | { value: 'error'; context: Required<TransferContext> }

type TransactionSuccessEvent = {
  type: 'SUCCESS'
  events: EventRecord[]
  fee: BN
}

type TransactionErrorEvent = {
  type: 'ERROR'
  events: EventRecord[]
  fee: BN
}

export type TransferEvent =
  | { type: 'SET_TO'; to: Account }
  | { type: 'SET_FROM'; from: Account }
  | { type: 'SET_AMOUNT'; amount: BN }
  | { type: 'DONE' }
  | TransactionSuccessEvent
  | TransactionErrorEvent

export const transferMachine = createMachine<TransferContext, TransferEvent, TransferState>({
  initial: 'prepare',
  states: {
    prepare: {
      on: {
        SET_TO: {
          actions: assign({ to: (_, event) => event.to }),
        },
        SET_FROM: {
          actions: assign({ from: (_, event) => event.from }),
        },
        SET_AMOUNT: {
          actions: assign({ amount: (_, event) => event.amount }),
        },
        DONE: 'transaction',
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
            actions: assign({ transactionEvents: (_, event) => event.data.events, fee: (_, event) => event.data.fee }),
          },
          {
            target: 'error',
            cond: isTransactionError,
            actions: assign({ transactionEvents: (_, event) => event.data.events, fee: (_, event) => event.data.fee }),
          },
          {
            target: 'canceled',
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    ...transactionModalFinalStatusesFactory(),
  },
})
