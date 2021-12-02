import { EventRecord } from '@polkadot/types/interfaces/system'
import BN from 'bn.js'
import { assign, createMachine, State, Typestate } from 'xstate'
import { StateSchema } from 'xstate/lib/types'

import { Account } from '@/accounts/types'
import { getDataFromEvent } from '@/common/model/JoystreamNode'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'
import { EmptyObject } from '@/common/types'
import { Member } from '@/memberships/types'
import { RuntimeUpgradeParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/RuntimeUpgrade'
import { SetMembershipLeadInvitationParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetMembershipLeadInvitationQuota'
import { SetReferralCutParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetReferralCut'
import { SetWorkingGroupLeadRewardParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetWorkingGroupLeadReward'
import { SlashWorkingGroupLeadParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SlashWorkingGroupLead'
import { FillWorkingGroupLeadOpeningParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/FillWorkingGroupLeadOpening'
import { ProposalType } from '@/proposals/types'
import { GroupIdName } from '@/working-groups/types'

import {
  DecreaseWorkingGroupLeadStakeParameters,
  FundingRequestParameters,
  SignalParameters,
  TerminateWorkingGroupLeadParameters,
} from './components/SpecificParameters'
import {
  CancelWorkingGroupLeadOpeningParameters,
  StakingPolicyAndRewardParameters,
  WorkingGroupAndOpeningDetailsParameters,
} from './components/SpecificParameters/WorkingGroupLeadOpening/types'

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
    | SignalParameters
    | FundingRequestParameters
    | WorkingGroupAndOpeningDetailsParameters
    | CancelWorkingGroupLeadOpeningParameters
    | RuntimeUpgradeParameters
    | DecreaseWorkingGroupLeadStakeParameters
    | SlashWorkingGroupLeadParameters
    | SetReferralCutParameters
    | TerminateWorkingGroupLeadParameters
    | FillWorkingGroupLeadOpeningParameters
    | SetWorkingGroupLeadRewardParameters
    | SetMembershipLeadInvitationParameters
    | (StakingPolicyAndRewardParameters & WorkingGroupAndOpeningDetailsParameters)
}

interface SignalContext extends SpecificParametersContext {
  specifics: SignalParameters
}

interface FundingRequestContext extends SpecificParametersContext {
  specifics: FundingRequestParameters
}

interface SetReferralCutContext extends SpecificParametersContext {
  specifics: SetReferralCutParameters
}

interface WorkingGroupLeadOpeningContext extends SpecificParametersContext {
  specifics: WorkingGroupAndOpeningDetailsParameters
}

interface FillWorkingGroupLeadOpeningContext extends SpecificParametersContext {
  specifics: FillWorkingGroupLeadOpeningParameters
}

interface CancelWorkingGroupLeadOpeningContext extends SpecificParametersContext {
  specifics: CancelWorkingGroupLeadOpeningParameters
}

interface StakingPolicyAndRewardContext extends SpecificParametersContext {
  specifics: StakingPolicyAndRewardParameters & WorkingGroupAndOpeningDetailsParameters
}

interface RuntimeUpgradeContext extends SpecificParametersContext {
  specifics: RuntimeUpgradeParameters
}

interface DecreaseWorkingGroupLeadStakeContext extends SpecificParametersContext {
  specifics: DecreaseWorkingGroupLeadStakeParameters
}

interface SlashWorkingGroupLeadContext extends SpecificParametersContext {
  specifics: SlashWorkingGroupLeadParameters
}

interface TerminateWorkingGroupLeadContext extends SpecificParametersContext {
  specifics: TerminateWorkingGroupLeadParameters
}

interface SetWorkingGroupLeadRewardContext extends SpecificParametersContext {
  specifics: SetWorkingGroupLeadRewardParameters
}

interface SetMembershipLeadInvitationContext extends SpecificParametersContext {
  specifics: SetMembershipLeadInvitationParameters
}

export interface TransactionContext extends Required<SpecificParametersContext> {
  transactionEvents?: EventRecord[]
}

interface DiscusisonContext {
  transactionEvents?: EventRecord[]
  discussionId?: number
}

export type AddNewProposalContext = Partial<
  ProposalTypeContext &
    StakingAccountContext &
    BaseDetailsContext &
    TriggerAndDiscussionContext &
    SpecificParametersContext &
    SignalContext &
    FundingRequestContext &
    WorkingGroupLeadOpeningContext &
    CancelWorkingGroupLeadOpeningContext &
    FillWorkingGroupLeadOpeningContext &
    StakingPolicyAndRewardContext &
    RuntimeUpgradeContext &
    DecreaseWorkingGroupLeadStakeContext &
    SlashWorkingGroupLeadContext &
    TerminateWorkingGroupLeadContext &
    TransactionContext &
    SetReferralCutContext &
    SetWorkingGroupLeadRewardContext &
    DiscusisonContext &
    SetMembershipLeadInvitationContext
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
  | { value: { specificParameters: 'signal' }; context: SignalContext }
  | { value: { specificParameters: 'fundingRequest' }; context: FundingRequestContext }
  | { value: { specificParameters: 'runtimeUpgrade' }; context: RuntimeUpgradeContext }
  | { value: { specificParameters: 'setReferralCut' }; context: SetReferralCutContext }
  | { value: { specificParameters: 'decreaseWorkingGroupLeadStake' }; context: DecreaseWorkingGroupLeadStakeContext }
  | { value: { specificParameters: 'slashWorkingGroupLead' }; context: SlashWorkingGroupLeadContext }
  | { value: { specificParameters: 'terminateWorkingGroupLead' }; context: TerminateWorkingGroupLeadContext }
  | { value: { specificParameters: 'setWorkingGroupLeadReward' }; context: SetWorkingGroupLeadRewardContext }
  | { value: { specificParameters: 'setMembershipLeadInvitationQuota' }; context: SetMembershipLeadInvitationContext }
  | {
      value: { specificParameters: { createWorkingGroupLeadOpening: 'workingGroupAndOpeningDetails' } }
      context: WorkingGroupLeadOpeningContext
    }
  | {
      value: { specificParameters: { createWorkingGroupLeadOpening: 'stakingPolicyAndReward' } }
      context: StakingPolicyAndRewardContext
    }
  | { value: { specificParameters: 'fillWorkingGroupLeadOpening' }; context: FillWorkingGroupLeadOpeningContext }
  | {
      value: { specificParameters: 'cancelWorkingGroupLeadOpening' }
      context: CancelWorkingGroupLeadOpeningContext
    }
  | { value: 'beforeTransaction'; context: Required<AddNewProposalContext> }
  | { value: 'bindStakingAccount'; context: Required<AddNewProposalContext> }
  | { value: 'transaction'; context: Required<AddNewProposalContext> }
  | { value: 'discussionTransaction'; context: Required<AddNewProposalContext> }
  | { value: 'success'; context: Required<AddNewProposalContext> }
  | { value: 'error'; context: AddNewProposalContext }

type SetTypeEvent = { type: 'SET_TYPE'; proposalType: ProposalType }
type SetAccountEvent = { type: 'SET_ACCOUNT'; account: Account }
type SetAmountEvent = { type: 'SET_AMOUNT'; amount: BN }
type SetTitleEvent = { type: 'SET_TITLE'; title: string }
type SetRationaleEvent = { type: 'SET_RATIONALE'; rationale: string }
type SetSignalEvent = { type: 'SET_SIGNAL'; signal: string }
type SetTriggerBlockEvent = { type: 'SET_TRIGGER_BLOCK'; triggerBlock: ProposalTrigger | undefined }
type SetDiscussionModeEvent = { type: 'SET_DISCUSSION_MODE'; mode: ProposalDiscussionMode }
type SetDiscussionWhitelistEvent = { type: 'SET_DISCUSSION_WHITELIST'; whitelist: ProposalDiscussionWhitelist }
type SetDescriptionEvent = { type: 'SET_DESCRIPTION'; description: string }
type SetShortDescriptionEvent = { type: 'SET_SHORT_DESCRIPTION'; shortDescription: string }
type SetWorkingGroupEvent = { type: 'SET_WORKING_GROUP'; groupId: GroupIdName }
type SetWorkerEvent = { type: 'SET_WORKER'; workerId: number }
type SetOpeningIdEvent = { type: 'SET_OPENING_ID'; openingId: number }
type SetApplicationId = { type: 'SET_APPLICATION_ID'; applicationId: number }
type SetStakingAmount = { type: 'SET_STAKING_AMOUNT'; stakingAmount: BN }
type SetLeavingUnstakingPeriod = { type: 'SET_LEAVING_UNSTAKING_PERIOD'; leavingUnstakingPeriod: number }
type SetRewardPerBlock = { type: 'SET_REWARD_PER_BLOCK'; rewardPerBlock: BN }
type SetRuntime = { type: 'SET_RUNTIME'; runtime: ArrayBuffer }
type SetSlashingAmount = { type: 'SET_SLASHING_AMOUNT'; slashingAmount: BN }

const isType = (type: string) => (context: any) => type === context.type

export type AddNewProposalEvent =
  | { type: 'FAIL' }
  | { type: 'BACK' }
  | { type: 'NEXT' }
  | SetApplicationId
  | SetOpeningIdEvent
  | SetTypeEvent
  | SetAccountEvent
  | SetAmountEvent
  | SetTitleEvent
  | SetRationaleEvent
  | SetSignalEvent
  | SetTriggerBlockEvent
  | SetDiscussionModeEvent
  | SetDiscussionWhitelistEvent
  | SetDescriptionEvent
  | SetWorkingGroupEvent
  | SetWorkerEvent
  | SetShortDescriptionEvent
  | SetStakingAmount
  | SetLeavingUnstakingPeriod
  | SetRewardPerBlock
  | SetRuntime
  | SetSlashingAmount
  | { type: 'BOUND' }
  | { type: 'REQUIRES_STAKING_CANDIDATE' }

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
            specifics: (context, event) => {
              if (context.type !== (event as SetTypeEvent).proposalType) {
                return {}
              }

              return context.specifics
            },
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
        NEXT: 'beforeTransaction',
      },
      initial: 'entry',
      states: {
        entry: {
          always: [
            { target: 'signal', cond: isType('signal') },
            { target: 'fundingRequest', cond: isType('fundingRequest') },
            { target: 'createWorkingGroupLeadOpening', cond: isType('createWorkingGroupLeadOpening') },
            { target: 'cancelWorkingGroupLeadOpening', cond: isType('cancelWorkingGroupLeadOpening') },
            { target: 'runtimeUpgrade', cond: isType('runtimeUpgrade') },
            { target: 'decreaseWorkingGroupLeadStake', cond: isType('decreaseWorkingGroupLeadStake') },
            { target: 'slashWorkingGroupLead', cond: isType('slashWorkingGroupLead') },
            { target: 'setReferralCut', cond: isType('setReferralCut') },
            { target: 'terminateWorkingGroupLead', cond: isType('terminateWorkingGroupLead') },
            { target: 'fillWorkingGroupLeadOpening', cond: isType('fillWorkingGroupLeadOpening') },
            { target: 'setWorkingGroupLeadReward', cond: isType('setWorkingGroupLeadReward') },
            { target: 'setMembershipLeadInvitationQuota', cond: isType('setMembershipLeadInvitationQuota') },
          ],
        },
        signal: {
          on: {
            SET_SIGNAL: {
              actions: assign({
                specifics: (context, event) => {
                  return { ...context.specifics, signal: event.signal }
                },
              }),
            },
          },
        },
        setReferralCut: {
          on: {
            SET_AMOUNT: {
              actions: assign({
                specifics: (context, event) => {
                  return { ...context.specifics, amount: event.amount }
                },
              }),
            },
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
        decreaseWorkingGroupLeadStake: {
          on: {
            SET_STAKING_AMOUNT: {
              actions: assign({
                specifics: (context, event) => ({
                  ...context.specifics,
                  stakingAmount: event.stakingAmount,
                }),
              }),
            },
            SET_WORKING_GROUP: {
              actions: assign({
                specifics: (context, event) => ({
                  ...context.specifics,
                  groupId: event.groupId,
                }),
              }),
            },
            SET_WORKER: {
              actions: assign({
                specifics: (context, event) => ({
                  ...context.specifics,
                  workerId: event.workerId,
                }),
              }),
            },
          },
        },
        slashWorkingGroupLead: {
          on: {
            SET_SLASHING_AMOUNT: {
              actions: assign({
                specifics: (context, event) => ({
                  ...context.specifics,
                  slashingAmount: event.slashingAmount,
                }),
              }),
            },
            SET_WORKING_GROUP: {
              actions: assign({
                specifics: (context, event) => ({
                  ...context.specifics,
                  groupId: event.groupId,
                }),
              }),
            },
            SET_WORKER: {
              actions: assign({
                specifics: (context, event) => ({
                  ...context.specifics,
                  workerId: event.workerId,
                }),
              }),
            },
          },
        },
        terminateWorkingGroupLead: {
          on: {
            SET_SLASHING_AMOUNT: {
              actions: assign({
                specifics: (context, event) => ({
                  ...context.specifics,
                  slashingAmount: event.slashingAmount,
                }),
              }),
            },
            SET_WORKING_GROUP: {
              actions: assign({
                specifics: (context, event) => ({
                  ...context.specifics,
                  groupId: event.groupId,
                }),
              }),
            },
            SET_WORKER: {
              actions: assign({
                specifics: (context, event) => ({
                  ...context.specifics,
                  workerId: event.workerId,
                }),
              }),
            },
          },
        },
        setWorkingGroupLeadReward: {
          on: {
            SET_REWARD_PER_BLOCK: {
              actions: assign({
                specifics: (context, event) => ({
                  ...context.specifics,
                  rewardPerBlock: event.rewardPerBlock,
                }),
              }),
            },
            SET_WORKING_GROUP: {
              actions: assign({
                specifics: (context, event) => ({
                  ...context.specifics,
                  groupId: event.groupId,
                }),
              }),
            },
            SET_WORKER: {
              actions: assign({
                specifics: (context, event) => ({
                  ...context.specifics,
                  workerId: event.workerId,
                }),
              }),
            },
          },
        },
        fillWorkingGroupLeadOpening: {
          on: {
            SET_APPLICATION_ID: {
              actions: assign({
                specifics: (context, event) => ({
                  ...context.specifics,
                  applicationId: event.applicationId,
                }),
              }),
            },
            SET_OPENING_ID: {
              actions: assign({
                specifics: (context, event) => ({
                  ...context.specifics,
                  openingId: event.openingId,
                }),
              }),
            },
            SET_WORKING_GROUP: {
              actions: assign({
                specifics: (context, event) => ({
                  ...context.specifics,
                  groupId: event.groupId,
                }),
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
        setMembershipLeadInvitationQuota: {
          on: {
            SET_AMOUNT: {
              actions: assign({
                specifics: (context, event) => ({ ...context.specifics, amount: event.amount }),
              }),
            },
          },
        },
        cancelWorkingGroupLeadOpening: {
          on: {
            SET_OPENING_ID: {
              actions: assign({
                specifics: (context, event) => ({
                  ...context.specifics,
                  openingId: event.openingId,
                }),
              }),
            },
          },
        },
      },
    },
    beforeTransaction: {
      id: 'beforeTransaction',
      on: {
        BOUND: 'transaction',
        REQUIRES_STAKING_CANDIDATE: 'bindStakingAccount',
      },
    },
    bindStakingAccount: {
      invoke: {
        id: 'bindStakingAccount',
        src: transactionMachine,
        onDone: [
          {
            target: 'transaction',
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            cond: isTransactionSuccess,
          },
          {
            target: 'error',
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            cond: isTransactionError,
          },
          {
            target: 'canceled',
            cond: isTransactionCanceled,
          },
        ],
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
            cond: (context, event) => isTransactionSuccess(context, event) && context.discussionMode !== 'closed',
          },
          {
            target: 'discussionTransaction',
            actions: assign({
              transactionEvents: (context, event) => event.data.events,
              discussionId: (_, event) =>
                parseInt(getDataFromEvent(event.data.events, 'forum', 'ThreadCreated', 1)?.toString() ?? '-1'),
            }),
            cond: (context, event) => isTransactionSuccess(context, event) && context.discussionMode === 'closed',
          },
          {
            target: 'error',
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            cond: isTransactionError,
          },
          {
            target: 'canceled',
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    discussionTransaction: {
      invoke: {
        id: 'discussionTransaction',
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
          {
            target: 'canceled',
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    success: { type: 'final' },
    error: { type: 'final' },
    canceled: { type: 'final' },
  },
})
