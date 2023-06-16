import { assign, createMachine } from 'xstate'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'

import { EmailSubscriptionForm } from './types'

interface EmailSubscriptionContext {
  email: string
  timestamp: bigint
  signature: string
}

type Context = EmailSubscriptionContext & EmailSubscriptionForm

type EmailSubscriptionState =
  | { value: 'prepare'; context: Required<EmailSubscriptionContext> }
  | { value: 'transaction'; context: Required<EmailSubscriptionContext> }
  | { value: 'signature'; context: Required<EmailSubscriptionContext> }
  | { value: 'success'; context: Required<EmailSubscriptionContext> }
  | { value: 'error'; context: Required<Context> }

export type EmailSubscriptionEvent =
  | { type: 'DONE'; email: string }
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }
  | { type: 'SIGNED'; signature: string }
  | { type: 'CANCEL' }

export const EmailSubscriptionMachine = createMachine<Context, EmailSubscriptionEvent, EmailSubscriptionState>({
  initial: 'prepare',
  states: {
    prepare: {
      on: {
        DONE: {
          target: 'signature',
          actions: assign({
            email: (_, event) => event.email,
          }),
        },
      },
    },
    signature: {
      on: {
        SIGNED: {
          target: 'transaction',
          actions: assign({
            signature: (_, event) => event.signature,
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
