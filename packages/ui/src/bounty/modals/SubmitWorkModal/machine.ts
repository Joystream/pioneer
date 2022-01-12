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

export interface GeneralParametersContext {
  bountyId: string
  memberId?: string
  workTitle: string
  workDescription: string
}

interface TransactionContext {
  transactionEvents?: EventRecord[]
}

export type SubmitWorkContext = Partial<GeneralParametersContext & TransactionContext>

export enum SubmitWorkStates {
  generalParameters = 'generalParameters',
  transaction = 'transaction',
  success = 'success',
  error = 'error',
  cancel = 'cancel',
}

type SubmitWorkState =
  | { value: SubmitWorkStates.generalParameters; context: GeneralParametersContext }
  | { value: SubmitWorkStates.transaction; context: EmptyObject }
  | { value: SubmitWorkStates.success; context: Required<SubmitWorkContext> }
  | { value: SubmitWorkStates.error; context: Required<SubmitWorkContext> }
  | { value: SubmitWorkStates.cancel; context: EmptyObject }

type SuccessEvent = {
  type: 'SUCCESS'
  events: EventRecord[]
  fee: BN
}

type ErrorEvent = {
  type: 'ERROR'
  events: EventRecord[]
  fee: BN
}

type SetBountyIdEvent = { type: 'SET_BOUNTY_ID'; bountyId: string }
type SetMemberIdEvent = { type: 'SET_MEMBER_ID'; MemberId: string }
type SetWorkTitleEvent = { type: 'SET_WORK_TITLE'; workTitle: string }
type SetEntryDescriptionEvent = { type: 'SET_WORK_DESCRIPTION'; workDescription: string }

export type SubmitWorkEvent =
  | SetBountyIdEvent
  | SetMemberIdEvent
  | SetWorkTitleEvent
  | SetEntryDescriptionEvent
  | SuccessEvent
  | ErrorEvent
  | { type: 'NEXT' }
  | { type: 'FAIL' }

export type SubmitWorkModalMachineState = State<
  SubmitWorkContext,
  SubmitWorkEvent,
  StateSchema<SubmitWorkContext>,
  Typestate<SubmitWorkContext>
>

export const submitWorkMachine = createMachine<SubmitWorkContext, SubmitWorkEvent, SubmitWorkState>({
  initial: SubmitWorkStates.generalParameters,
  states: {
    [SubmitWorkStates.generalParameters]: {
      on: {
        NEXT: SubmitWorkStates.transaction,
      },
    },
    [SubmitWorkStates.transaction]: {
      invoke: {
        id: SubmitWorkStates.transaction,
        src: transactionMachine,
        onDone: [
          {
            target: SubmitWorkStates.success,
            cond: isTransactionSuccess,
            actions: assign({ transactionEvents: (_, event) => event.data.events }),
          },
          {
            target: SubmitWorkStates.error,
            cond: isTransactionError,
            actions: assign({ transactionEvents: (_, event) => event.data.events }),
          },
          {
            target: SubmitWorkStates.cancel,
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    [SubmitWorkStates.success]: { type: 'final' },
    [SubmitWorkStates.error]: { type: 'final' },
    [SubmitWorkStates.cancel]: { type: 'final' },
  },
})
