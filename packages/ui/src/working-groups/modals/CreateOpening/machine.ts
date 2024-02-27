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

import { CreateOpeningForm, TransactionContext } from './types'

export type CreateOpeningState =
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'workingGroupAndDescription'; context: Required<CreateOpeningForm> }
  | { value: 'durationAndProcess'; context: Required<CreateOpeningForm> }
  | { value: 'applicationForm'; context: Required<CreateOpeningForm> }
  | { value: 'stakingPolicyAndReward'; context: Required<CreateOpeningForm> }
  | { value: 'beforeTransaction'; context: Required<CreateOpeningForm> }
  | { value: 'transaction'; context: Required<TransactionContext> }
  | { value: 'success'; context: Required<TransactionContext> }
  | { value: 'error'; context: TransactionContext }

export type CreateOpeningEvent = { type: 'FAIL' } | { type: 'BACK' } | { type: 'NEXT' }

export type CreateOpeningMachineState = State<
  Partial<TransactionContext>,
  CreateOpeningEvent,
  StateSchema<Partial<TransactionContext>>,
  Typestate<Partial<TransactionContext>>
>

type Context = CreateOpeningForm & TransactionContext

export const createOpeningMachine = createMachine<Partial<Context>, CreateOpeningEvent, CreateOpeningState>({
  initial: 'workingGroupAndDescription',
  states: {
    requirementsFailed: { type: 'final' },
    workingGroupAndDescription: {
      meta: {
        isStep: true,
        stepTitle: 'Working group & Description',
      },
      on: {
        NEXT: 'durationAndProcess',
      },
    },
    durationAndProcess: {
      meta: {
        isStep: true,
        stepTitle: 'Duration & Process',
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
      },
      on: {
        BACK: 'applicationForm',
        NEXT: 'beforeTransaction',
      },
    },
    beforeTransaction: {
      id: 'beforeTransaction',
      on: {
        NEXT: 'transaction',
        FAIL: 'requirementsFailed',
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
              openingId: (_, event) =>
                Number(getDataFromEvent(event.data.events, event.data.section, 'OpeningCreated') ?? -1),
            }),
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
    ...transactionModalFinalStatusesFactory(),
  },
})
