// import { DecoratedEvents } from '@joystream/types/augment/augment-api-events'
import { EventRecord } from '@polkadot/types/interfaces/system'
import BN from 'bn.js'
import { assign, createMachine } from 'xstate'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import { getDataFromEvent } from '@/common/model/JoystreamNode'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'
import { EmptyObject } from '@/common/types'

import { MemberFormFields } from './BuyMembershipFormModal'

interface BuyMembershipContext {
  form?: MemberFormFields
  memberId?: BN
  transactionEvents?: EventRecord[]
  bindingValidtorAccStep?: number
}

type BuyMembershipState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'buyMembershipTx'; context: { form: MemberFormFields } }
  | { value: 'buyValidatorMembershipTx'; context: { form: MemberFormFields } }
  | { value: 'addStakingAccCandidateTx'; context: { form: MemberFormFields } }
  | { value: 'confirmStakingAccTx'; context: { form: MemberFormFields } }
  | { value: 'success'; context: Required<BuyMembershipContext> }
  | { value: 'canceled'; context: Required<BuyMembershipContext> }
  | { value: 'error'; context: { form: MemberFormFields; transactionEvents: EventRecord[] } }

export type BuyMembershipEvent =
  | { type: 'PASS' }
  | { type: 'FAIL' }
  | { type: 'DONE'; form: MemberFormFields }
  | { type: 'DONE_IS_VALIDATOR'; form: MemberFormFields }
  | { type: 'SUCCESS'; memberId: BN }
  | { type: 'ERROR' }

const isSelfTransition = (context: BuyMembershipContext) =>
  !!context.form?.validatorAccounts &&
  context.form?.validatorAccounts.length > 1 &&
  (!context.bindingValidtorAccStep || context.form.validatorAccounts.length - 1 > context.bindingValidtorAccStep)

export const buyMembershipMachine = createMachine<BuyMembershipContext, BuyMembershipEvent, BuyMembershipState>({
  initial: 'prepare',
  states: {
    prepare: {
      on: {
        DONE: {
          target: 'buyMembershipTx',
          actions: assign({ form: (_, event) => event.form }),
        },
        DONE_IS_VALIDATOR: {
          target: 'buyValidatorMembershipTx',
          actions: assign({ form: (_, event) => event.form }),
        },
      },
    },
    buyMembershipTx: {
      invoke: {
        id: 'transaction',
        src: transactionMachine,
        onDone: [
          {
            target: 'success',
            actions: assign({
              memberId: (context, event) => getDataFromEvent(event.data.events, 'members', 'MembershipBought', 0),
            }),
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
    buyValidatorMembershipTx: {
      invoke: {
        id: 'transaction',
        src: transactionMachine,
        onDone: [
          {
            target: 'addStakingAccCandidateTx',
            actions: assign({
              memberId: (context, event) => getDataFromEvent(event.data.events, 'members', 'MembershipBought', 0),
            }),
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
    addStakingAccCandidateTx: {
      invoke: {
        id: 'transaction',
        src: transactionMachine,
        onDone: [
          {
            target: 'addStakingAccCandidateTx',
            cond: isSelfTransition,
            actions: assign({
              transactionEvents: (context, event) => event.data.events,
              bindingValidtorAccStep: (context) => (context.bindingValidtorAccStep ?? 0) + 1,
            }),
          },
          {
            target: 'confirmStakingAccTx',
            cond: isTransactionSuccess,
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
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
    confirmStakingAccTx: {
      invoke: {
        id: 'transaction',
        src: transactionMachine,
        onDone: [
          {
            target: 'success',
            cond: isTransactionSuccess,
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
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
    ...transactionModalFinalStatusesFactory({
      metaMessages: {
        error: 'There was a problem with creating a membership.',
      },
    }),
  },
})
