import { assign, createMachine } from 'xstate'

import { Account } from '@/accounts/types'
import { Member } from '@/memberships/types'
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

export type ProposalTrigger = false | number
export type ProposalDiscussionMode = 'open' | 'closed'
export type ProposalDiscussionWhitelist = Member[]

interface TriggerAndDiscussionContext extends Required<BaseDetailsContext> {
  triggerBlock?: ProposalTrigger
  discussionMode: ProposalDiscussionMode
  discussionWhitelist: ProposalDiscussionWhitelist
}

type AddNewProposalContext = Partial<
  ProposalTypeContext & StakingAccountContext & BaseDetailsContext & TriggerAndDiscussionContext
>

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
  | { value: 'generalParameters.triggerAndDiscussion'; context: Required<TriggerAndDiscussionContext> }
  | { value: 'generalParameters.finishGeneralParameters'; context: Required<TriggerAndDiscussionContext> }
  | { value: 'specificParameters'; context: Required<TriggerAndDiscussionContext> }
  | { value: 'success'; context: AddNewProposalContext }
  | { value: 'error'; context: AddNewProposalContext }

type SelectProposalEvent = { type: 'SELECT'; proposalType: ProposalDetails }
type SelectAccountEvent = { type: 'SELECT'; stakingAccount: Account }
type SetTitleEvent = { type: 'SET_TITLE'; title: string }
type SetRationaleEvent = { type: 'SET_RATIONALE'; rationale: string }
type SetTriggerBlockEvent = { type: 'SET_TRIGGER_BLOCK'; triggerBlock: ProposalTrigger | undefined }
type SetDiscussionModeEvent = { type: 'SET_DISCUSSION_MODE'; mode: ProposalDiscussionMode }
type SetDiscussionWhitelistEvent = { type: 'SET_DISCUSSION_WHITELIST'; whitelist: ProposalDiscussionWhitelist }

export type AddNewProposalEvent =
  | { type: 'FAIL' }
  | { type: 'NEXT' }
  | SelectProposalEvent
  | SelectAccountEvent
  | SetTitleEvent
  | SetRationaleEvent
  | SetTriggerBlockEvent
  | SetDiscussionModeEvent
  | SetDiscussionWhitelistEvent

export const addNewProposalMachine = createMachine<AddNewProposalContext, AddNewProposalEvent, AddNewProposalState>({
  initial: 'requirementsVerification',
  context: {
    triggerBlock: false,
    discussionMode: 'open',
    discussionWhitelist: [],
  },
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
          on: {
            NEXT: {
              target: 'finishGeneralParameters',
              cond: (context) =>
                context.discussionMode !== undefined &&
                context.discussionWhitelist !== undefined &&
                context.triggerBlock !== undefined,
            },
            SET_TRIGGER_BLOCK: {
              actions: assign({
                triggerBlock: (context, event) => (event as SetTriggerBlockEvent).triggerBlock,
              }),
            },
            SET_DISCUSSION_MODE: {
              actions: assign({
                discussionMode: (context, event) => (event as SetDiscussionModeEvent).mode,
              }),
            },
            SET_DISCUSSION_WHITELIST: {
              actions: assign({
                discussionWhitelist: (context, event) => (event as SetDiscussionWhitelistEvent).whitelist,
              }),
            },
          },
        },
        finishGeneralParameters: {
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
