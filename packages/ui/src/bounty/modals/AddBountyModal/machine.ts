import { ThreadId } from '@joystream/types/common'
import { EventRecord } from '@polkadot/types/interfaces/system'
import BN from 'bn.js'
import { assign, createMachine, State, Typestate } from 'xstate'
import { StateSchema } from 'xstate/lib/types'

import { getDataFromEvent } from '@/common/model/JoystreamNode'
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
  fundingPeriodLength?: BN
  fundingMinimalRange?: BN
  fundingMaximalRange: BN
}

export interface WorkingPeriodDetailsContext extends FundingPeriodDetailsContext {
  workingPeriodType: WorkingPeriodType
  workingPeriodLength: BN
  workingPeriodWhitelist: Member[]
  workingPeriodStake?: BN
}

export interface JudgingPeriodDetailsContext extends WorkingPeriodDetailsContext {
  judgingPeriodLength: BN
  oracle: Member
}

interface TransactionContext extends JudgingPeriodDetailsContext {
  transactionEvents?: EventRecord[]
  bountyId?: number
  newThreadId?: ThreadId
}

export type AddBountyContext = Partial<
  GeneralParametersContext & WorkingPeriodDetailsContext & JudgingPeriodDetailsContext & TransactionContext
>

export enum AddBountyStates {
  requirementsVerification = 'requirementsVerification',
  requirementsFailed = 'requirementsFailed',
  generalParameters = 'generalParameters',
  fundingPeriodDetails = 'fundingPeriodDetails',
  workingPeriodDetails = 'workingPeriodDetails',
  judgingPeriodDetails = 'judgingPeriodDetails',
  beforeTransaction = 'beforeTransaction',
  createThread = 'createThread',
  transaction = 'transaction',
  success = 'success',
  error = 'error',
  canceled = 'canceled',
}

export type AddBountyState =
  | { value: AddBountyStates.requirementsVerification; context: EmptyObject }
  | { value: AddBountyStates.requirementsFailed; context: EmptyObject }
  | { value: AddBountyStates.generalParameters; context: GeneralParametersContext }
  | { value: AddBountyStates.fundingPeriodDetails; context: FundingPeriodDetailsContext }
  | { value: AddBountyStates.workingPeriodDetails; context: WorkingPeriodDetailsContext }
  | { value: AddBountyStates.judgingPeriodDetails; context: JudgingPeriodDetailsContext }
  | { value: AddBountyStates.createThread; context: Required<AddBountyContext> }
  | { value: AddBountyStates.transaction; context: Required<AddBountyContext> }
  | { value: AddBountyStates.success; context: Required<AddBountyContext> }
  | { value: AddBountyStates.error; context: AddBountyContext }
  | { value: AddBountyStates.canceled; context: AddBountyContext }

type SetCreatorEvent = { type: 'SET_CREATOR'; creator: Member }
type SetBountyTitleEvent = { type: 'SET_BOUNTY_TITLE'; title: string }
type SetCoverPhotoEvent = { type: 'SET_COVER_PHOTO'; coverPhotoLink: string }
type SetBountyDescriptionEvent = { type: 'SET_BOUNTY_DESCRIPTION'; description: string }
type SetCherryEvent = { type: 'SET_CHERRY'; cherry: BN }
type SetFundingPeriodTypeEvent = { type: 'SET_FUNDING_PERIOD_TYPE'; fundingPeriodType: FundingPeriodType }
type SetFundingPeriodLengthEvent = { type: 'SET_FUNDING_PERIOD_LENGTH'; fundingPeriodLength: BN }
type SetFundingMinimalRangeEvent = { type: 'SET_FUNDING_MINIMAL_RANGE'; fundingMinimalRange: BN }
type SetFundingMaximalRangeEvent = { type: 'SET_FUNDING_MAXIMAL_RANGE'; fundingMaximalRange: BN }
type SetWorkingPeriodTypeEvent = { type: 'SET_WORKING_PERIOD_TYPE'; workingPeriodType: WorkingPeriodType }
type SetWorkingPeriodLengthEvent = { type: 'SET_WORKING_PERIOD_LENGTH'; workingPeriodLength: BN }
type SetWorkingPeriodStakeEvent = { type: 'SET_WORKING_PERIOD_STAKE'; workingPeriodStake: BN }
type SetWorkingPeriodWhitelistEvent = { type: 'SET_WORKING_PERIOD_WHITELIST'; workingPeriodWhitelist: Member[] }
type SetJudgingPeriodLengthEvent = { type: 'SET_JUDGING_PERIOD_LENGTH'; judgingPeriodLength: BN }
type SetOracleEvent = { type: 'SET_ORACLE'; oracle: Member }

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
  | SetWorkingPeriodStakeEvent
  | SetWorkingPeriodWhitelistEvent
  | SetJudgingPeriodLengthEvent
  | SetOracleEvent
  | { type: 'NEXT' }
  | { type: 'FAIL' }
  | { type: 'BACK' }

export type AddBountyModalMachineState = State<
  AddBountyContext,
  AddBountyEvent,
  StateSchema<AddBountyContext>,
  Typestate<AddBountyContext>
>

export const addBountyMachine = createMachine<AddBountyContext, AddBountyEvent, AddBountyState>({
  initial: AddBountyStates.requirementsVerification,
  context: {
    title: '',
    coverPhotoLink: '',
    description: '',
    fundingPeriodType: 'perpetual',
    workingPeriodType: 'open',
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
        BACK: AddBountyStates.generalParameters,
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
        BACK: AddBountyStates.fundingPeriodDetails,
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
        BACK: AddBountyStates.workingPeriodDetails,
        NEXT: AddBountyStates.createThread,
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
    [AddBountyStates.createThread]: {
      invoke: {
        id: AddBountyStates.createThread,
        src: transactionMachine,
        onDone: [
          {
            target: [AddBountyStates.transaction],
            actions: assign({
              newThreadId: (_, event) => getDataFromEvent(event.data.events, 'forum', 'ThreadCreated', 1),
            }),
            cond: (context, event) => isTransactionSuccess(context, event),
          },
          {
            target: [AddBountyStates.error],
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            cond: isTransactionError,
          },
          {
            target: [AddBountyStates.canceled],
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    [AddBountyStates.transaction]: {
      invoke: {
        id: AddBountyStates.transaction,
        src: transactionMachine,
        onDone: [
          {
            target: [AddBountyStates.success],
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            cond: (context, event) => isTransactionSuccess(context, event),
          },
          {
            target: [AddBountyStates.error],
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            cond: isTransactionError,
          },
          {
            target: [AddBountyStates.canceled],
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    [AddBountyStates.success]: { type: 'final' },
    [AddBountyStates.error]: { type: 'final' },
    [AddBountyStates.canceled]: { type: 'final' },
  },
})
