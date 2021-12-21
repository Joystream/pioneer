import { EventRecord } from '@polkadot/types/interfaces/system'
import BN from 'bn.js'
import { assign, createMachine, State, Typestate } from 'xstate'
import { StateSchema } from 'xstate/lib/types'

import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'
import { EmptyObject } from '@/common/types'
import { Member } from '@/memberships/types'

export type FundingPeriodType = 'perpetual' | 'limited'
export type WorkingPeriodType = 'open' | 'closed'

export interface GeneralParametersContext {
  creator: Member
  title: string
  coverPhotoLink: string
  description: string
}

export interface FundingPeriodDetailsContext extends GeneralParametersContext {
  cherry: BN
  fundingPeriodType: FundingPeriodType
  fundingPeriodLength?: number
  fundingMinimalRange?: BN
  fundingMaximalRange: BN
}

export interface WorkingPeriodDetailsContext extends FundingPeriodDetailsContext {
  workingPeriodType: WorkingPeriodType
  workingPeriodLength: number
  workingPeriodWhitelist: Member[]
  workingPeriodStakeAllowance: boolean
  workingPeriodStake?: BN
}

export interface JudgingPeriodDetailsContext extends WorkingPeriodDetailsContext {
  judgingPeriodLength: number
  oracle: Member
}

export interface ForumThreadDetailsContext extends JudgingPeriodDetailsContext {
  forumThreadTopic: string
  forumThreadDescription: string
}

interface TransactionContext extends JudgingPeriodDetailsContext {
  transactionEvents?: EventRecord[]
  bountyId?: number
}

export type AddBountyContext = Partial<
  GeneralParametersContext &
    ForumThreadDetailsContext &
    WorkingPeriodDetailsContext &
    JudgingPeriodDetailsContext &
    TransactionContext
>

export enum AddBountyStates {
  requirementsVerification = 'requirementsVerification',
  requirementsFailed = 'requirementsFailed',
  generalParameters = 'generalParameters',
  fundingPeriodDetails = 'fundingPeriodDetails',
  workingPeriodDetails = 'workingPeriodDetails',
  judgingPeriodDetails = 'judgingPeriodDetails',
  forumThreadDetails = 'forumThreadDetails',
  beforeTransaction = 'beforeTransaction',
  transaction = 'transaction',
  success = 'success',
  error = 'error',
}

export type AddBountyState =
  | { value: AddBountyStates.requirementsVerification; context: EmptyObject }
  | { value: AddBountyStates.requirementsFailed; context: EmptyObject }
  | { value: AddBountyStates.generalParameters; context: GeneralParametersContext }
  | { value: AddBountyStates.fundingPeriodDetails; context: FundingPeriodDetailsContext }
  | { value: AddBountyStates.workingPeriodDetails; context: WorkingPeriodDetailsContext }
  | { value: AddBountyStates.judgingPeriodDetails; context: JudgingPeriodDetailsContext }
  | { value: AddBountyStates.forumThreadDetails; context: ForumThreadDetailsContext }
  // | { value: AddBountyStates.beforeTransaction; context: Required<AddBountyContext> }
  // | { value: 'bindStakingAccount'; context: Required<AddBountyContext> }
  | { value: AddBountyStates.transaction; context: Required<AddBountyContext> }
  | { value: AddBountyStates.success; context: Required<AddBountyContext> }
  | { value: AddBountyStates.error; context: AddBountyContext }

