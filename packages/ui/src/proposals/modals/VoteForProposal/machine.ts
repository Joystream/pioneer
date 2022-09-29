import { EventRecord } from '@polkadot/types/interfaces'
import { assign, createMachine } from 'xstate'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'

export interface VoteContext {
  voteStatus?: VoteStatus
  rationale?: string
}

interface FinalContext extends Required<VoteContext> {
  transactionEvents: EventRecord[]
}

type VoteForProposalState =
  | { value: 'vote'; context: VoteContext }
  | { value: 'requirementsVerification'; context: VoteContext }
  | { value: 'requirementsFailed'; context: VoteContext }
  | { value: 'transaction'; context: FinalContext }
  | { value: 'success'; context: FinalContext }
  | { value: 'error'; context: FinalContext }

type PassEvent = { type: 'PASS' }
type SetRationaleEvent = { type: 'SET_RATIONALE'; rationale: string }
type VerificationEvent = { type: 'NEXT' } | { type: 'FAIL' }
export type VoteForProposalEvent = PassEvent | SetRationaleEvent | SetVoteStatus | VerificationEvent
export type VoteStatus = 'Approve' | 'Reject' | 'Slash' | 'Abstain'
type SetVoteStatus = { type: 'SET_VOTE_STATUS'; status: VoteStatus }

export const VoteForProposalMachine = createMachine<Partial<FinalContext>, VoteForProposalEvent, VoteForProposalState>({
  initial: 'requirementsVerification',
  states: {
    requirementsVerification: {
      on: {
        NEXT: 'vote',
        FAIL: 'requirementsFailed',
      },
    },
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
          {
            target: 'canceled',
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    requirementsFailed: { type: 'final' },
    ...transactionModalFinalStatusesFactory({
      cancel: {
        target: 'vote',
        action: 'NEXT',
      },
    }),
  },
})
