import { u64 } from '@polkadot/types'
import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

import { Account } from '@/accounts/types'
import { getDataFromEvent } from '@/common/model/JoystreamNode'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'
import { EmptyObject } from '@/common/types'

interface DetailsContext {
  categoryId?: string
  memberId?: string
  controllerAccount?: Account
}

interface TransactionContext extends Required<DetailsContext> {
  newThreadId?: u64
  transactionEvents?: EventRecord[]
}

export type CreateThreadContext = Partial<TransactionContext>

type CreateThreadState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'generalDetails'; context: DetailsContext }
  | { value: 'beforeTransaction'; context: TransactionContext }
  | { value: 'transaction'; context: TransactionContext }
  | { value: 'success'; context: Required<CreateThreadContext> }
  | { value: 'error'; context: CreateThreadContext & { transactionEvents: EventRecord[] } }

export type CreateThreadEvent =
  | { type: 'FAIL' }
  | { type: 'PASS'; memberId: string; categoryId: string; controllerAccount: Account }
  | { type: 'NEXT' }
  | { type: 'BACK' }

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
            controllerAccount: (_, event) => event.controllerAccount,
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
        },
      },
    },
    beforeTransaction: {
      on: {
        NEXT: 'transaction',
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
            actions: assign({
              newThreadId: (_, event) => getDataFromEvent(event.data.events, 'forum', 'ThreadCreated', 1),
            }),
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
    success: { type: 'final' },
    error: { type: 'final' },
    canceled: { type: 'final' },
  },
})
