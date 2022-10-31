import { EventRecord } from '@polkadot/types/interfaces/system'
import BN from 'bn.js'
import { assign, createMachine } from 'xstate'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import { isTransactionError, isTransactionSuccess, transactionMachine } from '@/common/model/machines'
import { EmptyObject } from '@/common/types'

interface IncreaseStakeContext {
  stake?: BN
  transactionEvents?: EventRecord[]
}

type IncreaseStakeState =
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'transaction'; context: IncreaseStakeContext }
  | { value: 'success'; context: Required<IncreaseStakeContext> }
  | { value: 'error'; context: Required<IncreaseStakeContext> }

export type IncreaseStakeEvent =
  | { type: 'PASS' }
  | { type: 'FAIL' }
  | { type: 'DONE'; stake: BN }
  | { type: 'SET_STAKE'; stake: BN }
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }

export const increaseStakeMachine = createMachine<IncreaseStakeContext, IncreaseStakeEvent, IncreaseStakeState>({
  initial: 'prepare',
  states: {
    prepare: {
      on: {
        SET_STAKE: {
          actions: assign({ stake: (_, event) => event.stake }),
        },
        PASS: {
          target: 'transaction',
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
    ...transactionModalFinalStatusesFactory({
      metaMessages: {
        error: 'There was an problem with increasing the stake.',
      },
    }),
  },
})
