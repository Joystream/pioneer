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
        on: {
          NEXT: 'proposalType',
        },
      },
      proposalType: {
        meta: { isStep: true, stepTitle: 'Proposal type' },
        on: {
          NEXT: 'generalParameters',
        },
      },
      generalParameters: {
        meta: { isStep: true, stepTitle: 'General parameters' },
        states: {
          stakingAccount: {
            meta: { isStep: true, stepTitle: 'Staking account' },
            on: {
              NEXT: 'proposalDetails',
            },
          },
          proposalDetails: {
            meta: { isStep: true, stepTitle: 'Proposal details' },
            on: {
              NEXT: 'triggerAndDiscussion',
            },
          },
          triggerAndDiscussion: {
            meta: { isStep: true, stepTitle: 'Trigger & Discussion' },
            type: 'final',
          },
        },
        onDone: 'specificParameters',
      },
      specificParameters: {
        meta: { isStep: true, stepTitle: 'Specific parameters' },
        on: {
          NEXT: 'error',
        },
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
