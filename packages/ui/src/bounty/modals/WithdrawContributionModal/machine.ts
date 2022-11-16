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

enum WithdrawContributionModalState {
  requirementsVerification = 'requirementsVerification',
  requirementsFailed = 'requirementsFailed',
  transaction = 'transaction',
  success = 'success',
  error = 'error',
  canceled = 'canceled',
}

interface TransactionContext {
  transactionEvents?: EventRecord[]
}

type PostActionState =
  | { value: WithdrawContributionModalState.requirementsVerification; context: EmptyObject }
  | { value: WithdrawContributionModalState.requirementsFailed; context: EmptyObject }
  | { value: WithdrawContributionModalState.transaction; context: EmptyObject }
  | { value: WithdrawContributionModalState.success; context: EmptyObject }
  | { value: WithdrawContributionModalState.error; context: Required<TransactionContext> }
  | { value: WithdrawContributionModalState.canceled; context: EmptyObject }

export type ActionEvents = { type: 'FAIL' } | { type: 'PASS' }

export const withdrawContributionModalMachine = createMachine<TransactionContext, ActionEvents, PostActionState>({
  initial: WithdrawContributionModalState.requirementsVerification,
  states: {
    [WithdrawContributionModalState.requirementsVerification]: {
      on: {
        PASS: WithdrawContributionModalState.transaction,
        FAIL: WithdrawContributionModalState.requirementsFailed,
      },
    },
    [WithdrawContributionModalState.transaction]: {
      invoke: {
        id: WithdrawContributionModalState.transaction,
        src: transactionMachine,
        onDone: [
          {
            target: WithdrawContributionModalState.success,
            cond: isTransactionSuccess,
          },
          {
            target: WithdrawContributionModalState.error,
            cond: isTransactionError,
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
          },
          {
            target: WithdrawContributionModalState.canceled,
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    [WithdrawContributionModalState.requirementsFailed]: { type: 'final' },
    ...transactionModalFinalStatusesFactory(),
  },
})
