import { EventRecord } from '@polkadot/types/interfaces/system'
import BN from 'bn.js'
import { assign, createMachine, State, Typestate } from 'xstate'
import { StateSchema } from 'xstate/lib/types'

import { Account } from '@/accounts/types'
import { isTransactionError, isTransactionSuccess, transactionMachine } from '@/common/model/machines'
import { Member } from '@/memberships/types'
import { RuntimeUpgradeParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/RuntimeUpgrade'
import { ProposalType } from '@/proposals/types'

import { FundingRequestParameters } from './components/SpecificParameters'
import {
  StakingPolicyAndRewardParameters,
  WorkingGroupAndOpeningDetailsParameters,
} from './components/SpecificParameters/WorkingGroupLeadOpening/types'

type EmptyObject = Record<string, never>

interface ProposalTypeContext {
  type?: ProposalType
}

interface StakingAccountContext extends Required<ProposalTypeContext> {
  stakingAccount?: Account
}

interface BaseDetailsContext extends Required<StakingAccountContext> {
  title: string
  rationale: string
}

export type ProposalTrigger = false | number
export type ProposalDiscussionMode = 'open' | 'closed'
export type ProposalDiscussionWhitelist = Member[]

export interface TriggerAndDiscussionContext extends Required<BaseDetailsContext> {
  triggerBlock?: ProposalTrigger
  discussionMode: ProposalDiscussionMode
  discussionWhitelist: ProposalDiscussionWhitelist
}

export interface SpecificParametersContext extends Required<TriggerAndDiscussionContext> {
  specifics:
    | EmptyObject
    | FundingRequestParameters
    | WorkingGroupAndOpeningDetailsParameters
    | RuntimeUpgradeParameters
    | (StakingPolicyAndRewardParameters & WorkingGroupAndOpeningDetailsParameters)
}

interface FundingRequestContext extends SpecificParametersContext {
  specifics: FundingRequestParameters
}

interface WorkingGroupLeadOpeningContext extends SpecificParametersContext {
  specifics: WorkingGroupAndOpeningDetailsParameters
}

interface StakingPolicyAndRewardContext extends SpecificParametersContext {
  specifics: StakingPolicyAndRewardParameters & WorkingGroupAndOpeningDetailsParameters
}

interface RuntimeUpgradeContext extends SpecificParametersContext {
  specifics: RuntimeUpgradeParameters
}

export interface TransactionContext extends Required<SpecificParametersContext> {
  transactionEvents?: EventRecord[]
}

export type AddNewProposalContext = Partial<
  ProposalTypeContext &
    StakingAccountContext &
    BaseDetailsContext &
    TriggerAndDiscussionContext &
    SpecificParametersContext &
    FundingRequestContext &
    WorkingGroupLeadOpeningContext &
    StakingPolicyAndRewardContext &
    RuntimeUpgradeContext &
    TransactionContext
>

export type AddNewProposalState =
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
  | { value: { specificParameters: 'fundingRequest' }; context: FundingRequestContext }
  | { value: { specificParameters: 'runtimeUpgrade' }; context: RuntimeUpgradeContext }
  | {
      value: { specificParameters: { createWorkingGroupLeadOpening: 'workingGroupAndOpeningDetails' } }
      context: WorkingGroupLeadOpeningContext
    }
  | {
      value: { specificParameters: { createWorkingGroupLeadOpening: 'stakingPolicyAndReward' } }
      context: StakingPolicyAndRewardContext
    }
  | { value: 'transaction'; context: Required<AddNewProposalContext> }
  | { value: 'success'; context: Required<AddNewProposalContext> }
  | { value: 'error'; context: AddNewProposalContext }

type SetTypeEvent = { type: 'SET_TYPE'; proposalType: ProposalType }
type SetAccountEvent = { type: 'SET_ACCOUNT'; account: Account }
type SetAmountEvent = { type: 'SET_AMOUNT'; amount: BN }
type SetTitleEvent = { type: 'SET_TITLE'; title: string }
type SetRationaleEvent = { type: 'SET_RATIONALE'; rationale: string }
type SetTriggerBlockEvent = { type: 'SET_TRIGGER_BLOCK'; triggerBlock: ProposalTrigger | undefined }
type SetDiscussionModeEvent = { type: 'SET_DISCUSSION_MODE'; mode: ProposalDiscussionMode }
type SetDiscussionWhitelistEvent = { type: 'SET_DISCUSSION_WHITELIST'; whitelist: ProposalDiscussionWhitelist }
type SetDescriptionEvent = { type: 'SET_DESCRIPTION'; description: string }
type SetShortDescriptionEvent = { type: 'SET_SHORT_DESCRIPTION'; shortDescription: string }
type SetWorkingGroupEvent = { type: 'SET_WORKING_GROUP'; groupId: string }
type SetStakingAmount = { type: 'SET_STAKING_AMOUNT'; stakingAmount: BN }
type SetLeavingUnstakingPeriod = { type: 'SET_LEAVING_UNSTAKING_PERIOD'; leavingUnstakingPeriod: number }
type SetRewardPerBlock = { type: 'SET_REWARD_PER_BLOCK'; rewardPerBlock: BN }
type SetRuntime = { type: 'SET_RUNTIME'; runtime: ArrayBuffer }

const isType = (type: string) => (context: any) => type === context.type

export type AddNewProposalEvent =
  | { type: 'FAIL' }
  | { type: 'BACK' }
  | { type: 'NEXT' }
  | SetTypeEvent
  | SetAccountEvent
  | SetAmountEvent
  | SetTitleEvent
  | SetRationaleEvent
  | SetTriggerBlockEvent
  | SetDiscussionModeEvent
  | SetDiscussionWhitelistEvent
  | SetDescriptionEvent
  | SetWorkingGroupEvent
  | SetShortDescriptionEvent
  | SetStakingAmount
  | SetLeavingUnstakingPeriod
  | SetRewardPerBlock
  | SetRuntime

export type AddNewProposalMachineState = State<
  AddNewProposalContext,
  AddNewProposalEvent,
  StateSchema<AddNewProposalContext>,
  Typestate<AddNewProposalContext>
>

export const addNewProposalMachine = createMachine<AddNewProposalContext, AddNewProposalEvent, AddNewProposalState>({
  initial: 'requirementsVerification',
  context: {
    title: '',
    rationale: '',
    triggerBlock: false,
    discussionMode: 'open',
    discussionWhitelist: [],
    specifics: {},
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
      id: 'proposalType',
      meta: { isStep: true, stepTitle: 'Proposal type' },
      on: {
        NEXT: {
          target: 'requiredStakeVerification',
          cond: (context) => !!context.type,
        },
        SET_TYPE: {
          actions: assign({
            type: (context, event) => (event as SetTypeEvent).proposalType,
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
            BACK: '#proposalType',
            NEXT: {
              target: 'proposalDetails',
              cond: (context) => !!context.stakingAccount,
            },
            SET_ACCOUNT: {
              actions: assign({
                stakingAccount: (context, event) => (event as SetAccountEvent).account,
              }),
            },
          },
        },
        proposalDetails: {
          meta: { isStep: true, stepTitle: 'Proposal details' },
          on: {
            BACK: 'stakingAccount',
            NEXT: {
              target: 'triggerAndDiscussion',
              cond: (context) => !!context.title && !!context.rationale,
            },
            SET_TITLE: {
              actions: assign({
                title: (context, event) => (event as SetTitleEvent).title,
              }),
            },
            SET_RATIONALE: {
              actions: assign({
                rationale: (context, event) => (event as SetRationaleEvent).rationale,
              }),
            },
          },
        },
        triggerAndDiscussion: {
          meta: { isStep: true, stepTitle: 'Trigger & Discussion' },
          on: {
            BACK: 'proposalDetails',
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
        BACK: 'generalParameters.triggerAndDiscussion',
        NEXT: 'transaction',
      },
      initial: 'entry',
      states: {
        entry: {
          on: {
            // TODO: Check "always" transition
            '': [
              { target: 'fundingRequest', cond: isType('fundingRequest') },
              { target: 'createWorkingGroupLeadOpening', cond: isType('createWorkingGroupLeadOpening') },
              { target: 'runtimeUpgrade', cond: isType('runtimeUpgrade') },
            ],
          },
        },
        fundingRequest: {
          on: {
            SET_ACCOUNT: {
              actions: assign({
                specifics: (context, event) => {
                  return { ...context.specifics, account: (event as SetAccountEvent).account }
                },
              }),
            },
            SET_AMOUNT: {
              actions: assign({
                specifics: (context, event) => ({ ...context.specifics, amount: (event as SetAmountEvent).amount }),
              }),
            },
          },
        },
        runtimeUpgrade: {
          on: {
            SET_RUNTIME: {
              actions: assign({
                specifics: (context, event) => ({ ...context.specifics, runtime: event.runtime }),
              }),
            },
          },
        },
        createWorkingGroupLeadOpening: {
          initial: 'workingGroupAndOpeningDetails',
          states: {
            workingGroupAndOpeningDetails: {
              meta: {
                isStep: true,
                stepTitle: 'Working group & Opening details',
                cond: isType('createWorkingGroupLeadOpening'),
              },
              on: {
                SET_WORKING_GROUP: {
                  actions: assign({
                    specifics: (context, event) => ({
                      ...context.specifics,
                      groupId: event.groupId,
                    }),
                  }),
                },
                SET_SHORT_DESCRIPTION: {
                  actions: assign({
                    specifics: (context, event) => ({
                      ...context.specifics,
                      shortDescription: event.shortDescription,
                    }),
                  }),
                },
                SET_DESCRIPTION: {
                  actions: assign({
                    specifics: (context, event) => ({
                      ...context.specifics,
                      description: event.description,
                    }),
                  }),
                },
                NEXT: 'stakingPolicyAndReward',
              },
            },
            stakingPolicyAndReward: {
              meta: {
                isStep: true,
                stepTitle: 'Staking Policy & Reward',
                cond: isType('createWorkingGroupLeadOpening'),
              },
              on: {
                SET_STAKING_AMOUNT: {
                  actions: assign({
                    specifics: (context, event) => ({
                      ...context.specifics,
                      stakingAmount: event.stakingAmount,
                    }),
                  }),
                },
                SET_REWARD_PER_BLOCK: {
                  actions: assign({
                    specifics: (context, event) => ({
                      ...context.specifics,
                      rewardPerBlock: event.rewardPerBlock,
                    }),
                  }),
                },
                SET_LEAVING_UNSTAKING_PERIOD: {
                  actions: assign({
                    specifics: (context, event) => ({
                      ...context.specifics,
                      leavingUnstakingPeriod: event.leavingUnstakingPeriod,
                    }),
                  }),
                },
              },
            },
          },
        },
      },
    },
    transaction: {
      invoke: {
        id: 'transaction',
        src: transactionMachine,
        onDone: [
          {
            target: 'success',
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            cond: isTransactionSuccess,
          },
          {
            target: 'error',
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            cond: isTransactionError,
          },
        ],
      },
    },
    success: { type: 'final' },
    error: { type: 'final' },
  },
})
