import { createMachine } from 'xstate'

type EmptyObject = Record<string, never>
type ApplyForRoleState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'stake'; context: EmptyObject }
  | { value: 'form'; context: EmptyObject }
  | { value: 'transaction'; context: EmptyObject }
  | { value: 'success'; context: EmptyObject }
  | { value: 'error'; context: EmptyObject }

type ApplyForRoleEvent =
  | { type: 'FAIL' }
  | { type: 'PASS' }
  | { type: 'VALID' }
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }

export const applyForRoleMachine = createMachine<EmptyObject, ApplyForRoleEvent, ApplyForRoleState>({
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
