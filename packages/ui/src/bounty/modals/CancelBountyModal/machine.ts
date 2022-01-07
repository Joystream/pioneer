import { EventRecord } from '@polkadot/types/interfaces/system'
import BN from 'bn.js'
import { assign, createMachine } from 'xstate'

import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'
import { EmptyObject } from '@/common/types'

interface BountyCancelContext {
  transactionEvents?: EventRecord[]
}

export enum BountyCancelStates {
  INFO = 'info',
  AUTHORIZATION = 'authorization',
  TRANSACTION = 'transaction',
  SUCCESS = 'success',
  ERROR = 'error',
  CANCEL = 'cancel',
}

type BountyCancelState =
  | { value: BountyCancelStates.INFO; context: EmptyObject }
  | { value: BountyCancelStates.AUTHORIZATION; context: EmptyObject }
  | { value: BountyCancelStates.TRANSACTION; context: EmptyObject }
  | { value: BountyCancelStates.SUCCESS; context: Required<BountyCancelContext> }
  | { value: BountyCancelStates.ERROR; context: Required<BountyCancelContext> }
  | { value: BountyCancelStates.CANCEL; context: EmptyObject }

type SuccessEvent = {
  type: 'SUCCESS'
  events: EventRecord[]
  fee: BN
}

type ErrorEvent = {
  type: 'ERROR'
  events: EventRecord[]
  fee: BN
}

export type BountyCancelEvents = { type: 'NEXT' } | SuccessEvent | ErrorEvent

export const bountyCancelMachine = createMachine<BountyCancelContext, BountyCancelEvents, BountyCancelState>({
  initial: BountyCancelStates.INFO,
  states: {
    [BountyCancelStates.INFO]: {
      on: {
        NEXT: BountyCancelStates.AUTHORIZATION,
      },
    },
    [BountyCancelStates.AUTHORIZATION]: {
      on: {
        NEXT: BountyCancelStates.TRANSACTION,
      },
    },
    transaction: {
      invoke: {
        id: 'transaction',
        src: transactionMachine,
        onDone: [
          {
            target: BountyCancelStates.SUCCESS,
            cond: isTransactionSuccess,
            actions: assign({ transactionEvents: (_, event) => event.data.events }),
          },
          {
            target: BountyCancelStates.ERROR,
            cond: isTransactionError,
            actions: assign({ transactionEvents: (_, event) => event.data.events }),
          },
          {
            target: BountyCancelStates.CANCEL,
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    [BountyCancelStates.SUCCESS]: { type: 'final' },
    [BountyCancelStates.ERROR]: { type: 'final' },
    [BountyCancelStates.CANCEL]: { type: 'final' },
  },
})
