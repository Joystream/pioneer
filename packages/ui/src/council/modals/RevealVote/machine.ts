import { EventRecord } from '@polkadot/types/interfaces'
import { assign, createMachine } from 'xstate'

import { isTransactionError, isTransactionSuccess, transactionMachine } from '@/common/model/machines'
import { EmptyObject } from '@/common/types'

interface RevealVoteContext {
  transactionEvents?: EventRecord[]
}

type RevealVoteState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'transaction'; context: EmptyObject }
  | { value: 'success'; context: EmptyObject }
  | { value: 'error'; context: EmptyObject }

type FailEvent = { type: 'FAIL' }
type PassEvent = { type: 'PASS' }
type RevealVoteEvent = FailEvent | PassEvent

export const RevealVoteMachine = createMachine<Partial<RevealVoteContext>, RevealVoteEvent, RevealVoteState>({
  initial: 'requirementsVerification',
  states: {
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

    success: { type: 'final' },

    error: { type: 'final' },
  },
})
