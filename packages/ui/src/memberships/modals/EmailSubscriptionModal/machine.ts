import { assign, createMachine } from 'xstate'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import { EmptyObject } from '@/common/types'

import { EmailSubscriptionForm } from './types'

interface Context extends EmailSubscriptionForm {
  email: string
  signature: string
  timestamp: number
}

type EmailSubscriptionState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'signature'; context: Pick<Context, 'email'> }
  | { value: 'register'; context: Context }
  | { value: 'success'; context: Context }
  | { value: 'error'; context: Context }

export type EmailSubscriptionEvent =
  | { type: 'DONE'; email: string }
  | { type: 'ERROR' }
  | { type: 'SIGNED'; signature: string; timestamp: number }
  | { type: 'SUCCESS' }

export const EmailSubscriptionMachine = createMachine<Partial<Context>, EmailSubscriptionEvent, EmailSubscriptionState>(
  {
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
            target: 'register',
            actions: assign({
              signature: (_, event) => event.signature,
              timestamp: (_, event) => event.timestamp,
            }),
          },
          ERROR: {
            target: 'error',
          },
        },
      },
      register: {
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
        cancel: {
          target: 'error',
          action: 'prepare',
        },
      }),
    },
  }
)
