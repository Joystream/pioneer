import { OpeningMetadata } from '@joystream/metadata-protobuf'
import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine, State, Typestate } from 'xstate'
import { StateSchema } from 'xstate/lib/types'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import { metadataToBytes, getDataFromEvent } from '@/common/model/JoystreamNode'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'
import { EmptyObject } from '@/common/types'
import { GroupIdToGroupParam } from '@/working-groups/constants'
import { GroupIdName } from '@/working-groups/types'

import { CreateOpeningForm } from './types'

export interface TransactionContext extends CreateOpeningForm {
  transactionEvents?: EventRecord[]
  openingId?: number
}

/** @joystream/types/augment/augment-api-tx.d.ts

             * Add a job opening for a regular worker/lead role.
             * Require signed leader origin or the root (to add opening for the leader position).
             *
             * # <weight>
             *
             * ## Weight
             * `O (D)` where:
             * - `D` is the size of `description` in kilobytes
             * - DB:
             * - O(1) doesn't depend on the state or parameters
             * # </weight>

            addOpening: AugmentedSubmittable<(
              description: Bytes | string | Uint8Array,
              openingType: PalletWorkingGroupOpeningType | 'Leader' | 'Regular' | number | Uint8Array,
              stakePolicy: PalletWorkingGroupStakePolicy | { stakeAmount?: any; leavingUnstakingPeriod?: any; },
              rewardPerBlock: Option<u128> | null | object | string | Uint8Array)
              => SubmittableExtrinsic<ApiType>, [Bytes, PalletWorkingGroupOpeningType, PalletWorkingGroupStakePolicy, Option<u128>]>; **/

export const getTxParams = (group: GroupIdName, specifics: CreateOpeningForm) => ({
  description: metadataToBytes(OpeningMetadata, {
    title: specifics?.workingGroupAndDescription?.title,
    shortDescription: specifics?.workingGroupAndDescription?.shortDescription,
    description: specifics?.workingGroupAndDescription?.description,
    hiringLimit: 1,
    expectedEndingTimestamp: specifics?.durationAndProcess?.isLimited
      ? specifics.durationAndProcess?.duration
      : undefined,
    applicationDetails: specifics?.durationAndProcess?.details,
    applicationFormQuestions: specifics?.applicationForm?.questions?.map(({ questionField, shortValue }) => ({
      question: questionField,
      type: OpeningMetadata.ApplicationFormQuestion.InputType[shortValue ? 'TEXT' : 'TEXTAREA'],
    })),
  }),
  openingType: 'Regular',
  stakePolicy: {
    stakeAmount: specifics?.stakingPolicyAndReward?.stakingAmount,
    leavingUnstakingPeriod: specifics?.stakingPolicyAndReward?.leavingUnstakingPeriod,
  },
  rewardPerBlock: specifics?.stakingPolicyAndReward?.rewardPerBlock,
  group: GroupIdToGroupParam[group],
})

export type CreateOpeningState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'warning'; context: EmptyObject }
  | {
      value: { specificParameters: { createWorkingGroupLeadOpening: 'workingGroupAndDescription' } }
      context: Required<CreateOpeningForm>
    }
  | {
      value: { specificParameters: { createWorkingGroupLeadOpening: 'durationAndProcess' } }
      context: Required<CreateOpeningForm>
    }
  | {
      value: { specificParameters: { createWorkingGroupLeadOpening: 'applicationForm' } }
      context: Required<CreateOpeningForm>
    }
  | {
      value: { specificParameters: { createWorkingGroupLeadOpening: 'stakingPolicyAndReward' } }
      context: Required<CreateOpeningForm>
    }
  | { value: 'beforeTransaction'; context: Required<CreateOpeningForm> }
  | { value: 'transaction'; context: Required<TransactionContext> }
  | { value: 'success'; context: Required<TransactionContext> }
  | { value: 'error'; context: TransactionContext }

const isType = (type: string) => (context: any) => type === context?.type

export type CreateOpeningEvent = { type: 'FAIL' } | { type: 'BACK' } | { type: 'NEXT' }

export type CreateOpeningMachineState = State<
  Partial<TransactionContext>,
  CreateOpeningEvent,
  StateSchema<Partial<TransactionContext>>,
  Typestate<Partial<TransactionContext>>
>

export const createOpeningMachine = createMachine<Partial<TransactionContext>, CreateOpeningEvent, CreateOpeningState>({
  initial: 'requirementsVerification',
  context: {},
  states: {
    requirementsVerification: { on: { FAIL: 'requirementsFailed', NEXT: 'generalParameters' } },
    requirementsFailed: { type: 'final' },
    generalParameters: {
      on: { NEXT: 'specificParameters' },
    },
    specificParameters: {
      meta: { isStep: true, stepTitle: 'Specific parameters' },
      on: {
        BACK: 'generalParameters',
        NEXT: 'beforeTransaction',
      },
      initial: 'entry',
      states: {
        entry: {
          always: [{ target: 'createWorkingGroupLeadOpening', cond: isType('createWorkingGroupLeadOpening') }],
        },
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
      },
    },
    beforeTransaction: {
      id: 'beforeTransaction',
      on: {
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
