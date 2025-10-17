import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'

interface NominateContext {
  transactionEvents?: EventRecord[]
}

type NominateState =
  | { value: 'prepare'; context: NominateContext }
  | { value: 'transaction'; context: NominateContext }
  | { value: 'success'; context: NominateContext }
  | { value: 'error'; context: NominateContext }
  | { value: 'canceled'; context: NominateContext }

type NominateEvent = { type: 'NEXT' } | { type: 'FAIL' }

export const nominateMachine = createMachine<NominateContext, NominateEvent, NominateState>({
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
        error: 'There was a problem nominating validators.',
        success: 'You have successfully nominated validators!',
      },
    }),
  },
})
