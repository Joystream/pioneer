import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'

interface PrepareContext {
  postText: string
  isEditable: boolean
}

interface TransactionContext extends PrepareContext {
  transactionEvents?: EventRecord[]
}

export enum PostReplyStateName {
  requirementsVerification = 'requirementsVerification',
  requirementsFailed = 'requirementsFailed',
  prepare = 'prepare',
  transaction = 'transaction',
  success = 'success',
  error = 'error',
}

type PostReplyState =
  | { value: PostReplyStateName.requirementsVerification; context: PrepareContext }
  | { value: PostReplyStateName.requirementsFailed; context: PrepareContext }
  | { value: PostReplyStateName.prepare; context: PrepareContext }
  | { value: PostReplyStateName.transaction; context: TransactionContext }
  | { value: PostReplyStateName.success; context: Required<TransactionContext> }
  | { value: PostReplyStateName.error; context: Required<TransactionContext> }

export type PostReplyEvent =
  | { type: 'FAIL' }
  | { type: 'NEXT' }
  | { type: 'SET_TEXT'; payload: string }
  | { type: 'SET_EDITABLE'; payload: boolean }

export const postReplyMachine = createMachine<TransactionContext, PostReplyEvent, PostReplyState>({
  initial: 'prepare',
  context: {
    isEditable: false,
    postText: '',
  },
  states: {
    requirementsVerification: {
      on: {
        NEXT: 'prepare',
        FAIL: 'requirementsFailed',
      },
    },
    requirementsFailed: {
      type: 'final',
    },
    prepare: {
      on: {
        SET_TEXT: {
          actions: assign({
            postText: (_, event) => event.payload,
          }),
        },
        SET_EDITABLE: {
          actions: assign({
            isEditable: (_, event) => event.payload,
          }),
        },
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
            cond: isTransactionError,
            actions: assign({ transactionEvents: (_, event) => event.data.events }),
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
        error: 'There was a problem with replying to the post.',
      },
    }),
  },
})
