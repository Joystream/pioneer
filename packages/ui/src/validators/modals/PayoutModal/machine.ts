import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'

interface PayoutContext {
  transactionEvents?: EventRecord[]
}

type PayoutState =
  | { value: 'prepare'; context: PayoutContext }
  | { value: 'transaction'; context: PayoutContext }
  | { value: 'success'; context: PayoutContext }
  | { value: 'error'; context: PayoutContext }
  | { value: 'canceled'; context: PayoutContext }

type PayoutEvent = { type: 'NEXT' } | { type: 'FAIL' }

export const payoutMachine = createMachine<PayoutContext, PayoutEvent, PayoutState>({
  initial: 'prepare',
  context: {},
  states: {
    prepare: {
      on: {
        NEXT: 'transaction',
        FAIL: 'error',
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
    ...transactionModalFinalStatusesFactory({
      metaMessages: {
        error: 'There was a problem claiming your rewards.',
        success: 'You have successfully claimed your staking rewards!',
      },
    }),
  },
})
