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
import { SetCouncilBudgetIncrementParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetCouncilBudgetIncrement'
import { SetCouncilorRewardParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetCouncilorReward'
import { SetMaxValidatorCountParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetMaxValidatorCount'
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
  SetMembershipPriceParameters,
  SignalParameters,
  UpdateWorkingGroupBudgetParameters,
  TerminateWorkingGroupLeadParameters,
  UpdateKind,
} from './components/SpecificParameters'
import { SetInitialInvitationBalanceParameters } from './components/SpecificParameters/SetInitialInvitationBalance'
import { SetInitialInvitationCountParameters } from './components/SpecificParameters/SetInitialInvitationCount'
import {
  CancelWorkingGroupLeadOpeningParameters,
  CreateWorkingGroupLeadOpeningParameters,
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
    | CancelWorkingGroupLeadOpeningParameters
    | RuntimeUpgradeParameters
    | DecreaseWorkingGroupLeadStakeParameters
    | SlashWorkingGroupLeadParameters
    | SetReferralCutParameters
    | TerminateWorkingGroupLeadParameters
    | FillWorkingGroupLeadOpeningParameters
    | SetWorkingGroupLeadRewardParameters
    | SetCouncilBudgetIncrementParameters
    | SetMembershipLeadInvitationParameters
    | CreateWorkingGroupLeadOpeningParameters
    | UpdateWorkingGroupBudgetParameters
    | SetInitialInvitationCountParameters
    | SetMaxValidatorCountParameters
    | SetMembershipPriceParameters
    | SetCouncilorRewardParameters
}

interface SignalContext extends SpecificParametersContext {
  specifics: SignalParameters
}

interface FundingRequestContext extends SpecificParametersContext {
  specifics: FundingRequestParameters
}

interface SetCouncilorRewardContext extends SpecificParametersContext {
  specifics: SetCouncilorRewardParameters
}

interface SetCouncilBudgetIncrementContext extends SpecificParametersContext {
  specifics: SetCouncilBudgetIncrementParameters
}

interface SetReferralCutContext extends SpecificParametersContext {
  specifics: SetReferralCutParameters
}

interface FillWorkingGroupLeadOpeningContext extends SpecificParametersContext {
  specifics: FillWorkingGroupLeadOpeningParameters
}

interface CancelWorkingGroupLeadOpeningContext extends SpecificParametersContext {
  specifics: CancelWorkingGroupLeadOpeningParameters
}

interface CreateWorkingGroupLeadOpeningContext extends SpecificParametersContext {
  specifics: CreateWorkingGroupLeadOpeningParameters
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

interface UpdateWorkingGroupBudgetContext extends SpecificParametersContext {
  specifics: UpdateWorkingGroupBudgetParameters
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

interface SetInitialInvitationBalanceContext extends SpecificParametersContext {
  specifics: SetInitialInvitationBalanceParameters
}

interface SetInitialInvitationCountContext extends SpecificParametersContext {
  specifics: SetInitialInvitationCountParameters
}

export interface TransactionContext extends Required<SpecificParametersContext> {
  transactionEvents?: EventRecord[]
  proposalId?: number
}

interface DiscussionContext extends Required<TransactionContext> {
  discussionId?: number
}

interface SetMaxValidatorCountContext extends SpecificParametersContext {
  specifics: SetMaxValidatorCountParameters
}

interface SetMembershipPriceContext extends SpecificParametersContext {
  specifics: SetMembershipPriceParameters
}

export type AddNewProposalContext = Partial<
  ProposalTypeContext &
    StakingAccountContext &
    BaseDetailsContext &
    TriggerAndDiscussionContext &
    SpecificParametersContext &
    SignalContext &
    FundingRequestContext &
    CreateWorkingGroupLeadOpeningContext &
    CancelWorkingGroupLeadOpeningContext &
    FillWorkingGroupLeadOpeningContext &
    SetCouncilBudgetIncrementContext &
    SetCouncilorRewardContext &
    RuntimeUpgradeContext &
    DecreaseWorkingGroupLeadStakeContext &
    SlashWorkingGroupLeadContext &
    UpdateWorkingGroupBudgetContext &
    TerminateWorkingGroupLeadContext &
    TransactionContext &
    SetReferralCutContext &
    SetWorkingGroupLeadRewardContext &
    SetMaxValidatorCountContext &
    DiscussionContext &
    SetMembershipLeadInvitationContext &
    SetInitialInvitationBalanceContext &
    SetMembershipPriceContext &
    SetInitialInvitationCountContext
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
  | { value: { specificParameters: 'setMembershipPrice' }; context: SetMembershipPriceContext }
  | { value: { specificParameters: 'decreaseWorkingGroupLeadStake' }; context: DecreaseWorkingGroupLeadStakeContext }
  | { value: { specificParameters: 'slashWorkingGroupLead' }; context: SlashWorkingGroupLeadContext }
  | { value: { specificParameters: 'updateWorkingGroupBudget' }; context: UpdateWorkingGroupBudgetContext }
  | { value: { specificParameters: 'terminateWorkingGroupLead' }; context: TerminateWorkingGroupLeadContext }
  | { value: { specificParameters: 'setWorkingGroupLeadReward' }; context: SetWorkingGroupLeadRewardContext }
  | { value: { specificParameters: 'setMaxValidatorCount' }; context: SetMaxValidatorCountContext }
  | { value: { specificParameters: 'setCouncilBudgetIncrement' }; context: SetCouncilBudgetIncrementContext }
  | { value: { specificParameters: 'setCouncilorReward' }; context: SetCouncilorRewardContext }
  | { value: { specificParameters: 'setMembershipLeadInvitationQuota' }; context: SetMembershipLeadInvitationContext }
  | {
      value: { specificParameters: { createWorkingGroupLeadOpening: 'workingGroupAndDescription' } }
      context: CreateWorkingGroupLeadOpeningContext
    }
  | {
      value: { specificParameters: { createWorkingGroupLeadOpening: 'durationAndProcess' } }
      context: CreateWorkingGroupLeadOpeningContext
    }
  | {
      value: { specificParameters: { createWorkingGroupLeadOpening: 'applicationForm' } }
      context: CreateWorkingGroupLeadOpeningContext
    }
  | {
      value: { specificParameters: { createWorkingGroupLeadOpening: 'stakingPolicyAndReward' } }
      context: CreateWorkingGroupLeadOpeningContext
    }
  | { value: { specificParameters: 'fillWorkingGroupLeadOpening' }; context: FillWorkingGroupLeadOpeningContext }
  | {
      value: { specificParameters: 'cancelWorkingGroupLeadOpening' }
      context: CancelWorkingGroupLeadOpeningContext
    }
  | { value: { specificParameters: 'setInitialInvitationCount' }; context: SetInitialInvitationCountContext }
  | { value: 'beforeTransaction'; context: Required<AddNewProposalContext> }
  | { value: 'bindStakingAccount'; context: Required<AddNewProposalContext> }
  | { value: 'transaction'; context: Required<AddNewProposalContext> }
  | { value: 'discussionTransaction'; context: Required<AddNewProposalContext> }
  | { value: 'success'; context: Required<AddNewProposalContext> }
  | { value: 'error'; context: AddNewProposalContext }

type SetTypeEvent = { type: 'SET_TYPE'; proposalType: ProposalType }
type SetAccountEvent = { type: 'SET_ACCOUNT'; account: Account }
type SetAmountEvent = { type: 'SET_AMOUNT'; amount: BN }
type SetReferralCutEvent = { type: 'SET_REFERRAL_CUT'; referralCut: number }
type SetBudgetUpdateEvent = { type: 'SET_BUDGET_UPDATE'; amount: BN }
type SetBudgetUpdateKindEvent = { type: 'SET_BUDGET_UPDATE_KIND'; kind: UpdateKind }
type SetTitleEvent = { type: 'SET_TITLE'; title: string }
type SetRationaleEvent = { type: 'SET_RATIONALE'; rationale: string }
type SetTriggerBlockEvent = { type: 'SET_TRIGGER_BLOCK'; triggerBlock: ProposalTrigger | undefined }
type SetDiscussionModeEvent = { type: 'SET_DISCUSSION_MODE'; mode: ProposalDiscussionMode }
type SetDiscussionWhitelistEvent = { type: 'SET_DISCUSSION_WHITELIST'; whitelist: ProposalDiscussionWhitelist }
type SetDescriptionEvent = { type: 'SET_DESCRIPTION'; description: string }
type SetShortDescriptionEvent = { type: 'SET_SHORT_DESCRIPTION'; shortDescription: string }
type SetDuration = { type: 'SET_DURATION'; duration: CreateWorkingGroupLeadOpeningParameters['duration'] }
type SetDetails = { type: 'SET_DETAILS'; details: string }
type SetQuestions = { type: 'SET_QUESTIONS'; questions: CreateWorkingGroupLeadOpeningParameters['questions'] }
type SetWorkingGroupEvent = { type: 'SET_WORKING_GROUP'; groupId: GroupIdName }
type SetWorkerEvent = { type: 'SET_WORKER'; workerId: number }
type SetOpeningIdEvent = { type: 'SET_OPENING_ID'; openingId: string }
type SetApplicationId = { type: 'SET_APPLICATION_ID'; applicationId: string }
type SetStakingAmount = { type: 'SET_STAKING_AMOUNT'; stakingAmount: BN }
type SetLeavingUnstakingPeriod = { type: 'SET_LEAVING_UNSTAKING_PERIOD'; leavingUnstakingPeriod: number }
type SetRewardPerBlock = { type: 'SET_REWARD_PER_BLOCK'; rewardPerBlock: BN }
type SetRuntime = { type: 'SET_RUNTIME'; runtime: ArrayBuffer }
type SetSlashingAmount = { type: 'SET_SLASHING_AMOUNT'; slashingAmount: BN }
type SetInvitationCount = { type: 'SET_INVITATION_COUNT'; count: BN | undefined }

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
  | SetBudgetUpdateEvent
  | SetBudgetUpdateKindEvent
  | SetTriggerBlockEvent
  | SetDiscussionModeEvent
  | SetDiscussionWhitelistEvent
  | SetDescriptionEvent
  | SetWorkingGroupEvent
  | SetWorkerEvent
  | SetShortDescriptionEvent
  | SetDuration
  | SetDetails
  | SetQuestions
  | SetStakingAmount
  | SetLeavingUnstakingPeriod
  | SetRewardPerBlock
  | SetRuntime
  | SetSlashingAmount
  | SetInvitationCount
  | SetReferralCutEvent
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
        },
        SET_TYPE: {
          actions: assign({
            specifics: (context, event) => {
              const pickedType = (event as SetTypeEvent).proposalType
              if (context.type !== pickedType) {
                if (pickedType === 'createWorkingGroupLeadOpening') {
                  return { duration: { isLimited: true, length: 43200 } }
                }
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
            { target: 'updateWorkingGroupBudget', cond: isType('updateWorkingGroupBudget') },
            { target: 'setReferralCut', cond: isType('setReferralCut') },
            { target: 'terminateWorkingGroupLead', cond: isType('terminateWorkingGroupLead') },
            { target: 'fillWorkingGroupLeadOpening', cond: isType('fillWorkingGroupLeadOpening') },
            { target: 'setWorkingGroupLeadReward', cond: isType('setWorkingGroupLeadReward') },
            { target: 'setMaxValidatorCount', cond: isType('setMaxValidatorCount') },
            { target: 'setMembershipLeadInvitationQuota', cond: isType('setMembershipLeadInvitationQuota') },
            { target: 'setCouncilBudgetIncrement', cond: isType('setCouncilBudgetIncrement') },
            { target: 'setCouncilorReward', cond: isType('setCouncilorReward') },
            { target: 'setInitialInvitationBalance', cond: isType('setInitialInvitationBalance') },
            { target: 'setMembershipPrice', cond: isType('setMembershipPrice') },
            { target: 'setInitialInvitationCount', cond: isType('setInitialInvitationCount') },
          ],
        },
        signal: {},
        setMaxValidatorCount: {
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
        setReferralCut: {
          on: {
            SET_REFERRAL_CUT: {
              actions: assign({
                specifics: (context, event) => {
                  return { ...context.specifics, referralCut: event.referralCut }
                },
              }),
            },
          },
        },
        fundingRequest: {},
        runtimeUpgrade: {},
        setCouncilBudgetIncrement: {
          on: {
            SET_AMOUNT: {
              actions: assign({
                specifics: (context, event) => ({ ...context.specifics, amount: (event as SetAmountEvent).amount }),
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
        setCouncilorReward: {},
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
        fillWorkingGroupLeadOpening: {},
        createWorkingGroupLeadOpening: {
          initial: 'workingGroupAndDescription',
          states: {
            workingGroupAndDescription: {
              meta: {
                isStep: true,
                stepTitle: 'Working group & Description',
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
                SET_TITLE: {
                  actions: assign({
                    specifics: (context, event) => ({
                      ...context.specifics,
                      title: event.title,
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
                NEXT: 'durationAndProcess',
              },
            },
            durationAndProcess: {
              meta: {
                isStep: true,
                stepTitle: 'Duration & Process',
                cond: isType('createWorkingGroupLeadOpening'),
              },
              on: {
                SET_DURATION: {
                  actions: assign({
                    specifics: (context, event) => ({
                      ...context.specifics,
                      duration: event.duration,
                    }),
                  }),
                },
                SET_DETAILS: {
                  actions: assign({
                    specifics: (context, event) => ({
                      ...context.specifics,
                      details: event.details,
                    }),
                  }),
                },
                BACK: 'workingGroupAndDescription',
                NEXT: 'applicationForm',
              },
            },
            applicationForm: {
              meta: {
                isStep: true,
                stepTitle: 'Application Form',
                cond: isType('createWorkingGroupLeadOpening'),
              },
              on: {
                SET_QUESTIONS: {
                  actions: assign({
                    specifics: (context, event) => ({
                      ...context.specifics,
                      questions: event.questions,
                    }),
                  }),
                },
                BACK: 'durationAndProcess',
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
                BACK: 'applicationForm',
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
        setInitialInvitationBalance: {
          on: {
            SET_AMOUNT: {
              actions: assign({
                specifics: (context, event) => ({
                  ...context.specifics,
                  amount: event.amount,
                }),
              }),
            },
          },
        },
        setMembershipPrice: {
          on: {
            SET_AMOUNT: {
              actions: assign({
                specifics: (context, event) => ({
                  ...context.specifics,
                  amount: event.amount,
                }),
              }),
            },
          },
        },
        setInitialInvitationCount: {
          on: {
            SET_INVITATION_COUNT: {
              actions: assign({
                specifics: (context, event) => ({
                  ...context.specifics,
                  invitationCount: event.count,
                }),
              }),
            },
          },
        },
        updateWorkingGroupBudget: {
          on: {
            SET_WORKING_GROUP: {
              actions: assign({
                specifics: (context, event) => ({
                  ...context.specifics,
                  groupId: event.groupId,
                }),
              }),
            },
            SET_BUDGET_UPDATE: {
              actions: assign({
                specifics: (context, event) => ({
                  ...context.specifics,
                  budgetUpdate: event.amount,
                }),
              }),
            },
            SET_BUDGET_UPDATE_KIND: {
              actions: assign({
                specifics: (context, event) => ({
                  ...context.specifics,
                  budgetUpdateKind: event.kind,
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
        FAIL: 'requirementsFailed',
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
            actions: assign({
              proposalId: (_, event) =>
                Number(getDataFromEvent(event.data.events, 'proposalsCodex', 'ProposalCreated') ?? -1),
            }),
            cond: (context, event) => isTransactionSuccess(context, event) && context.discussionMode !== 'closed',
          },
          {
            target: 'discussionTransaction',
            actions: assign({
              transactionEvents: (context, event) => event.data.events,
              discussionId: (_, event) => {
                return parseInt(getDataFromEvent(event.data.events, 'forum', 'ThreadCreated', 0)?.toString() ?? '-1')
              },
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
