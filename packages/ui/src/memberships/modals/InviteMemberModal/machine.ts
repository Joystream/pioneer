import { assign, createMachine } from 'xstate'

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
      on: {
        SUCCESS: 'success',
        ERROR: 'error',
      },
    },
    success: { type: 'final' },
    error: { type: 'final' },
  },
})
