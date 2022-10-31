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

interface BountyCancelContext {
  transactionEvents?: EventRecord[]
}

export enum BountyCancelStates {
  info = 'info',
  transaction = 'transaction',
  success = 'success',
  error = 'error',
  cancel = 'cancel',
}

type BountyCancelState =
  | { value: BountyCancelStates.info; context: EmptyObject }
  | { value: BountyCancelStates.transaction; context: EmptyObject }
  | { value: BountyCancelStates.success; context: Required<BountyCancelContext> }
  | { value: BountyCancelStates.error; context: Required<BountyCancelContext> }
  | { value: BountyCancelStates.cancel; context: EmptyObject }

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
  initial: BountyCancelStates.info,
  states: {
    [BountyCancelStates.info]: {
      on: {
        NEXT: BountyCancelStates.transaction,
      },
    },
    [BountyCancelStates.transaction]: {
      invoke: {
        id: BountyCancelStates.transaction,
        src: transactionMachine,
        onDone: [
          {
            target: BountyCancelStates.success,
            cond: isTransactionSuccess,
            actions: assign({ transactionEvents: (_, event) => event.data.events }),
          },
          {
            target: BountyCancelStates.error,
            cond: isTransactionError,
            actions: assign({ transactionEvents: (_, event) => event.data.events }),
          },
          {
            target: BountyCancelStates.cancel,
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    ...transactionModalFinalStatusesFactory({
      metaMessages: {
        error: 'There was a problem while canceling the bounty.',
      },
    }),
  },
})
