import { assign, createMachine } from 'xstate'

import { Account } from '@/accounts/types'
import { ProposalDetails } from '@/proposals/types'

type EmptyObject = Record<string, never>

interface ProposalTypeContext {
  proposalType?: ProposalDetails
}

interface StakingAccountContext extends Required<ProposalTypeContext> {
  stakingAccount?: Account
}

interface BaseDetailsContext extends Required<StakingAccountContext> {
  proposalTitle?: string
  proposalRationale?: string
}

type Context = Partial<ProposalTypeContext & StakingAccountContext & BaseDetailsContext>

type AddNewProposalState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'warning'; context: EmptyObject }
  | { value: 'proposalType'; context: Required<ProposalTypeContext> }
  | { value: 'requiredStakeVerification'; context: Required<ProposalTypeContext> }
  | { value: 'requiredStakeFailed'; context: Required<ProposalTypeContext> }
  | { value: 'generalParameters'; context: Required<BaseDetailsContext> }
  | { value: 'generalParameters.stakingAccount'; context: Required<StakingAccountContext> }
  | { value: 'generalParameters.proposalDetails'; context: Required<BaseDetailsContext> }
  | { value: 'generalParameters.triggerAndDiscussion'; context: Required<BaseDetailsContext> }
  | { value: 'specificParameters'; context: Required<BaseDetailsContext> }
  | { value: 'success'; context: Required<BaseDetailsContext> }
  | { value: 'error'; context: Required<BaseDetailsContext> }

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

export const addNewProposalMachine = createMachine<Context, AddNewProposalEvent, AddNewProposalState>({
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
            NEXT: {
              target: 'triggerAndDiscussion',
              cond: (context) => !!context.proposalTitle && !!context.proposalRationale,
            },
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
