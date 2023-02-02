import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine, State, Typestate } from 'xstate'
import { StateSchema } from 'xstate/lib/types'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import { getDataFromEvent } from '@/common/model/JoystreamNode'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'
import { EmptyObject } from '@/common/types'
import { defaultProposalValues } from '@/proposals/modals/AddNewProposal/helpers'
import { ProposalType } from '@/proposals/types'

interface ProposalTypeContext {
  type?: ProposalType
}

export type ProposalDiscussionMode = 'open' | 'closed'

export interface TriggerAndDiscussionContext extends Required<ProposalTypeContext> {
  discussionMode?: ProposalDiscussionMode
}

export interface TransactionContext extends Required<TriggerAndDiscussionContext> {
  transactionEvents?: EventRecord[]
  proposalId?: number
  discussionId?: number
}

export type AddNewProposalState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'warning'; context: EmptyObject }
  | { value: 'proposalType'; context: Required<ProposalTypeContext> }
  | { value: 'requiredStakeVerification'; context: Required<ProposalTypeContext> }
  | { value: 'requiredStakeFailed'; context: Required<ProposalTypeContext> }
  | { value: 'generalParameters'; context: Required<ProposalTypeContext> }
  | { value: 'generalParameters.stakingAccount'; context: Required<ProposalTypeContext> }
  | { value: 'generalParameters.proposalDetails'; context: Required<ProposalTypeContext> }
  | { value: 'generalParameters.triggerAndDiscussion'; context: Required<TriggerAndDiscussionContext> }
  | { value: 'generalParameters.finishGeneralParameters'; context: Required<TriggerAndDiscussionContext> }
  | { value: 'specificParameters'; context: Required<TriggerAndDiscussionContext> }
  | { value: { specificParameters: 'signal' }; context: Required<TriggerAndDiscussionContext> }
  | { value: { specificParameters: 'updateChannelPayouts' }; context: Required<TriggerAndDiscussionContext> }
  | { value: { specificParameters: 'fundingRequest' }; context: Required<TriggerAndDiscussionContext> }
  | { value: { specificParameters: 'runtimeUpgrade' }; context: Required<TriggerAndDiscussionContext> }
  | { value: { specificParameters: 'setReferralCut' }; context: Required<TriggerAndDiscussionContext> }
  | { value: { specificParameters: 'setMembershipPrice' }; context: Required<TriggerAndDiscussionContext> }
  | { value: { specificParameters: 'decreaseWorkingGroupLeadStake' }; context: Required<TriggerAndDiscussionContext> }
  | { value: { specificParameters: 'slashWorkingGroupLead' }; context: Required<TriggerAndDiscussionContext> }
  | { value: { specificParameters: 'updateWorkingGroupBudget' }; context: Required<TriggerAndDiscussionContext> }
  | { value: { specificParameters: 'terminateWorkingGroupLead' }; context: Required<TriggerAndDiscussionContext> }
  | { value: { specificParameters: 'setWorkingGroupLeadReward' }; context: Required<TriggerAndDiscussionContext> }
  | { value: { specificParameters: 'setMaxValidatorCount' }; context: Required<TriggerAndDiscussionContext> }
  | { value: { specificParameters: 'setCouncilBudgetIncrement' }; context: Required<TriggerAndDiscussionContext> }
  | { value: { specificParameters: 'setCouncilorReward' }; context: Required<TriggerAndDiscussionContext> }
  | {
      value: { specificParameters: 'setMembershipLeadInvitationQuota' }
      context: Required<TriggerAndDiscussionContext>
    }
  | {
      value: { specificParameters: { createWorkingGroupLeadOpening: 'workingGroupAndDescription' } }
      context: Required<TriggerAndDiscussionContext>
    }
  | {
      value: { specificParameters: { createWorkingGroupLeadOpening: 'durationAndProcess' } }
      context: Required<TriggerAndDiscussionContext>
    }
  | {
      value: { specificParameters: { createWorkingGroupLeadOpening: 'applicationForm' } }
      context: Required<TriggerAndDiscussionContext>
    }
  | {
      value: { specificParameters: { createWorkingGroupLeadOpening: 'stakingPolicyAndReward' } }
      context: Required<TriggerAndDiscussionContext>
    }
  | { value: { specificParameters: 'fillWorkingGroupLeadOpening' }; context: Required<TriggerAndDiscussionContext> }
  | {
      value: { specificParameters: 'cancelWorkingGroupLeadOpening' }
      context: Required<TriggerAndDiscussionContext>
    }
  | { value: { specificParameters: 'setInitialInvitationCount' }; context: Required<TriggerAndDiscussionContext> }
  | { value: 'beforeTransaction'; context: Required<TriggerAndDiscussionContext> }
  | { value: 'bindStakingAccount'; context: Required<TriggerAndDiscussionContext> }
  | { value: 'transaction'; context: Required<TransactionContext> }
  | { value: 'discussionTransaction'; context: Required<TransactionContext> }
  | { value: 'success'; context: Required<TransactionContext> }
  | { value: 'error'; context: TransactionContext }

