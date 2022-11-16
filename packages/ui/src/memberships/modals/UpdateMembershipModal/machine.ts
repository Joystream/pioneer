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

import { UpdateMemberForm } from './types'

interface UpdateMembershipContext {
  form?: UpdateMemberForm
}

interface TransactionContext {
  transactionEvents?: EventRecord[]
}

type Context = UpdateMembershipContext & TransactionContext

type UpdateMembershipState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'transaction'; context: Required<UpdateMembershipContext> }
  | { value: 'success'; context: Required<UpdateMembershipContext> }
  | { value: 'error'; context: Required<Context> }

export type UpdateMembershipEvent =
  | { type: 'PASS' }
  | { type: 'FAIL' }
  | { type: 'DONE'; form: UpdateMemberForm }
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }

export const updateMembershipMachine = createMachine<Context, UpdateMembershipEvent, UpdateMembershipState>({
  initial: 'prepare',
  states: {
    prepare: {
      on: {
        DONE: {
          target: 'transaction',
          actions: assign({ form: (_, event) => event.form }),
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
        error: 'There was a problem updating membership.',
      },
    }),
  },
})
