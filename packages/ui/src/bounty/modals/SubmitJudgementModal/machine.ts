import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine, State, Typestate } from 'xstate'
import { StateSchema } from 'xstate/lib/types'

import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'
import { Member } from '@/memberships/types'

export interface BountyWinner {
  reward: number
  winner: Member
}

export interface GeneralParametersContext {
  hasWinner: boolean
  winners: BountyWinner[]
  rejected: Member[]
}

interface TransactionContext extends GeneralParametersContext {
  transactionEvents?: EventRecord[]
}

export type SubmitJudgementContext = TransactionContext & GeneralParametersContext

export enum SubmitJudgementStates {
  generalParameters = 'generalParameters',
  transaction = 'transaction',
  success = 'success',
  error = 'error',
  canceled = 'canceled',
}

export type SubmitJudgementState =
  | { value: SubmitJudgementStates.generalParameters; context: GeneralParametersContext }
  | { value: SubmitJudgementStates.transaction; context: Required<SubmitJudgementContext> }
  | { value: SubmitJudgementStates.success; context: Required<SubmitJudgementContext> }
  | { value: SubmitJudgementStates.error; context: SubmitJudgementContext }
  | { value: SubmitJudgementStates.canceled; context: SubmitJudgementContext }

type SetHasWinnerEvent = { type: 'SET_HAS_WINNER'; hasWinner: boolean }
type AddWinnerEvent = { type: 'ADD_WINNER'; winner: BountyWinner }
type AddSlashedEvent = { type: 'ADD_SLASHED'; slashed: Member }
type EditWinnerRewardEvent = { type: 'EDIT_WINNER_REWARD'; payload: { reward: number; winner: Member } }

export type SubmitJudgementEvent =
  | SetHasWinnerEvent
  | AddWinnerEvent
  | AddSlashedEvent
  | EditWinnerRewardEvent
  | { type: 'CLEAN_WINNERS' }
  | { type: 'REMOVE_LAST_SLASHED' }
  | { type: 'REMOVE_LAST_WINNER' }
  | { type: 'NEXT' }
  | { type: 'FAIL' }

export type SubmitJudgementModalMachineState = State<
  SubmitJudgementContext,
  SubmitJudgementEvent,
  StateSchema<SubmitJudgementContext>,
  Typestate<SubmitJudgementContext>
>

export const submitJudgementMachine = createMachine<SubmitJudgementContext, SubmitJudgementEvent, SubmitJudgementState>(
  {
    initial: SubmitJudgementStates.generalParameters,
    context: {
      hasWinner: true,
      winners: [],
      rejected: [],
    },
    states: {
      [SubmitJudgementStates.generalParameters]: {
        on: {
          NEXT: SubmitJudgementStates.transaction,
          ADD_WINNER: {
            actions: assign({
              winners: (context, event) =>
                context.winners
                  ? [...context.winners, (event as AddWinnerEvent).winner]
                  : [(event as AddWinnerEvent).winner],
            }),
          },
          CLEAN_WINNERS: {
            actions: assign({
              winners: (context) => context.winners && [],
            }),
          },
          ADD_SLASHED: {
            actions: assign({
              rejected: (context, event) =>
                context.rejected
                  ? [...context.rejected, (event as AddSlashedEvent).slashed]
                  : [(event as AddSlashedEvent).slashed],
            }),
          },
          REMOVE_LAST_WINNER: {
            actions: assign({
              winners: (context) => {
                const newWinners = context.winners ? [...context.winners] : []
                newWinners.pop()
                return newWinners
              },
            }),
          },
          REMOVE_LAST_SLASHED: {
            actions: assign({
              rejected: (context) => {
                const newRejected = context.rejected ? [...context.rejected] : []
                newRejected.pop()
                return newRejected
              },
            }),
          },
          SET_HAS_WINNER: {
            actions: assign({
              hasWinner: (_, event) => (event as SetHasWinnerEvent).hasWinner,
            }),
          },
          EDIT_WINNER_REWARD: {
            actions: assign({
              winners: (context, event) =>
                context.winners.map((winner) => {
                  if (winner.winner.id === (event as EditWinnerRewardEvent).payload.winner.id) {
                    winner.reward = (event as EditWinnerRewardEvent).payload.reward
                    return winner
                  }

                  return winner
                }),
            }),
          },
        },
      },
      [SubmitJudgementStates.transaction]: {
        invoke: {
          id: SubmitJudgementStates.transaction,
          src: transactionMachine,
          onDone: [
            {
              target: [SubmitJudgementStates.success],
              actions: assign({ transactionEvents: (context, event) => event.data.events }),
              cond: (context, event) => isTransactionSuccess(context, event),
            },
            {
              target: [SubmitJudgementStates.error],
              actions: assign({ transactionEvents: (context, event) => event.data.events }),
              cond: isTransactionError,
            },
            {
              target: [SubmitJudgementStates.canceled],
              cond: isTransactionCanceled,
            },
          ],
        },
      },
      [SubmitJudgementStates.success]: { type: 'final' },
      [SubmitJudgementStates.error]: { type: 'final' },
      [SubmitJudgementStates.canceled]: { type: 'final' },
    },
  }
)
