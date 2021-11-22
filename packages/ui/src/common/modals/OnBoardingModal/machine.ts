import { assign, createMachine } from 'xstate'

import { EmptyObject } from '@/common/types'
import { MemberFormFields } from '@/memberships/modals/BuyMembershipModal/BuyMembershipFormModal'


interface OnBoardingModalContext {
  form?: MemberFormFields
  errorMessage?: string
}

type OnBoardingModalState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'transaction'; context: { form: MemberFormFields } }
  | { value: 'success'; context: { form: MemberFormFields } }
  | { value: 'error'; context: Required<OnBoardingModalContext> }

export type OnBoardingModalEvent =
  | { type: 'DONE'; form: MemberFormFields }
  | { type: 'SUCCESS' }
  | { type: 'ERROR'; errorMessage: string }

export const onBoardingMachine = createMachine<OnBoardingModalContext, OnBoardingModalEvent, OnBoardingModalState>({
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
          target: 'error',
          actions: assign({ errorMessage: (_, event) => event.errorMessage })
        }
      }
    },
    success: { type: 'final' },
    error: { type: 'final' }
  }
})
