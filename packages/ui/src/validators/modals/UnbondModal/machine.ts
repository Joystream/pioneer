import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'

interface UnbondContext {
  transactionEvents?: EventRecord[]
}

type UnbondState =
  | { value: 'prepare'; context: UnbondContext }
  | { value: 'transaction'; context: UnbondContext }
  | { value: 'success'; context: UnbondContext }
  | { value: 'error'; context: UnbondContext }
  | { value: 'canceled'; context: UnbondContext }

type UnbondEvent = { type: 'NEXT' } | { type: 'FAIL' }

export const unbondMachine = createMachine<UnbondContext, UnbondEvent, UnbondState>({
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
        error: 'There was a problem unbonding your tokens.',
        success: 'You have successfully unbonded your tokens! They will be available after the unbonding period.',
      },
    }),
  },
})
