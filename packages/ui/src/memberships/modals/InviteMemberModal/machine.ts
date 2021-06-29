import { assign, createMachine } from 'xstate'

import { isTransactionError, isTransactionSuccess, transactionMachine } from '@/common/model/machines'

import { MemberFormFields } from '../BuyMembershipModal/BuyMembershipFormModal'

type EmptyObject = Record<string, never>

interface InviteMemberContext {
  form?: MemberFormFields
}

type InviteMemberState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'transaction'; context: Required<InviteMemberContext> }
  | { value: 'success'; context: Required<InviteMemberContext> }
  | { value: 'error'; context: Required<InviteMemberContext> }

export type InviteMemberEvent =
  | { type: 'PASS' }
  | { type: 'FAIL' }
  | { type: 'DONE'; form: MemberFormFields }
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }

export const inviteMemberMachine = createMachine<InviteMemberContext, InviteMemberEvent, InviteMemberState>({
  initial: 'requirementsVerification',
  states: {
    requirementsVerification: {
      on: {
        FAIL: 'requirementsFailed',
        PASS: 'prepare',
      },
    },
    requirementsFailed: { type: 'final' },
    prepare: {
      on: {
        DONE: {
          target: 'transaction',
          actions: assign({ form: (context, event) => event.form }),
        },
      },
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
          },
        ],
      },
    },
    success: { type: 'final' },
    error: { type: 'final' },
  },
})
