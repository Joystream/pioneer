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

interface Context {
  transactionEvents?: EventRecord[]
}

type State =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'transaction'; context: EmptyObject }
  | { value: 'success'; context: EmptyObject }
  | { value: 'error'; context: Required<Context> }

export type RecoverBalanceEvent = { type: 'FAIL' } | { type: 'PASS' }

export const recoverBalanceMachine = createMachine<Context, RecoverBalanceEvent, State>({
  initial: 'requirementsVerification',
  states: {
    requirementsVerification: {
      on: {
        PASS: 'transaction',
        FAIL: 'requirementsFailed',
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
    requirementsFailed: { type: 'final' },
    ...transactionModalFinalStatusesFactory({
      metaMessages: {
        error: 'There was a problem with recovering balance.',
      },
    }),
  },
})
