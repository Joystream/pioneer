import { createMachine } from 'xstate'

type ApplyForRoleEvent =
  | { type: 'FAIL' }
  | { type: 'PASS' }
  | { type: 'VALID' }
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }

export const applyForRoleMachine = createMachine<Record<string, never>, ApplyForRoleEvent>({
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