type SetCreatorEvent = { type: 'SET_CREATOR'; creator: Member }
type SetBountyTitleEvent = { type: 'SET_BOUNTY_TITLE'; title: string }
type SetCoverPhotoEvent = { type: 'SET_COVER_PHOTO'; coverPhotoLink: string }
type SetBountyDescriptionEvent = { type: 'SET_BOUNTY_DESCRIPTION'; description: string }
type SetCherryEvent = { type: 'SET_CHERRY'; cherry: BN }
type SetFundingPeriodTypeEvent = { type: 'SET_FUNDING_PERIOD_TYPE'; fundingPeriodType: FundingPeriodType }
type SetFundingPeriodLengthEvent = { type: 'SET_FUNDING_PERIOD_LENGTH'; fundingPeriodLength: number }
type SetFundingMinimalRangeEvent = { type: 'SET_FUNDING_MINIMAL_RANGE'; fundingMinimalRange: BN }
type SetFundingMaximalRangeEvent = { type: 'SET_FUNDING_MAXIMAL_RANGE'; fundingMaximalRange: BN }
type SetWorkingPeriodTypeEvent = { type: 'SET_WORKING_PERIOD_TYPE'; workingPeriodType: WorkingPeriodType }
type SetWorkingPeriodLengthEvent = { type: 'SET_WORKING_PERIOD_LENGTH'; workingPeriodLength: number }
type SetAllowWorkingPeriodEvent = { type: 'SET_ALLOW_WORKING_PERIOD_STAKE'; workingPeriodStakeAllowance: boolean }
type SetWorkingPeriodStakeEvent = { type: 'SET_WORKING_PERIOD_STAKE'; workingPeriodStake: BN }
type SetWorkingPeriodWhitelistEvent = { type: 'SET_WORKING_PERIOD_WHITELIST'; workingPeriodWhitelist: Member[] }
type SetJudgingPeriodLengthEvent = { type: 'SET_JUDGING_PERIOD_LENGTH'; judgingPeriodLength: number }
type SetOracleEvent = { type: 'SET_ORACLE'; oracle: Member }
type SetForumThreadTopicEvent = { type: 'SET_FORUM_THREAD_TOPIC'; forumThreadTopic: string }
type SetForumThreadDescriptionEvent = { type: 'SET_FORUM_THREAD_DESCRIPTION'; forumThreadDescription: string }

export type AddBountyEvent =
  | SetCreatorEvent
  | SetBountyTitleEvent
  | SetCoverPhotoEvent
  | SetBountyDescriptionEvent
  | SetCherryEvent
  | SetFundingPeriodTypeEvent
  | SetFundingPeriodLengthEvent
  | SetFundingMinimalRangeEvent
  | SetFundingMaximalRangeEvent
  | SetWorkingPeriodTypeEvent
  | SetWorkingPeriodLengthEvent
  | SetAllowWorkingPeriodEvent
  | SetWorkingPeriodStakeEvent
  | SetWorkingPeriodWhitelistEvent
  | SetJudgingPeriodLengthEvent
  | SetOracleEvent
  | SetForumThreadTopicEvent
  | SetForumThreadDescriptionEvent
  | { type: 'NEXT' }
  | { type: 'FAIL' }

export type AddBountyModalMachineState = State<
  AddBountyContext,
  AddBountyEvent,
  StateSchema<AddBountyContext>,
  Typestate<AddBountyContext>
>

