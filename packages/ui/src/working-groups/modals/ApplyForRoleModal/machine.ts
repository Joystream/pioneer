import { assign, createMachine } from 'xstate'

import { StakeStepForm } from './StakeStep'

type EmptyObject = Record<string, never>

interface ApplyForRoleContext {
  stake?: StakeStepForm
  answers?: Record<number, string>
}

type ApplyForRoleState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'stake'; context: EmptyObject }
  | { value: 'form'; context: { stake: Required<StakeStepForm> } }
  | { value: 'transaction'; context: { stake: Required<StakeStepForm>; answers: Record<number, string> } }
  | { value: 'success'; context: { stake: Required<StakeStepForm>; answers: Record<number, string> } }
  | { value: 'error'; context: { stake: Required<StakeStepForm>; answers: Record<number, string> } }

type ValidStakeStepEvent = { type: 'VALID'; stake: Required<StakeStepForm> }
type ValidApplicationStepEvent = { type: 'VALID'; answers: Record<number, string> }
export type ApplyForRoleEvent =
  | { type: 'FAIL' }
  | { type: 'PASS' }
  | ValidStakeStepEvent
  | ValidApplicationStepEvent
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }

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
      on: {
        SUCCESS: 'success',
        ERROR: 'error',
      },
    },
    success: { type: 'final' },
    error: { type: 'final' },
  },
})
