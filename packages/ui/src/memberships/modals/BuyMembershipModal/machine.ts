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
}

type BuyMembershipState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'buyMembershipTransaction'; context: { form: MemberFormFields } }
  // | { value: 'temp'; context: { form: MemberFormFields } }
  // | { value: 'bondValidatorAccTransaction'; context: { form: MemberFormFields } }
  | { value: 'success'; context: Required<BuyMembershipContext> }
  | { value: 'canceled'; context: Required<BuyMembershipContext> }
  | { value: 'error'; context: { form: MemberFormFields; transactionEvents: EventRecord[] } }

export type BuyMembershipEvent =
  | { type: 'PASS' }
  | { type: 'FAIL' }
  | { type: 'DONE'; form: MemberFormFields }
  | { type: 'SUCCESS'; memberId: BN }
  | { type: 'ERROR' }
  // | { type: 'SKIP' }

export const buyMembershipMachine = createMachine<BuyMembershipContext, BuyMembershipEvent, BuyMembershipState>({
  initial: 'prepare',
  states: {
    prepare: {
      on: {
        DONE: {
          target: 'buyMembershipTransaction',
          actions: assign({ form: (_, event) => event.form }),
        },
      },
    },
    buyMembershipTransaction: {
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
    // temp:{
    //   on: {
    //     DONE: {
    //       target: 'buyMembershipTransaction',
    //     },
    //     SKIP: {
    //       target: 'success',
    //     },
    //   },
    // },
    // bondValidatorAccTransaction: {
    //   invoke: {
    //     id: 'transaction',
    //     src: transactionMachine,
    //     onDone: [
    //       {
    //         target: 'success',
    //         actions: assign({
    //           memberId: (context, event) => getDataFromEvent(event.data.events, 'members', 'MembershipBought', 0),
    //         }),
    //         cond: isTransactionSuccess,
    //       },
    //       {
    //         target: 'error',
    //         cond: isTransactionError,
    //         actions: assign({ transactionEvents: (context, event) => event.data.events }),
    //       },
    //       {
    //         target: 'canceled',
    //         cond: isTransactionCanceled,
    //       },
    //     ],
    //   },
    // },
    ...transactionModalFinalStatusesFactory({
      metaMessages: {
        error: 'There was a problem with creating a membership.',
      },
    }),
  },
})
