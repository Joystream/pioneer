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

export type WithdrawCandidacyState =
  | { value: 'warning'; context: EmptyObject }
  | { value: 'transaction'; context: EmptyObject }
  | { value: 'success'; context: EmptyObject }
  | { value: 'error'; context: EmptyObject }

export type WithdrawCandidacyEvent = { type: 'NEXT' }

interface WithdrawCandidacyContext {
  transactionEvents?: EventRecord[]
}

export const machine = createMachine<WithdrawCandidacyContext, WithdrawCandidacyEvent, WithdrawCandidacyState>({
  initial: 'warning',
  context: {},
  states: {
    warning: {
      on: {
        NEXT: 'transaction',
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
            actions: assign({
              transactionEvents: (context, event) => event.data.events,
            }),
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
        error: 'There was a problem while withdrawing your candidacy.',
      },
    }),
  },
})
