import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

import { isTransactionError, isTransactionSuccess, transactionMachine } from '@/common/model/machines'

import { StakeStepForm } from './StakeStep'

type EmptyObject = Record<string, never>

interface ApplyForRoleContext {
  stake?: StakeStepForm
  answers?: Record<number, string>
  transactionEvents?: EventRecord[]
}

type ValidStakeState = { stake: Required<StakeStepForm> }
type ValidFormState = ValidStakeState & { answers: Record<number, string> }
type AfterTransactionState = ValidFormState & { transactionEvents: EventRecord[] }

type ApplyForRoleState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'stake'; context: EmptyObject }
  | { value: 'form'; context: ValidStakeState }
  | { value: 'transaction'; context: ValidFormState }
  | { value: 'success'; context: AfterTransactionState }
  | { value: 'error'; context: AfterTransactionState }

type ValidStakeStepEvent = {
  type: 'VALID'
  stake: Required<StakeStepForm>
}
type ValidApplicationStepEvent = {
  type: 'VALID'
  answers: Record<number, string>
}
type TransactionSuccessEvent = {
  type: 'SUCCESS'
  events: EventRecord[]
}
type TransactionErrorEvent = {
  type: 'ERROR'
  events: EventRecord[]
}
export type ApplyForRoleEvent =
  | { type: 'FAIL' }
  | { type: 'PASS' }
  | ValidStakeStepEvent
  | ValidApplicationStepEvent
  | TransactionErrorEvent
  | TransactionSuccessEvent

export const applyForRoleMachine = createMachine<ApplyForRoleContext, ApplyForRoleEvent, ApplyForRoleState>({
  initial: 'requirementsVerification',
  states: {
    requirementsVerification: {
      on: {
        FAIL: 'requirementsFailed',
        PASS: 'stake',
      },
    },
    requirementsFailed: { type: 'final' },
    stake: {
      meta: { isStep: true, stepTitle: 'Stake' },
      on: {
        VALID: {
          target: 'form',
          actions: assign({
            stake: (context, event) => (event as ValidStakeStepEvent).stake,
          }),
        },
      },
    },
    form: {
      meta: { isStep: true, stepTitle: 'Form' },
      on: {
        VALID: {
          target: 'transaction',
          actions: assign({
            answers: (context, event) => (event as ValidApplicationStepEvent).answers,
          }),
        },
      },
    },
    transaction: {
      meta: { isStep: true, stepTitle: 'Submit application' },
      invoke: {
        id: 'transaction',
        src: transactionMachine,
        onDone: [
          {
            target: 'success',
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            cond: isTransactionError,
          },
          {
            target: 'error',
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            cond: isTransactionSuccess,
          },
        ],
      },
    },
    success: { type: 'final' },
    error: { type: 'final' },
  },
})
