import { EventRecord } from '@polkadot/types/interfaces/system'
import BN from 'bn.js'
import { assign, createMachine, State, Typestate } from 'xstate'
import { StateSchema } from 'xstate/lib/types'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'

export interface GeneralParametersContext {
  workTitle: string
  workDescription: string
}

interface TransactionContext {
  transactionEvents?: EventRecord[]
}

export type SubmitWorkContext = GeneralParametersContext & TransactionContext

export enum SubmitWorkStates {
  generalParameters = 'generalParameters',
  transaction = 'transaction',
  success = 'success',
  error = 'error',
  cancel = 'cancel',
}

type SubmitWorkState =
  | { value: SubmitWorkStates.generalParameters; context: GeneralParametersContext }
  | { value: SubmitWorkStates.transaction; context: SubmitWorkContext }
  | { value: SubmitWorkStates.success; context: Required<SubmitWorkContext> }
  | { value: SubmitWorkStates.error; context: Required<SubmitWorkContext> }
  | { value: SubmitWorkStates.cancel; context: SubmitWorkContext }

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

type SetWorkTitleEvent = { type: 'SET_WORK_TITLE'; workTitle: string }
type SetEntryDescriptionEvent = { type: 'SET_WORK_DESCRIPTION'; workDescription: string }

export type SubmitWorkEvent =
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
  context: {
    workTitle: '',
    workDescription: '',
  },
  states: {
    [SubmitWorkStates.generalParameters]: {
      on: {
        NEXT: SubmitWorkStates.transaction,
        SET_WORK_TITLE: {
          actions: assign({
            workTitle: (context, event) => (event as SetWorkTitleEvent).workTitle,
          }),
        },
        SET_WORK_DESCRIPTION: {
          actions: assign({
            workDescription: (context, event) => (event as SetEntryDescriptionEvent).workDescription,
          }),
        },
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
    ...transactionModalFinalStatusesFactory({
      metaMessages: {
        error: 'There was a problem submitting your work.',
        success: 'You have just successfully submitted a work!',
      },
    }),
  },
})
