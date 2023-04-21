import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'
import { EmptyObject } from '@/common/types'

import { EmailSubscriptionForm } from './types'

interface EmailSubscriptionContext {
  form?: EmailSubscriptionForm
}

interface TransactionContext {
  transactionEvents?: EventRecord[]
}

type Context = EmailSubscriptionContext & TransactionContext

type EmailSubscriptionState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'transaction'; context: Required<EmailSubscriptionContext> }
  | { value: 'success'; context: Required<EmailSubscriptionContext> }
  | { value: 'error'; context: Required<Context> }

export type EmailSubscriptionEvent =
  | { type: 'PASS' }
  | { type: 'FAIL' }
  | { type: 'DONE'; form: EmailSubscriptionForm }
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }

export const EmailSubscriptionMachine = createMachine<Context, EmailSubscriptionEvent, EmailSubscriptionState>({
  initial: 'prepare',
  states: {
    prepare: {
      on: {
        DONE: {
          target: 'transaction',
          actions: assign({ form: (_, event) => event.form }),
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
          },
          {
            target: 'canceled',
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    ...transactionModalFinalStatusesFactory({
      metaMessages: {
        error: 'There was a problem email subscription.',
      },
    }),
  },
})
