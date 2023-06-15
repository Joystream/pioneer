import { assign, createMachine } from 'xstate'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'

interface EmailSubscriptionContext {
  email: string
  timestamp: bigint
  signature: string
}

type Context = EmailSubscriptionContext

type EmailSubscriptionState =
  | { value: 'prepare'; context: EmailSubscriptionContext }
  | { value: 'transaction'; context: Required<EmailSubscriptionContext> }
  | { value: 'signature'; context: Required<EmailSubscriptionContext> }
  | { value: 'success'; context: Required<EmailSubscriptionContext> }
  | { value: 'error'; context: Required<Context> }

export type EmailSubscriptionEvent =
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }
  | { type: 'SIGNED'; signature: string }
  | { type: 'CANCEL' }

export const EmailSubscriptionMachine = createMachine<Context, EmailSubscriptionEvent, EmailSubscriptionState>({
  initial: 'prepare',
  states: {
    prepare: {},
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
