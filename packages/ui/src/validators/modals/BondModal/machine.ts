import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'

interface BondContext {
  transactionEvents?: EventRecord[]
}

type BondState =
  | { value: 'prepare'; context: BondContext }
  | { value: 'transaction'; context: BondContext }
  | { value: 'success'; context: BondContext }
  | { value: 'error'; context: BondContext }
  | { value: 'canceled'; context: BondContext }

type BondEvent = { type: 'NEXT' } | { type: 'FAIL' }

export const bondMachine = createMachine<BondContext, BondEvent, BondState>({
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
        error: 'There was a problem bonding your tokens.',
        success: 'You have successfully bonded your tokens!',
      },
    }),
  },
})
