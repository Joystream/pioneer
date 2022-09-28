import { EventRecord } from '@polkadot/types/interfaces/system'
import BN from 'bn.js'
import { assign, createMachine } from 'xstate'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'
import { EmptyObject } from '@/common/types'

export enum WithdrawWorkModalState {
  requirementsVerification = 'requirementsVerification',
  requirementsFailed = 'requirementsFailed',
  info = 'info',
  transaction = 'transaction',
  success = 'success',
  error = 'error',
  canceled = 'canceled',
}

interface WithdrawWorkContext {
  transactionEvents?: EventRecord[]
}

type WithdrawWorkState =
  | { value: WithdrawWorkModalState.requirementsVerification; context: EmptyObject }
  | { value: WithdrawWorkModalState.requirementsFailed; context: EmptyObject }
  | { value: WithdrawWorkModalState.info; context: EmptyObject }
  | { value: WithdrawWorkModalState.transaction; context: EmptyObject }
  | { value: WithdrawWorkModalState.success; context: Required<WithdrawWorkContext> }
  | { value: WithdrawWorkModalState.error; context: Required<WithdrawWorkContext> }
  | { value: WithdrawWorkModalState.canceled; context: EmptyObject }

type SuccessEvent = {
  type: 'SUCCESS'
  events: EventRecord[]
  fee: BN
}

type ErrorEvent = {
  type: 'ERROR'
  events: EventRecord[]
  fee: BN
}

export type WithdrawWorkEvents = { type: 'NEXT' } | { type: 'FAIL' } | SuccessEvent | ErrorEvent

export const WithdrawWorkModalMachine = createMachine<WithdrawWorkContext, WithdrawWorkEvents, WithdrawWorkState>({
  initial: WithdrawWorkModalState.requirementsVerification,
  states: {
    [WithdrawWorkModalState.requirementsVerification]: {
      on: {
        NEXT: WithdrawWorkModalState.info,
        FAIL: WithdrawWorkModalState.requirementsFailed,
      },
    },
    [WithdrawWorkModalState.requirementsFailed]: {
      type: 'final',
    },
    [WithdrawWorkModalState.info]: {
      on: {
        NEXT: WithdrawWorkModalState.transaction,
      },
    },
    [WithdrawWorkModalState.transaction]: {
      invoke: {
        id: WithdrawWorkModalState.transaction,
        src: transactionMachine,
        onDone: [
          {
            target: WithdrawWorkModalState.success,
            cond: isTransactionSuccess,
          },
          {
            target: WithdrawWorkModalState.error,
            cond: isTransactionError,
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
          },
          {
            target: WithdrawWorkModalState.canceled,
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    ...transactionModalFinalStatusesFactory({
      metaMessages: {
        error: 'There was a problem while withdrawing your work entry.',
        success: 'Your work entry has been successfully withdrawn!',
      },
    }),
  },
})
