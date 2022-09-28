import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'
import { EmptyObject } from '@/common/types'

interface Context {
  transactionEvents?: EventRecord[]
}

type EditThreadTitleState =
  | { value: 'transaction'; context: EmptyObject }
  | { value: 'success'; context: EmptyObject }
  | { value: 'error'; context: EmptyObject }
  | { value: 'error'; context: Required<Context> }

export type EditThreadTitleEvent = { type: 'SUCCESS' } | { type: 'ERROR' }

export const editThreadTitleMachine = createMachine<Context, EditThreadTitleEvent, EditThreadTitleState>({
  initial: 'transaction',
  states: {
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
        success: 'You have just successfully edited thread title.',
        error: 'There was a problem while saving thread title.',
      },
    }),
  },
})
