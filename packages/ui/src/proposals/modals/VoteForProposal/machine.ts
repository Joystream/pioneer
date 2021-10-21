import { EventRecord } from '@polkadot/types/interfaces'
import { assign, createMachine } from 'xstate'

import { isTransactionError, isTransactionSuccess, transactionMachine } from '@/common/model/machines'

interface VoteContext {
  voteStatus?: VoteStatus
  rationale?: string
}

interface FinalContext extends Required<VoteContext> {
  transactionEvents: EventRecord[]
}

type VoteForProposalState =
  | { value: 'vote'; context: VoteContext }
  | { value: 'transaction'; context: FinalContext }
  | { value: 'success'; context: FinalContext }
  | { value: 'error'; context: FinalContext }

type FailEvent = { type: 'FAIL' }
type PassEvent = { type: 'PASS' }
type SetRationaleEvent = { type: 'SET_RATIONALE'; rationale: string }
type VoteForProposalEvent = FailEvent | PassEvent | SetRationaleEvent | SetVoteStatus
export type VoteStatus = 'Approve' | 'Reject' | 'Slash' | 'Abstain'
type SetVoteStatus = { type: 'SET_VOTE_STATUS'; status: VoteStatus }

export const VoteForProposalMachine = createMachine<Partial<FinalContext>, VoteForProposalEvent, VoteForProposalState>({
  initial: 'vote',
  states: {
    vote: {
      on: {
        SET_VOTE_STATUS: {
          actions: assign({ voteStatus: (_, event) => event.status }),
        },
        SET_RATIONALE: {
          actions: assign({ rationale: (_, event) => event.rationale }),
        },
        PASS: {
          target: 'transaction',
          cond: (context) => !!context.voteStatus && !!context.rationale,
        },
      },
    },
    transaction: {
      invoke: {
        id: 'transaction',
        src: transactionMachine,
        onDone: [
          {
            target: 'success',
            actions: assign({ transactionEvents: (_, event) => event.data.events }),
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
    success: { type: 'final' },
    error: { type: 'final' },
  },
})
