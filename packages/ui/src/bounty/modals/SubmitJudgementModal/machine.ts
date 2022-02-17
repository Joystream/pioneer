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
  id: number
  reward?: number
  winner?: Member
}

export interface BountyRejected {
  id: number
  rejected?: Member
}

export interface GeneralParametersContext {
  hasWinner: boolean
  winners: BountyWinner[]
  rejected: BountyRejected[]
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
type AddWinnerEvent = { type: 'ADD_WINNER' }
type AddSlashedEvent = { type: 'ADD_SLASHED' }
type EditWinnerEvent = { type: 'EDIT_WINNER'; payload: { id: number; winner: Partial<BountyWinner> } }
type EditRejectedEvent = { type: 'EDIT_REJECTED'; payload: { id: number; rejected: Member } }

export type SubmitJudgementEvent =
  | SetHasWinnerEvent
  | AddWinnerEvent
  | AddSlashedEvent
  | EditWinnerEvent
  | EditRejectedEvent
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
      winners: [
        {
          id: 0,
          reward: 0,
        },
      ],
      rejected: [],
    },
    states: {
      [SubmitJudgementStates.generalParameters]: {
        on: {
          NEXT: SubmitJudgementStates.transaction,
          ADD_WINNER: {
            actions: assign({
              winners: (context) =>
                context.winners ? [...context.winners, { id: context.winners.length, reward: 0 }] : [{ id: 0 }],
            }),
          },
          CLEAN_WINNERS: {
            actions: assign({
              winners: (context) => context.winners && [],
            }),
          },
          ADD_SLASHED: {
            actions: assign({
              rejected: (context) => [...context.rejected, { id: context.rejected.length }],
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
          EDIT_WINNER: {
            actions: assign({
              winners: (context, event) =>
                context.winners.map((winner) => {
                  if (winner.id === (event as EditWinnerEvent).payload.id) {
                    winner = { ...winner, ...(event as EditWinnerEvent).payload.winner }
                    return winner
                  }

                  return winner
                }),
            }),
          },
          EDIT_REJECTED: {
            actions: assign({
              rejected: (context, event) =>
                context.rejected.map((loser) => {
                  if (loser.id === (event as EditRejectedEvent).payload.id) {
                    loser = { ...loser, rejected: (event as EditRejectedEvent).payload.rejected }
                    return loser
                  }

                  return loser
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
