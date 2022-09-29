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

interface WithdrawalStakeContext {
  transactionEvents?: EventRecord[]
}

export enum WithdrawalStakeStates {
  requirementsVerification = 'requirementsVerification',
  requirementsFailed = 'requirementsFailed',
  transaction = 'transaction',
  success = 'success',
  error = 'error',
  cancel = 'cancel',
}

type WithdrawalStakeState =
  | { value: WithdrawalStakeStates.requirementsVerification; context: EmptyObject }
  | { value: WithdrawalStakeStates.requirementsFailed; context: EmptyObject }
  | { value: WithdrawalStakeStates.transaction; context: EmptyObject }
  | { value: WithdrawalStakeStates.success; context: Required<WithdrawalStakeContext> }
  | { value: WithdrawalStakeStates.error; context: Required<WithdrawalStakeContext> }
  | { value: WithdrawalStakeStates.cancel; context: EmptyObject }

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

export type WithdrawalStakeEvents = { type: 'NEXT' } | SuccessEvent | ErrorEvent

export const withdrawalStakeMachine = createMachine<
  WithdrawalStakeContext,
  WithdrawalStakeEvents,
  WithdrawalStakeState
>({
  initial: WithdrawalStakeStates.requirementsVerification,
  states: {
    [WithdrawalStakeStates.requirementsVerification]: {
      on: {
        NEXT: WithdrawalStakeStates.transaction,
        ERROR: WithdrawalStakeStates.requirementsFailed,
      },
    },
    [WithdrawalStakeStates.transaction]: {
      invoke: {
        id: WithdrawalStakeStates.transaction,
        src: transactionMachine,
        onDone: [
          {
            target: WithdrawalStakeStates.success,
            cond: isTransactionSuccess,
            actions: assign({ transactionEvents: (_, event) => event.data.events }),
          },
          {
            target: WithdrawalStakeStates.error,
            cond: isTransactionError,
            actions: assign({ transactionEvents: (_, event) => event.data.events }),
          },
          {
            target: WithdrawalStakeStates.cancel,
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    [WithdrawalStakeStates.requirementsFailed]: { type: 'final' },
    ...transactionModalFinalStatusesFactory({
      metaMessages: {
        error: 'There was a problem with withdrawing stake.',
        success: 'Your contribution has been successfully withdrawn!',
      },
    }),
  },
})
