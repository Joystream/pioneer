import { EventRecord } from '@polkadot/types/interfaces/system'
import BN from 'bn.js'
import { assign, createMachine } from 'xstate'

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
  transaction = 'transaction',
  success = 'success',
  error = 'error',
  cancel = 'cancel',
}

type WithdrawalStakeState =
  | { value: WithdrawalStakeStates.requirementsVerification; context: EmptyObject }
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
  initial: 'requirementsVerification',
  states: {
    [WithdrawalStakeStates.requirementsVerification]: {
      on: {
        NEXT: WithdrawalStakeStates.transaction,
        ERROR: WithdrawalStakeStates.error,
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
    [WithdrawalStakeStates.success]: { type: 'final' },
    [WithdrawalStakeStates.error]: { type: 'final' },
    [WithdrawalStakeStates.cancel]: { type: 'final' },
  },
})
