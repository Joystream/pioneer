import { U64 } from '@polkadot/types'
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
import { isDefined } from '@/common/utils'

interface JudgingPeriodContext {
  threadCategoryId?: string
}

interface TransactionContext extends JudgingPeriodContext {
  transactionEvents?: EventRecord[]
  bountyId?: number
  newThreadId?: U64
}

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
  | { value: AddBountyStates.generalParameters; context: EmptyObject }
  | { value: AddBountyStates.fundingPeriodDetails; context: EmptyObject }
  | { value: AddBountyStates.workingPeriodDetails; context: EmptyObject }
  | { value: AddBountyStates.judgingPeriodDetails; context: Required<JudgingPeriodContext> }
  | { value: AddBountyStates.createThread; context: EmptyObject }
  | { value: AddBountyStates.transaction; context: Required<TransactionContext> }
  | { value: AddBountyStates.success; context: Required<TransactionContext> }
  | { value: AddBountyStates.error; context: TransactionContext }
  | { value: AddBountyStates.canceled; context: TransactionContext }

type SetThreadCategoryIdEvent = { type: 'SET_THREAD_CATEGORY_ID'; threadCategoryId?: string }

export type AddBountyEvent = SetThreadCategoryIdEvent | { type: 'NEXT' } | { type: 'FAIL' } | { type: 'BACK' }

export type AddBountyModalMachineState = State<
  TransactionContext,
  AddBountyEvent,
  StateSchema<TransactionContext>,
  Typestate<TransactionContext>
>

export const addBountyMachine = createMachine<TransactionContext, AddBountyEvent, AddBountyState>({
  initial: AddBountyStates.requirementsVerification,
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
      },
      meta: { isStep: true, stepTitle: 'General Parameters' },
    },
    [AddBountyStates.fundingPeriodDetails]: {
      on: {
        BACK: AddBountyStates.generalParameters,
        NEXT: AddBountyStates.workingPeriodDetails,
      },
      meta: { isStep: true, stepTitle: 'Funding Period Details' },
    },
    [AddBountyStates.workingPeriodDetails]: {
      on: {
        BACK: AddBountyStates.fundingPeriodDetails,
        NEXT: AddBountyStates.judgingPeriodDetails,
      },
      meta: { isStep: true, stepTitle: 'Working Period Details' },
    },
    [AddBountyStates.judgingPeriodDetails]: {
      on: {
        BACK: AddBountyStates.workingPeriodDetails,
        NEXT: [
          { target: AddBountyStates.createThread, cond: (context) => isDefined(context.threadCategoryId) },
          { target: AddBountyStates.transaction },
        ],
        SET_THREAD_CATEGORY_ID: {
          actions: assign({
            threadCategoryId: (context, event) => (event as SetThreadCategoryIdEvent).threadCategoryId,
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
            actions: assign({
              // bountyId: (_, event) => Number(getDataFromEvent(event.data.events, 'bounty', 'BountyCreated') ?? -1),
            }),
            cond: (context, event) => isTransactionSuccess(context, event),
          },
          {
            target: [AddBountyStates.error],
            actions: assign({ transactionEvents: (_, event) => event.data.events }),
            cond: isTransactionError,
          },
          {
            target: [AddBountyStates.canceled],
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    ...transactionModalFinalStatusesFactory({ metaMessages: { error: 'There was a problem while creating bounty.' } }),
  },
})
