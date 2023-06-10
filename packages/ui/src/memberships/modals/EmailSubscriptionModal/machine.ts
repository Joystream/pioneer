import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import { EmptyObject } from '@/common/types'

import { EmailSubscriptionForm } from './types'

interface EmailSubscriptionContext {
  form?: EmailSubscriptionForm
}

interface TransactionContext {
  signature?: EventRecord[]
}

type Context = EmailSubscriptionContext & TransactionContext

type EmailSubscriptionState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'transaction'; context: Required<EmailSubscriptionContext> }
  | { value: 'signature'; context: Required<EmailSubscriptionContext> }
  | { value: 'success'; context: Required<EmailSubscriptionContext> }
  | { value: 'error'; context: Required<Context> }

export type EmailSubscriptionEvent =
  | { type: 'DONE'; form: EmailSubscriptionForm }
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }
  | { type: 'SIGNED'; signature: EventRecord[] }
  | { type: 'CANCEL' }

export const EmailSubscriptionMachine = createMachine<Context, EmailSubscriptionEvent, EmailSubscriptionState>({
  initial: 'prepare',
  states: {
    prepare: {
      on: {
        DONE: {
          target: 'signature',
          actions: assign({ form: (_, event) => event.form }),
        },
      },
    },
    signature: {
      on: {
        SIGNED: {
          target: 'transaction',
          actions: assign({
            signature: (_, event) => {
              return event.signature
            },
          }),
        },
        CANCEL: {
          target: 'canceled',
        },
      },
    },
    transaction: {
      on: {
        SUCCESS: {
          target: 'success',
        },
        ERROR: {
          target: 'error',
        },
      },
    },
    ...transactionModalFinalStatusesFactory({
      metaMessages: {
        error: 'There was a problem email subscription.',
      },
    }),
  },
})
