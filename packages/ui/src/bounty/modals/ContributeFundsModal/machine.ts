import { EventRecord } from '@polkadot/types/interfaces/system';
import { assign, createMachine } from 'xstate';

import { Account } from '@/accounts/types';
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine
} from '@/common/model/machines';
import { EmptyObject } from '@/common/types';

interface ContributeContext {
  bountyId?: string;
  stakingAccount?: Account;
  amount?: number;
}

interface AuthorizeContext {
  feeAccount?: Account
}

interface TransactionContext {
  transactionEvents?: EventRecord[]
}

export type ContributeFundContext =
  | ContributeContext
  | AuthorizeContext
  | TransactionContext;


type NextEvent = { type: 'NEXT' }

export type ContributeFundEvents = NextEvent;

export type ContributeFundsState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'contribute'; context: Required<ContributeContext> }
  | { value: 'authorize', context: Required<AuthorizeContext> }
  | { value: 'transaction', context: EmptyObject }
  | { value: 'success'; context: EmptyObject }
  | { value: 'error'; context: Required<TransactionContext> }

export const contributeFundsMachine = createMachine<ContributeFundContext, ContributeFundEvents, ContributeFundsState>({
  initial: 'requirementsVerification',
  states: {
    requirementsVerification: {
      on: {
        NEXT: 'contribute',
      },
    },
    contribute: {
      id: 'contribute',
      on: {
        NEXT: 'authorize',
      }
    },
    authorize: {
      id: 'authorize',
      on: {
        NEXT: 'transaction',
      }
    },
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
            cond: isTransactionError,
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
          },
          {
            target: 'canceled',
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    success: { type: 'final' },
    error: { type: 'final' },
    canceled: { type: 'final' },
  }
})
