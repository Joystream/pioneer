import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

import { Account } from '@/accounts/types'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'
import { EmptyObject } from '@/common/types'

interface ContributeContext {
  bountyId?: string
  stakingAccount?: Account
  amount?: number
}

interface TransactionContext {
  transactionEvents?: EventRecord[]
}

export enum ContributeFundStates {
  requirementsVerification = 'requirementsVerification',
  contribute = 'contribute',
  transaction = 'transaction',
  success = 'success',
  error = 'error',
  cancel = 'cancel',
}

export type ContributeFundContext = ContributeContext | TransactionContext

type NextEvent = { type: 'NEXT' }

export type ContributeFundEvents = NextEvent

export type ContributeFundsState =
  | { value: ContributeFundStates.requirementsVerification; context: EmptyObject }
  | { value: ContributeFundStates.contribute; context: Required<ContributeContext> }
  | { value: ContributeFundStates.transaction; context: EmptyObject }
  | { value: ContributeFundStates.success; context: EmptyObject }
  | { value: ContributeFundStates.cancel; context: EmptyObject }
  | { value: ContributeFundStates.error; context: Required<TransactionContext> }

export const contributeFundsMachine = createMachine<ContributeFundContext, ContributeFundEvents, ContributeFundsState>({
  initial: 'requirementsVerification',
  states: {
    [ContributeFundStates.requirementsVerification]: {
      on: {
        NEXT: ContributeFundStates.contribute,
      },
    },
    [ContributeFundStates.contribute]: {
      id: ContributeFundStates.contribute,
      on: {
        NEXT: ContributeFundStates.transaction,
      },
    },
    [ContributeFundStates.transaction]: {
      invoke: {
        id: ContributeFundStates.transaction,
        src: transactionMachine,
        onDone: [
          {
            target: ContributeFundStates.success,
            cond: isTransactionSuccess,
          },
          {
            target: ContributeFundStates.error,
            cond: isTransactionError,
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
          },
          {
            target: ContributeFundStates.cancel,
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    [ContributeFundStates.success]: { type: 'final' },
    [ContributeFundStates.error]: { type: 'final' },
    [ContributeFundStates.cancel]: { type: 'final' },
  },
})
