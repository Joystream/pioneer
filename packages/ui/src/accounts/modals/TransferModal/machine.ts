import BN from 'bn.js'
import { assign, createMachine } from 'xstate'

import { Account } from '../../types'

type EmptyObject = Record<string, never>

interface TransferDetailsContext {
  from?: Account
  to?: Account
  amount?: BN
}

interface FeeContext {
  fee?: BN
}

type TransferContext = TransferDetailsContext & FeeContext

type TransferState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'transaction'; context: Required<TransferDetailsContext> }
  | { value: 'success'; context: Required<TransferContext> }
  | { value: 'error'; context: Required<TransferContext> }

export type TransferEvent =
  | { type: 'SET_TO'; to: Account }
  | { type: 'SET_FROM'; from: Account }
  | { type: 'SET_AMOUNT'; amount: BN }
  | { type: 'DONE' }
  | { type: 'SUCCESS'; fee: BN }
  | { type: 'ERROR' }

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
      on: {
        SUCCESS: {
          target: 'success',
          actions: assign({ fee: (_, event) => event.fee }),
        },
        ERROR: 'error',
      },
    },
    success: { type: 'final' },
    error: { type: 'final' },
  },
})
