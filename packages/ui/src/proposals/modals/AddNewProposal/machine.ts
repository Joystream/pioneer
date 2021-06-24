import { assign, createMachine } from 'xstate'

import { Account } from '@/accounts/types'
import { ProposalDetails } from '@/proposals/types'

type EmptyObject = Record<string, never>

interface AddNewProposalContext {
  proposalType?: ProposalDetails
  stakingAccount?: Account
}

type AddNewProposalState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'warning'; context: EmptyObject }
  | { value: 'proposalType'; context: { proposalType: Required<ProposalDetails> } }
  | {
      value: 'generalParameters'
      context: { proposalType: Required<ProposalDetails>; stakingAccount: Required<Account> }
    }
  | {
      value: 'generalParameters.stakingAccount'
      context: { proposalType: Required<ProposalDetails>; stakingAccount: Required<Account> }
    }
  | {
      value: 'generalParameters.proposalDetails'
      context: { proposalType: Required<ProposalDetails>; stakingAccount: Required<Account> }
    }
  | {
      value: 'generalParameters.triggerAndDiscussion'
      context: { proposalType: Required<ProposalDetails>; stakingAccount: Required<Account> }
    }
  | {
      value: 'specificParameters'
      context: { proposalType: Required<ProposalDetails>; stakingAccount: Required<Account> }
    }
  | { value: 'success'; context: { proposalType: Required<ProposalDetails>; stakingAccount: Required<Account> } }
  | { value: 'error'; context: { proposalType: Required<ProposalDetails>; stakingAccount: Required<Account> } }

type SelectProposalEvent = { type: 'SELECT'; proposalType: ProposalDetails }
type SelectAccountEvent = { type: 'SELECT'; stakingAccount: Account }
export type AddNewProposalEvent = { type: 'FAIL' } | { type: 'NEXT' } | SelectProposalEvent | SelectAccountEvent

export const addNewProposalMachine = createMachine<AddNewProposalContext, AddNewProposalEvent, AddNewProposalState>({
  initial: 'requirementsVerification',
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
        NEXT: {
          target: 'generalParameters',
          cond: (context) => !!context.proposalType,
        },
        SELECT: {
          actions: assign({
            proposalType: (context, event) => (event as SelectProposalEvent).proposalType,
          }),
        },
      },
    },
    generalParameters: {
      initial: 'stakingAccount',
      meta: { isStep: true, stepTitle: 'General parameters' },
      states: {
        stakingAccount: {
          meta: { isStep: true, stepTitle: 'Staking account' },
          on: {
            NEXT: {
              target: 'proposalDetails',
              cond: (context) => !!context.stakingAccount,
            },
            SELECT: {
              actions: assign({
                stakingAccount: (context, event) => (event as SelectAccountEvent).stakingAccount,
              }),
            },
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
})
