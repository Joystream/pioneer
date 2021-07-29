import { createMachine, assign } from 'xstate'

import { isTransactionError, isTransactionSuccess, transactionMachine } from '@/common/model/machines'
import { EmptyObject } from '@/common/types'

interface DetailsContext {
  topic?: string
  description?: string
  categoryId?: string
  memberId?: string
}

interface TransactionContext extends Required<DetailsContext> {
  newThreadId?: string
}

export type CreateThreadContext = Partial<TransactionContext>

type CreateThreadState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'generalDetails'; context: DetailsContext }
  | { value: 'transaction'; context: TransactionContext }
  | { value: 'success'; context: Required<CreateThreadContext> }
  | { value: 'error'; context: CreateThreadContext }

export type CreateThreadEvent =
  | { type: 'FAIL' }
  | { type: 'PASS'; memberId: string; categoryId: string }
  | { type: 'NEXT' }
  | { type: 'BACK' }
  | { type: 'SET_TOPIC'; topic: string }
  | { type: 'SET_DESCRIPTION'; description: string }

export const createThreadMachine = createMachine<CreateThreadContext, CreateThreadEvent, CreateThreadState>({
  initial: 'requirementsVerification',
  states: {
    requirementsVerification: {
      on: {
        PASS: {
          target: 'generalDetails',
          actions: assign({
            memberId: (_, event) => event.memberId,
            categoryId: (_, event) => event.categoryId,
          }),
        },
        FAIL: 'requirementsFailed',
      },
    },
    requirementsFailed: { type: 'final' },
    generalDetails: {
      on: {
        NEXT: {
          target: 'transaction',
          cond: (context) => !!(context.topic && context.description),
        },
        SET_TOPIC: {
          actions: assign({
            topic: (_, event) => event.topic,
          }),
        },
        SET_DESCRIPTION: {
          actions: assign({
            description: (_, event) => event.description,
          }),
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
        ],
      },
    },
    success: { type: 'final' },
    error: { type: 'final' },
  },
})
