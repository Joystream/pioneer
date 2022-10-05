import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines/index'

interface MachineContext {
  validateBeforeTransaction: boolean
}

interface TransactionContext extends MachineContext {
  transactionEvents?: EventRecord[]
}

type PostActionState =
  | { value: 'requirementsVerification'; context: MachineContext }
  | { value: 'requirementsFailed'; context: MachineContext }
  | { value: 'beforeTransaction'; context: MachineContext }
  | { value: 'transaction'; context: MachineContext }
  | { value: 'success'; context: MachineContext }
  | { value: 'error'; context: Required<TransactionContext> }

export type ActionEvents = { type: 'FAIL' } | { type: 'PASS' }

export const defaultTransactionModalMachine = (errorMessage?: string, successMessage?: string) =>
  createMachine<TransactionContext, ActionEvents, PostActionState>({
    initial: 'requirementsVerification',
    context: {
      validateBeforeTransaction: false,
    },
    states: {
      requirementsVerification: {
        on: {
          PASS: [
            {
              target: 'beforeTransaction',
              cond: (context) => context.validateBeforeTransaction,
            },
            {
              target: 'transaction',
              cond: (context) => !context.validateBeforeTransaction,
            },
          ],
          FAIL: 'requirementsFailed',
        },
      },
      beforeTransaction: {
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
          error: errorMessage,
          success: successMessage,
        },
      }),
    },
  })
