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

export type PostReplyContext = Partial<TransactionContext>
export enum PostReplyStateName {
  prepare = 'prepare',
  transaction = 'transaction',
  success = 'success',
  error = 'error',
}

type PostReplyState =
  // | { value: 'requirementsVerification'; context: EmptyObject }
  // | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'prepare'; context: TransactionContext }
  | { value: 'transaction'; context: TransactionContext }
  | { value: 'success'; context: Required<PostReplyContext> }
  | { value: 'error'; context: PostReplyContext & { transactionEvents: EventRecord[] } }

export type PostReplyEvent =
  | { type: 'FAIL' }
  | { type: 'NEXT' }
  | { type: 'SET_TEXT'; payload: string }
  | { type: 'SET_EDITABLE'; payload: boolean }

export const postReplyMachine = createMachine<PostReplyContext, PostReplyEvent, PostReplyState>({
  initial: 'prepare',
  context: {
    isEditable: false,
  },
  states: {
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
