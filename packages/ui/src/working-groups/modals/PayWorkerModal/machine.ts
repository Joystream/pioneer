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
import { Address, EmptyObject } from '@/common/types'

import { PaymentType } from './types'

interface PayWorkerContext {
  paymentType?: PaymentType
  accountId?: Address
  amount?: BN
  rationale?: string
  // For vested payments
  perBlock?: BN
  startingBlock?: number
}

interface TransactionContext {
  transactionEvents?: EventRecord[]
}

type Context = PayWorkerContext & TransactionContext

type PayWorkerState =
  | { value: 'selectPaymentType'; context: EmptyObject }
  | { value: 'prepare'; context: Required<Pick<PayWorkerContext, 'paymentType'>> }
  | { value: 'transaction'; context: Required<PayWorkerContext> }
  | { value: 'success'; context: Required<PayWorkerContext> }
  | { value: 'error'; context: Required<Context> }
  | { value: 'canceled'; context: Required<Context> }

export type PayWorkerEvent =
  | { type: 'SELECT_TYPE'; paymentType: PaymentType }
  | { type: 'DONE'; form: PayWorkerContext }
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }

export const payWorkerMachine = createMachine<Context, PayWorkerEvent, PayWorkerState>({
  initial: 'selectPaymentType',
  states: {
    selectPaymentType: {
      on: {
        SELECT_TYPE: {
          target: 'prepare',
          actions: assign({ paymentType: (_, event) => event.paymentType }),
        },
      },
    },
    prepare: {
      on: {
        DONE: {
          target: 'transaction',
          actions: assign((_, event) => event.form),
        },
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
          },
          {
            target: 'error',
            cond: isTransactionError,
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
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
