import { EventRecord } from '@polkadot/types/interfaces'
import { assign, createMachine } from 'xstate'

import { Account } from '@/accounts/types'
import { isTransactionError, isTransactionSuccess, transactionMachine } from '@/common/model/machines'
import { EmptyObject } from '@/common/types'

interface TransactionData {
  salt: string
  candidateId: string
  signer: Account
}

interface RevealVoteContext {
  transactionData: TransactionData
  transactionEvents?: EventRecord[]
}

type RevealVoteState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'transaction'; context: RevealVoteContext }
  | { value: 'success'; context: RevealVoteContext }
  | { value: 'error'; context: RevealVoteContext }

type FailEvent = { type: 'FAIL' }
type PassEvent = { type: 'PASS', transactionData: TransactionData }
type RevealVoteEvent = FailEvent | PassEvent

export const RevealVoteMachine = createMachine<Partial<RevealVoteContext>, RevealVoteEvent, RevealVoteState>({
  initial: 'requirementsVerification',
  states: {
    requirementsVerification: {
      on: {
        FAIL: 'requirementsFailed',
        PASS: {
          target: 'transaction',
          actions: assign({ transactionData: (_, event) => event.transactionData })
        }
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