type SetTypeEvent = { type: 'SET_TYPE'; proposalType: ProposalType }
type SetDiscussionModeEvent = { type: 'SET_DISCUSSION_MODE'; mode: ProposalDiscussionMode }

const isType = (type: string) => (context: any) => type === context?.type

export type AddNewProposalEvent =
  | { type: 'FAIL' }
  | { type: 'BACK' }
  | { type: 'NEXT' }
  | SetTypeEvent
  | SetDiscussionModeEvent
  | { type: 'BOUND' }
  | { type: 'REQUIRES_STAKING_CANDIDATE' }

export type AddNewProposalMachineState = State<
  Partial<TransactionContext>,
  AddNewProposalEvent,
  StateSchema<Partial<TransactionContext>>,
  Typestate<Partial<TransactionContext>>
>

export const addNewProposalMachine = createMachine<
  Partial<TransactionContext>,
  AddNewProposalEvent,
  AddNewProposalState
>({
  initial: 'requirementsVerification',
  context: {
    discussionMode: defaultProposalValues.triggerAndDiscussion.isDiscussionClosed ? 'closed' : 'open',
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
        NEXT: 'requiredStakeVerification',
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
            NEXT: 'proposalDetails',
          },
        },
        proposalDetails: {
          meta: { isStep: true, stepTitle: 'Proposal details' },
          on: {
            BACK: 'stakingAccount',
            NEXT: 'triggerAndDiscussion',
          },
        },
        triggerAndDiscussion: {
          meta: { isStep: true, stepTitle: 'Trigger & Discussion' },
          on: {
            BACK: 'proposalDetails',
            NEXT: 'finishGeneralParameters',
            SET_DISCUSSION_MODE: {
              actions: assign({
                discussionMode: (context, event) => (event as SetDiscussionModeEvent).mode,
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
            { target: 'updateChannelPayouts', cond: isType('updateChannelPayouts') },
          ],
        },
        updateChannelPayouts: {},
        signal: {},
        setMaxValidatorCount: {},
        setReferralCut: {},
        fundingRequest: {},
        runtimeUpgrade: {},
        setCouncilBudgetIncrement: {},
        decreaseWorkingGroupLeadStake: {},
        slashWorkingGroupLead: {},
        terminateWorkingGroupLead: {},
        setCouncilorReward: {},
        setWorkingGroupLeadReward: {},
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
                BACK: 'applicationForm',
              },
            },
          },
        },
        setMembershipLeadInvitationQuota: {},
        cancelWorkingGroupLeadOpening: {},
        setInitialInvitationBalance: {},
        setMembershipPrice: {},
        setInitialInvitationCount: {},
        updateWorkingGroupBudget: {},
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
    ...transactionModalFinalStatusesFactory({
      metaMessages: {
        error: 'There was a problem while creating proposal.',
      },
      cancel: {
        target: 'specificParameters',
        action: 'BACK',
      },
    }),
  },
})
