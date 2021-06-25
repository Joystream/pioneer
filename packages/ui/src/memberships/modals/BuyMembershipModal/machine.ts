import BN from 'bn.js'
import { assign, createMachine } from 'xstate'

import { MemberFormFields } from './BuyMembershipFormModal'

type EmptyObject = Record<string, never>

interface BuyMembershipContext {
  form?: MemberFormFields
  memberId?: BN
}

type BuyMembershipState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'transaction'; context: { form: MemberFormFields } }
  | { value: 'success'; context: Required<BuyMembershipContext> }
  | { value: 'error'; context: { form: MemberFormFields } }

export type BuyMembershipEvent =
  | { type: 'PASS' }
  | { type: 'FAIL' }
  | { type: 'DONE'; form: MemberFormFields }
  | { type: 'SUCCESS'; memberId: BN }
  | { type: 'ERROR' }

export const buyMembershipMachine = createMachine<BuyMembershipContext, BuyMembershipEvent, BuyMembershipState>({
  initial: 'prepare',
  states: {
    prepare: {
      on: {
        DONE: {
          target: 'transaction',
          actions: assign({ form: (_, event) => event.form }),
        },
      },
    },
    transaction: {
      on: {
        SUCCESS: {
          target: 'success',
          actions: assign({ memberId: (_, event) => event.memberId }),
        },
        ERROR: 'error',
      },
    },
    success: { type: 'final' },
    error: { type: 'final' },
  },
})
