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

interface LeaveRoleContext {
  rationale?: string
}

interface TransactionContext {
  transactionEvents?: EventRecord[]
}

type Context = LeaveRoleContext & TransactionContext

type LeaveRoleState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'transaction'; context: Required<LeaveRoleContext> }
  | { value: 'success'; context: Required<LeaveRoleContext> }
  | { value: 'error'; context: Required<Context> }

export type LeaveRoleEvent =
  | { type: 'PASS' }
  | { type: 'FAIL' }
  | { type: 'DONE'; rationale: string }
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }

export const leaveRoleMachine = createMachine<Context, LeaveRoleEvent, LeaveRoleState>({
  initial: 'prepare',
  states: {
    prepare: {
      on: {
        DONE: {
          target: 'transaction',
          actions: assign({ rationale: (_, event) => event.rationale }),
        },
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
        success: 'You have successfully left the role.',
        error: 'There was a problem leaving the role.',
      },
    }),
  },
})
