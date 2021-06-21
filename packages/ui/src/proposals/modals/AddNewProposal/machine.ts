import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

export const addNewProposalMachine = createMachine<{ transactionEvents: EventRecord[] }>(
  {
    initial: 'requirementsVerification',
    context: { transactionEvents: [] },
    states: {
      requirementsVerification: {
        on: {
          FAIL: 'requirementsFailed',
          NEXT: 'warning',
        },
      },
      requirementsFailed: { type: 'final' },
      warning: {
        meta: { isStep: true, stepTitle: 'Select type' },
        on: {
          NEXT: 'typeSelection',
        },
      },
      typeSelection: {
        on: {
          NEXT: 'error',
        },
      },
      generalParameters: {
        meta: { isStep: true, stepTitle: 'General parameters' },
      },
      stakingAccount: {
        meta: { isStep: true, isBaby: true, stepTitle: 'Staking account' },
      },
      proposalDetails: {
        meta: { isStep: true, isBaby: true, stepTitle: 'Proposal details' },
      },
      triggerAndDiscussion: {
        meta: { isStep: true, isBaby: true, stepTitle: 'Trigger & Discussion' },
      },
      specificParameters: {
        meta: { isStep: true, stepTitle: 'Specific parameters' },
      },
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
