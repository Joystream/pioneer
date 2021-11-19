import { EventRecord } from '@polkadot/types/interfaces/system'
import BN from 'bn.js'
import { assign, createMachine } from 'xstate'

import { EmptyObject } from '@/common/types'
import { MemberFormFields } from '@/memberships/modals/BuyMembershipModal/BuyMembershipFormModal'


interface OnBoardingModalContext {
  form?: MemberFormFields
  memberId?: BN
  transactionEvents?: EventRecord[]
}

type OnBoardingModalState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'transaction'; context: { form: MemberFormFields } }
  | { value: 'success'; context: Required<OnBoardingModalContext> }
  | { value: 'error'; context: { form: MemberFormFields; transactionEvents: EventRecord[] } }

export type OnBoardingModalEvent =
  | { type: 'DONE'; form: MemberFormFields }
  | { type: 'SUCCESS'; memberId: BN }
  | { type: 'ERROR' }

export const buyMembershipMachine = createMachine<OnBoardingModalContext, OnBoardingModalEvent, OnBoardingModalState>({
  initial: 'prepare',
  states: {
    prepare: {
      on: {
        DONE: {
          target: 'transaction',
          actions: assign({ form: (_, event) => event.form })
        }
      }
    },
    transaction: {
      on: {
        SUCCESS: {
          target: 'success'
        },
        ERROR: {
          target: 'error'
        }
      }
    },
    success: { type: 'final' },
    error: { type: 'final' }
  }
})
