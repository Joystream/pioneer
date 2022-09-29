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

interface ApplyForRoleContext {
  transactionEvents?: EventRecord[]
}

type ApplyForRoleState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'stake'; context: EmptyObject }
  | { value: 'form'; context: EmptyObject }
  | { value: 'beforeTransaction'; context: EmptyObject }
  | { value: 'bindStakingAccount'; context: EmptyObject }
  | { value: 'transaction'; context: EmptyObject }
  | { value: 'success'; context: Required<ApplyForRoleContext> }
  | { value: 'error'; context: Required<ApplyForRoleContext> }
  | { value: 'canceled'; context: Required<ApplyForRoleContext> }

export type ApplyForRoleEvent =
  | { type: 'FAIL' }
  | { type: 'PASS' }
  | { type: 'BOUND' }
  | { type: 'UNBOUND' }
  | { type: 'PREV' }
  | { type: 'NEXT' }

export const applyForRoleMachine = createMachine<ApplyForRoleContext, ApplyForRoleEvent, ApplyForRoleState>({
  initial: 'requirementsVerification',
  states: {
    requirementsVerification: {
      on: {
        FAIL: 'requirementsFailed',
        PASS: 'stake',
      },
    },
    requirementsFailed: { type: 'final' },
    stake: {
      meta: { isStep: true, stepTitle: 'Stake' },
      on: {
        NEXT: 'form',
      },
    },
    form: {
      meta: { isStep: true, stepTitle: 'Form' },
      on: {
        PREV: 'stake',
        NEXT: 'beforeTransaction',
      },
    },
    beforeTransaction: {
      id: 'beforeTransaction',
      on: {
        PREV: 'form',
        BOUND: 'transaction',
        UNBOUND: 'bindStakingAccount',
        FAIL: 'requirementsFailed',
      },
    },
    bindStakingAccount: {
      invoke: {
        id: 'bindStakingAccount',
        src: transactionMachine,
        onDone: [
          {
            target: 'transaction',
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            cond: isTransactionSuccess,
          },
          {
            target: 'error',
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            cond: isTransactionError,
          },
          {
            target: 'canceled',
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    transaction: {
      meta: { isStep: true, stepTitle: 'Submit application' },
      invoke: {
        id: 'transaction',
        src: transactionMachine,
        onDone: [
          {
            target: 'success',
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            cond: isTransactionSuccess,
          },
          {
            target: 'error',
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            cond: isTransactionError,
          },
          {
            target: 'canceled',
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    ...transactionModalFinalStatusesFactory({
      metaMessages: {
        error: 'There was a problem with applying for an opening.',
      },
      cancel: {
        target: 'stake',
        action: 'PREV',
      },
    }),
  },
})
