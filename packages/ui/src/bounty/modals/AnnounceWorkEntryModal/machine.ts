import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

import { Account } from '@/accounts/types'
import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'
import { EmptyObject } from '@/common/types'

interface ContributionContext {
  stakingAccount?: Account
}

interface TransactionContext extends ContributionContext {
  transactionEvents?: EventRecord[]
}

export enum AnnounceWorkEntryStates {
  requirementsVerification = 'requirementsVerification',
  requirementsFailed = 'requirementsFailed',
  beforeTransaction = 'beforeTransaction',
  bindStakingAccount = 'bindStakingAccount',
  contribute = 'contribute',
  transaction = 'transaction',
  success = 'success',
  error = 'error',
  cancel = 'cancel',
}

type NextEvent = { type: 'NEXT' } | { type: 'BOUND' } | { type: 'REQUIRES_STAKING_CANDIDATE' } | { type: 'FAIL' }
type SetStakingAccountEvent = { type: 'SET_STAKING_ACCOUNT'; account: Account }

export type AnnounceWorkEntryEvents = NextEvent | SetStakingAccountEvent

export type AnnounceWorkEntryState =
  | { value: AnnounceWorkEntryStates.requirementsVerification; context: EmptyObject }
  | { value: AnnounceWorkEntryStates.requirementsFailed; context: EmptyObject }
  | { value: AnnounceWorkEntryStates.bindStakingAccount; context: EmptyObject }
  | { value: AnnounceWorkEntryStates.beforeTransaction; context: EmptyObject }
  | { value: AnnounceWorkEntryStates.contribute; context: Required<ContributionContext> }
  | { value: AnnounceWorkEntryStates.transaction; context: EmptyObject }
  | { value: AnnounceWorkEntryStates.success; context: EmptyObject }
  | { value: AnnounceWorkEntryStates.cancel; context: EmptyObject }
  | { value: AnnounceWorkEntryStates.error; context: Required<TransactionContext> }

export const announceWorkEntryMachine = createMachine<
  TransactionContext,
  AnnounceWorkEntryEvents,
  AnnounceWorkEntryState
>({
  initial: 'requirementsVerification',
  states: {
    [AnnounceWorkEntryStates.requirementsVerification]: {
      on: {
        NEXT: AnnounceWorkEntryStates.contribute,
        FAIL: AnnounceWorkEntryStates.requirementsFailed,
      },
    },
    [AnnounceWorkEntryStates.requirementsFailed]: {
      type: 'final',
    },
    [AnnounceWorkEntryStates.contribute]: {
      id: AnnounceWorkEntryStates.contribute,
      on: {
        NEXT: AnnounceWorkEntryStates.beforeTransaction,
        SET_STAKING_ACCOUNT: {
          actions: assign({
            stakingAccount: (context, event) => (event as SetStakingAccountEvent).account,
          }),
        },
      },
    },
    [AnnounceWorkEntryStates.beforeTransaction]: {
      id: AnnounceWorkEntryStates.beforeTransaction,
      on: {
        BOUND: AnnounceWorkEntryStates.transaction,
        REQUIRES_STAKING_CANDIDATE: AnnounceWorkEntryStates.bindStakingAccount,
        FAIL: 'requirementsFailed',
      },
    },
    [AnnounceWorkEntryStates.bindStakingAccount]: {
      invoke: {
        id: AnnounceWorkEntryStates.bindStakingAccount,
        src: transactionMachine,
        onDone: [
          {
            target: AnnounceWorkEntryStates.transaction,
            cond: isTransactionSuccess,
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
          },
        ],
      },
    },
    [AnnounceWorkEntryStates.transaction]: {
      invoke: {
        id: AnnounceWorkEntryStates.transaction,
        src: transactionMachine,
        onDone: [
          {
            target: AnnounceWorkEntryStates.success,
            cond: isTransactionSuccess,
          },
          {
            target: AnnounceWorkEntryStates.error,
            cond: isTransactionError,
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
          },
          {
            target: AnnounceWorkEntryStates.cancel,
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    ...transactionModalFinalStatusesFactory({
      metaMessages: {
        error: 'There was a problem while creating bounty.',
        success: 'You have just successfully announced work entry!',
      },
    }),
  },
})
