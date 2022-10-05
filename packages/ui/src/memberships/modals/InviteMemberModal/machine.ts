import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine, State, Typestate } from 'xstate'
import { StateSchema } from 'xstate/lib/types'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'
import { EmptyObject } from '@/common/types'

import { MemberFormFields } from '../BuyMembershipModal/BuyMembershipFormModal'

interface FormContext {
  form?: MemberFormFields
}

interface TransactionContext extends FormContext {
  transactionEvents?: EventRecord[]
}

type Context = FormContext & TransactionContext

type InviteMemberState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'transaction'; context: Required<FormContext> }
  | { value: 'success'; context: Required<FormContext> }
  | { value: 'error'; context: Required<Context> }

export type InviteMemberEvent =
  | { type: 'PASS' }
  | { type: 'FAIL' }
  | { type: 'DONE'; form: MemberFormFields }
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }

export type InviteMemberMachineState = State<
  FormContext,
  InviteMemberEvent,
  StateSchema<FormContext>,
  Typestate<FormContext>
>

export const inviteMemberMachine = createMachine<Context, InviteMemberEvent, InviteMemberState>({
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
