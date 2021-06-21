import { createMachine } from 'xstate'

import { StakeStepForm } from './StakeStep'

type EmptyObject = Record<string, never>

interface ApplyForRoleContext {
  stake?: StakeStepForm
}

type ApplyForRoleState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'stake'; context: EmptyObject }
  | { value: 'form'; context: { stake: StakeStepForm } }
  | { value: 'transaction'; context: { stake: StakeStepForm } }
  | { value: 'success'; context: { stake: StakeStepForm } }
  | { value: 'error'; context: { stake: StakeStepForm } }

type ApplyForRoleEvent =
  | { type: 'FAIL' }
  | { type: 'PASS' }
  | { type: 'VALID' }
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
      on: { VALID: 'form' },
    },
    form: {
      meta: { isStep: true, stepTitle: 'Form' },
      on: { VALID: 'transaction' },
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
