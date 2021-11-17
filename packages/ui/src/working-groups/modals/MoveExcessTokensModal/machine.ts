import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

import { isTransactionError, isTransactionSuccess, transactionMachine } from '@/common/model/machines'
import { EmptyObject } from '@/common/types'
import { MoveExcessFormFields } from '@/working-groups/modals/MoveExcessTokensModal/MoveExcessTokensModal'

interface MoveExcessContext {
  form?: MoveExcessFormFields
  transactionEvents?: EventRecord[]
}

type MoveExcessState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'transaction'; context: { form: MoveExcessFormFields } }
  | { value: 'success'; context: Required<MoveExcessContext> }
  | { value: 'error'; context: { form: MoveExcessFormFields; transactionEvents: EventRecord[] } }

export type MoveExcessEvent =
  | { type: 'PASS' }
  | { type: 'FAIL' }
  | { type: 'DONE'; form: MoveExcessFormFields }
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }

export const moveExcessMachine = createMachine<MoveExcessContext, MoveExcessEvent, MoveExcessState>({
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
        ],
      },
    },
    success: { type: 'final' },
    error: { type: 'final' },
  },
})
