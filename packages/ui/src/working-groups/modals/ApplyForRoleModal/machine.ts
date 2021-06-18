import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

export const applyForRoleMachine = createMachine<{ transactionEvents: EventRecord[] }>(
  {
    initial: 'requirementsVerification',
    context: { transactionEvents: [] },
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
        on: { VALID: 'stake' },
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
  },
  {
    actions: {
      assignTransactionEvents: assign({
        transactionEvents: (context, event) => event.data.events,
      }),
    },
  }
)
