import { assign, createMachine } from 'xstate'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'

import { EmailSubscriptionForm } from './types'

interface Context extends EmailSubscriptionContext {
  email: string
  timestamp: number
}

type EmailSubscriptionState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'signature'; context: Pick<Context, 'email'> }
  | { value: 'transaction'; context: Context }
  | { value: 'success'; context: Context }
  | { value: 'error'; context: Context }

export type EmailSubscriptionEvent =
  | { type: 'DONE'; email: string }
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }
  | { type: 'SIGNED'; signature: string ; timestamp: number }
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
        error: 'There was a problem during the email subscription.',
      },
    }),
  },
})