export const addBountyMachine = createMachine<AddBountyContext, AddBountyEvent, AddBountyState>({
  initial: AddBountyStates.requirementsVerification,
  context: {
    description: '',
    fundingPeriodType: 'perpetual',
    workingPeriodType: 'open',
    workingPeriodStakeAllowance: true,
    workingPeriodWhitelist: [],
  },
  states: {
    [AddBountyStates.requirementsVerification]: {
      on: {
        FAIL: AddBountyStates.requirementsFailed,
        NEXT: AddBountyStates.generalParameters,
      },
    },
    [AddBountyStates.requirementsFailed]: { type: 'final' },
    [AddBountyStates.generalParameters]: {
      on: {
        NEXT: AddBountyStates.fundingPeriodDetails,
        SET_CREATOR: {
          actions: assign({
            creator: (context, event) => (event as SetCreatorEvent).creator,
          }),
        },
        SET_BOUNTY_TITLE: {
          actions: assign({
            title: (context, event) => (event as SetBountyTitleEvent).title,
          }),
        },
        SET_COVER_PHOTO: {
          actions: assign({
            coverPhotoLink: (context, event) => (event as SetCoverPhotoEvent).coverPhotoLink,
          }),
        },
        SET_BOUNTY_DESCRIPTION: {
          actions: assign({
            description: (context, event) => (event as SetBountyDescriptionEvent).description,
          }),
        },
      },
      meta: { isStep: true, stepTitle: 'General Parameters' },
    },
    [AddBountyStates.fundingPeriodDetails]: {
      on: {
        NEXT: AddBountyStates.workingPeriodDetails,
        SET_CHERRY: {
          actions: assign({
            cherry: (context, event) => (event as SetCherryEvent).cherry,
          }),
        },
        SET_FUNDING_PERIOD_TYPE: {
          actions: assign({
            fundingPeriodType: (context, event) => (event as SetFundingPeriodTypeEvent).fundingPeriodType,
          }),
        },
        SET_FUNDING_PERIOD_LENGTH: {
          actions: assign({
            fundingPeriodLength: (context, event) => (event as SetFundingPeriodLengthEvent).fundingPeriodLength,
          }),
        },
        SET_FUNDING_MINIMAL_RANGE: {
          actions: assign({
            fundingMinimalRange: (context, event) => (event as SetFundingMinimalRangeEvent).fundingMinimalRange,
          }),
        },
        SET_FUNDING_MAXIMAL_RANGE: {
          actions: assign({
            fundingMaximalRange: (context, event) => (event as SetFundingMaximalRangeEvent).fundingMaximalRange,
          }),
        },
      },
      meta: { isStep: true, stepTitle: 'Funding Period Details' },
    },
    [AddBountyStates.workingPeriodDetails]: {
      on: {
        NEXT: AddBountyStates.judgingPeriodDetails,
        SET_WORKING_PERIOD_TYPE: {
          actions: assign({
            workingPeriodType: (context, event) => (event as SetWorkingPeriodTypeEvent).workingPeriodType,
          }),
        },
        SET_WORKING_PERIOD_LENGTH: {
          actions: assign({
            workingPeriodLength: (context, event) => (event as SetWorkingPeriodLengthEvent).workingPeriodLength,
          }),
        },
        SET_WORKING_PERIOD_WHITELIST: {
          actions: assign({
            workingPeriodWhitelist: (context, event) =>
              (event as SetWorkingPeriodWhitelistEvent).workingPeriodWhitelist,
          }),
        },
        SET_ALLOW_WORKING_PERIOD_STAKE: {
          actions: assign({
            workingPeriodStakeAllowance: (context, event) =>
              (event as SetAllowWorkingPeriodEvent).workingPeriodStakeAllowance,
          }),
        },
        SET_WORKING_PERIOD_STAKE: {
          actions: assign({
            workingPeriodStake: (context, event) => (event as SetWorkingPeriodStakeEvent).workingPeriodStake,
          }),
        },
      },
      meta: { isStep: true, stepTitle: 'Working Period Details' },
    },
    [AddBountyStates.judgingPeriodDetails]: {
      on: {
        NEXT: AddBountyStates.forumThreadDetails,
        SET_JUDGING_PERIOD_LENGTH: {
          actions: assign({
            judgingPeriodLength: (context, event) => (event as SetJudgingPeriodLengthEvent).judgingPeriodLength,
          }),
        },
        SET_ORACLE: {
          actions: assign({
            oracle: (context, event) => (event as SetOracleEvent).oracle,
          }),
        },
      },
      meta: { isStep: true, stepTitle: 'Judging Period Details' },
    },
    [AddBountyStates.forumThreadDetails]: {
      on: {
        NEXT: AddBountyStates.transaction,
        SET_FORUM_THREAD_TOPIC: {
          actions: assign({
            forumThreadTopic: (context, event) => (event as SetForumThreadTopicEvent).forumThreadTopic,
          }),
        },
        SET_FORUM_THREAD_DESCRIPTION: {
          actions: assign({
            forumThreadDescription: (context, event) =>
              (event as SetForumThreadDescriptionEvent).forumThreadDescription,
          }),
        },
      },
      meta: { isStep: true, stepTitle: 'Forum Thread' },
    },
    transaction: {
      invoke: {
        id: 'transaction',
        src: transactionMachine,
        onDone: [
          {
            target: 'success',
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            cond: (context, event) => isTransactionSuccess(context, event),
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
