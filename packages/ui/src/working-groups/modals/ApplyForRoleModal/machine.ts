import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

import { isError } from '@/common/hooks/useSignAndSendTransaction'
import { transactionConfig } from '@/common/model/machines'

export const applyForRoleMachine = createMachine<{ transactionEvents: EventRecord[] }>(
  {
    initial: 'requirementsVerification',
    context: { transactionEvents: [] },
    states: {
      requirementsVerification: {
        on: {
          FAIL: 'requirementsFailed',
          PASS: 'prepare',
        },
      },
      requirementsFailed: { type: 'final' },
      prepare: {
        on: { VALID: 'transaction' },
      },
      transaction: {
        invoke: {
          id: 'transaction',
          src: createMachine(transactionConfig),
          onDone: [
            {
              target: 'error',
              actions: ['assignTransactionEvents'],
              cond: (context, event) => isError(event.data.events),
            },
            {
              target: 'success',
              cond: (context, event) => !isError(event.data.events),
              actions: ['assignTransactionEvents'],
            },
          ],
        },
      },
      success: { type: 'final' },
      error: { type: 'final' },
    },
  },
  {
    actions: {
      assignTransactionEvents: assign({
        transactionEvents: (context, event) => event.data.events,
      }),
    },
  }
)
