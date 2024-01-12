import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'
import { EmptyObject } from '@/common/types'

import { UpdateMemberForm } from './types'

interface UpdateMembershipContext {
  form?: UpdateMemberForm
  unbondingValidatorAccStep?: number
  bondingValidatorAccStep?: number
}

interface TransactionContext {
  transactionEvents?: EventRecord[]
}

type Context = UpdateMembershipContext & TransactionContext

type UpdateMembershipState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'updateMembershipTx'; context: Required<UpdateMembershipContext> }
  | { value: 'removeStakingAccTx'; context: Required<UpdateMembershipContext> }
  | { value: 'addStakingAccCandidateTx'; context: Required<UpdateMembershipContext> }
  | { value: 'confirmStakingAccTx'; context: Required<UpdateMembershipContext> }
  | { value: 'success'; context: Required<UpdateMembershipContext> }
  | { value: 'error'; context: Required<Context> }

export type UpdateMembershipEvent =
  | { type: 'PASS' }
  | { type: 'FAIL' }
  | { type: 'DONE'; form: UpdateMemberForm }
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }
  | { type: 'SKIP_UPDATE_MEMBERSHIP' }
  | { type: 'SKIP_UNBONDING' }
  | { type: 'SKIP_BONDING' }

const isUnbondingStateSelfTransition = (context: Context) =>
  !!context.form?.validatorAccountsToBeRemoved &&
  context.form?.validatorAccountsToBeRemoved.length > 1 &&
  (!context.unbondingValidatorAccStep ||
    context.form.validatorAccountsToBeRemoved.length - 1 > context.unbondingValidatorAccStep)

const isBondingStateSelfTransition = (context: Context) =>
  !!context.form?.validatorAccounts &&
  context.form?.validatorAccounts.length > 1 &&
  (!context.bondingValidatorAccStep || context.form.validatorAccounts.length - 1 > context.bondingValidatorAccStep)

export const updateMembershipMachine = createMachine<Context, UpdateMembershipEvent, UpdateMembershipState>({
  initial: 'prepare',
  states: {
    prepare: {
      on: {
        DONE: {
          target: 'removeStakingAccTx',
          actions: assign({
            form: (_, event) => event.form,
          }),
        },
      },
    },
    removeStakingAccTx: {
      invoke: {
        id: 'removeStakingAcc',
        src: transactionMachine,
        onDone: [
          {
            target: 'removeStakingAccTx',
            cond: isUnbondingStateSelfTransition,
            actions: assign({
              unbondingValidatorAccStep: (context) => (context.unbondingValidatorAccStep ?? 0) + 1,
            }),
          },
          {
            target: 'addStakingAccCandidateTx',
            cond: isTransactionSuccess,
          },
          {
            target: 'error',
            cond: isTransactionError,
          },
          {
            target: 'canceled',
            cond: isTransactionCanceled,
          },
        ],
      },
      on: {
        SKIP_UNBONDING: 'addStakingAccCandidateTx',
      },
    },
    addStakingAccCandidateTx: {
      invoke: {
        id: 'addStakingAccCandidate',
        src: transactionMachine,
        onDone: [
          {
            target: 'addStakingAccCandidateTx',
            cond: isBondingStateSelfTransition,
            actions: assign({
              bondingValidatorAccStep: (context) => (context.bondingValidatorAccStep ?? 0) + 1,
            }),
          },
          {
            target: 'confirmStakingAccTx',
            cond: isTransactionSuccess,
          },
          {
            target: 'error',
            cond: isTransactionError,
          },
          {
            target: 'canceled',
            cond: isTransactionCanceled,
          },
        ],
      },
      on: {
        SKIP_BONDING: 'updateMembershipTx',
      },
    },
    confirmStakingAccTx: {
      invoke: {
        id: 'confirmStakingAcc',
        src: transactionMachine,
        onDone: [
          {
            target: 'updateMembershipTx',
            cond: isTransactionSuccess,
          },
          {
            target: 'error',
            cond: isTransactionError,
          },
          {
            target: 'canceled',
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    updateMembershipTx: {
      invoke: {
        id: 'updateMembership',
        src: transactionMachine,
        onDone: [
          {
            target: 'success',
            cond: isTransactionSuccess,
          },
          {
            target: 'error',
            cond: isTransactionError,
          },
          {
            target: 'canceled',
            cond: isTransactionCanceled,
          },
        ],
      },
      on: {
        SKIP_UPDATE_MEMBERSHIP: 'success',
      },
    },
    ...transactionModalFinalStatusesFactory({
      metaMessages: {
        error: 'There was a problem updating membership.',
      },
    }),
  },
})
