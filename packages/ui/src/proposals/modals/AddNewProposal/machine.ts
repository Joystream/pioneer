import { assign, createMachine } from 'xstate'

import { Account } from '@/accounts/types'
import { ProposalDetails } from '@/proposals/types'

type EmptyObject = Record<string, never>

interface AddNewProposalContext {
  proposalType?: ProposalDetails
  stakingAccount?: Account
  proposalTitle?: string
  proposalRationale?: string
}

type AddNewProposalState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'warning'; context: EmptyObject }
  | { value: 'proposalType'; context: { proposalType: Required<ProposalDetails> } }
  | { value: 'requiredStakeVerification'; context: { proposalType: Required<ProposalDetails> } }
  | { value: 'requiredStakeFailed'; context: { proposalType: Required<ProposalDetails> } }
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
      context: {
        proposalType: Required<ProposalDetails>
        stakingAccount: Required<Account>
        proposalTitle: Required<string>
        proposalRationale: Required<string>
      }
    }
  | {
      value: 'generalParameters.triggerAndDiscussion'
      context: {
        proposalType: Required<ProposalDetails>
        stakingAccount: Required<Account>
        proposalTitle: Required<string>
        proposalRationale: Required<string>
      }
    }
  | {
      value: 'specificParameters'
      context: {
        proposalType: Required<ProposalDetails>
        stakingAccount: Required<Account>
        proposalTitle: Required<string>
        proposalRationale: Required<string>
      }
    }
  | { value: 'success'; context: AddNewProposalContext }
  | { value: 'error'; context: AddNewProposalContext }

type SelectProposalEvent = { type: 'SELECT'; proposalType: ProposalDetails }
type SelectAccountEvent = { type: 'SELECT'; stakingAccount: Account }
type SetTitleEvent = { type: 'SET_TITLE'; title: string }
type SetRationaleEvent = { type: 'SET_RATIONALE'; rationale: string }

export type AddNewProposalEvent =
  | { type: 'FAIL' }
  | { type: 'NEXT' }
  | SelectProposalEvent
  | SelectAccountEvent
  | SetTitleEvent
  | SetRationaleEvent

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
          target: 'requiredStakeVerification',
          cond: (context) => !!context.proposalType,
        },
        SELECT: {
          actions: assign({
            proposalType: (context, event) => (event as SelectProposalEvent).proposalType,
          }),
        },
      },
    },
    requiredStakeVerification: {
      on: {
        FAIL: 'requiredStakeFailed',
        NEXT: 'generalParameters',
      },
    },
    requiredStakeFailed: { type: 'final' },
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
            SET_TITLE: {
              actions: assign({
                proposalTitle: (context, event) => (event as SetTitleEvent).title,
              }),
            },
            SET_RATIONALE: {
              actions: assign({
                proposalRationale: (context, event) => (event as SetRationaleEvent).rationale,
              }),
            },
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
