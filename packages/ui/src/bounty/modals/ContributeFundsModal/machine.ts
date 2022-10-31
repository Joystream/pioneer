import { EventRecord } from '@polkadot/types/interfaces/system'
import BN from 'bn.js'
import { assign, createMachine } from 'xstate'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'
import { EmptyObject } from '@/common/types'

interface ContributeContext {
  amount: BN
}

interface TransactionContext extends ContributeContext {
  transactionEvents?: EventRecord[]
}

type ContributeFundsMachineContext = Partial<ContributeContext | TransactionContext>

export enum ContributeFundStates {
  requirementsVerification = 'requirementsVerification',
  requirementsFailed = 'requirementsFailed',
  contribute = 'contribute',
  transaction = 'transaction',
  success = 'success',
  error = 'error',
  cancel = 'cancel',
}

type NextEvent = { type: 'NEXT' } | { type: 'FAIL' }
type SetAmountEvent = { type: 'SET_AMOUNT'; amount: BN }

export type ContributeFundEvents = NextEvent | SetAmountEvent

export type ContributeFundsState =
  | { value: ContributeFundStates.requirementsVerification; context: EmptyObject }
  | { value: ContributeFundStates.requirementsFailed; context: EmptyObject }
  | { value: ContributeFundStates.contribute; context: Required<ContributeContext> }
  | { value: ContributeFundStates.transaction; context: EmptyObject }
  | { value: ContributeFundStates.success; context: EmptyObject }
  | { value: ContributeFundStates.cancel; context: EmptyObject }
  | { value: ContributeFundStates.error; context: Required<TransactionContext> }

export const contributeFundsMachine = createMachine<
  ContributeFundsMachineContext,
  ContributeFundEvents,
  ContributeFundsState
>({
  initial: 'requirementsVerification',
  states: {
    [ContributeFundStates.requirementsVerification]: {
      on: {
        NEXT: ContributeFundStates.contribute,
        FAIL: ContributeFundStates.requirementsFailed,
      },
    },
    [ContributeFundStates.requirementsFailed]: {
      type: 'final',
    },
    [ContributeFundStates.contribute]: {
      id: ContributeFundStates.contribute,
      on: {
        SET_AMOUNT: {
          actions: assign({
            amount: (context, event) => (event as SetAmountEvent).amount,
          }),
        },
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
    ...transactionModalFinalStatusesFactory({
      metaMessages: {
        error: 'There was a problem while performing the contribution.',
      },
    }),
  },
})
