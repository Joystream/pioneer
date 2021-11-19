import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

import { isTransactionError, isTransactionSuccess, transactionMachine } from '@/common/model/machines'
import { EmptyObject } from '@/common/types'
import { IncreaseStakeFormFields } from '@/working-groups/modals/IncreaseWorkerStakeModal/IncreaseWorkerStakeModal'

interface IncreaseStakeContext {
  form?: IncreaseStakeFormFields
  transactionEvents?: EventRecord[]
}

type IncreaseStakeState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'transaction'; context: { form: IncreaseStakeFormFields } }
  | { value: 'success'; context: Required<IncreaseStakeContext> }
  | { value: 'error'; context: { form: IncreaseStakeFormFields; transactionEvents: EventRecord[] } }

export type IncreaseStakeEvent =
  | { type: 'PASS' }
  | { type: 'FAIL' }
  | { type: 'DONE'; form: IncreaseStakeFormFields }
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }

export const increaseStakeMachine = createMachine<IncreaseStakeContext, IncreaseStakeEvent, IncreaseStakeState>({
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
