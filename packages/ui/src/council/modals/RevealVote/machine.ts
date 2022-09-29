import { EventRecord } from '@polkadot/types/interfaces'
import { assign, createMachine, State } from 'xstate'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import { isTransactionError, isTransactionSuccess, transactionMachine } from '@/common/model/machines'
import { VotingAttempt } from '@/council/hooks/useCommitment'

interface RevealVoteContext {
  vote: VotingAttempt
  transactionEvents?: EventRecord[]
}

type RevealVoteState =
  | { value: 'voteChoice'; context: Partial<RevealVoteContext> }
  | { value: 'requirementsVerification'; context: RevealVoteContext }
  | { value: 'requirementsFailed'; context: RevealVoteContext }
  | { value: 'transaction'; context: RevealVoteContext }
  | { value: 'success'; context: RevealVoteContext }
  | { value: 'error'; context: RevealVoteContext }

type FailEvent = { type: 'FAIL' }
type PassEvent = { type: 'PASS' }
type VotePickedEvent = { type: 'PICKED'; vote: VotingAttempt }
type RevealVoteEvent = FailEvent | PassEvent | VotePickedEvent

export type SendVotePicked = (
  event: VotePickedEvent['type'],
  payload: { vote: VotePickedEvent['vote'] }
) => State<Partial<RevealVoteContext>, RevealVoteEvent, any, RevealVoteState>

export const RevealVoteMachine = createMachine<Partial<RevealVoteContext>, RevealVoteEvent, RevealVoteState>({
  initial: 'voteChoice',
  states: {
    voteChoice: {
      on: {
        PICKED: {
          target: 'requirementsVerification',
          actions: assign({ vote: (_, event) => event.vote }),
        },
      },
    },

    requirementsVerification: {
      on: {
        FAIL: 'requirementsFailed',
        PASS: 'transaction',
      },
    },

    requirementsFailed: { type: 'final' },

    transaction: {
      invoke: {
        id: 'transaction',
        src: transactionMachine,
        onDone: [
          {
            target: 'success',
            cond: isTransactionSuccess,
          },
          {
            target: 'error',
            actions: assign({ transactionEvents: (_, event) => event.data.events }),
            cond: isTransactionError,
          },
        ],
      },
    },
    ...transactionModalFinalStatusesFactory({
      metaMessages: {
        error: 'There was a problem revealing your vote.',
      },
    }),
  },
})
