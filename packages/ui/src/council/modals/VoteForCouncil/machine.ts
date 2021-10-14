import { EventRecord } from '@polkadot/types/interfaces'
import { assign, createMachine } from 'xstate'

import { isTransactionSuccess, transactionMachine } from '@/common/model/machines'
import { EmptyObject } from '@/common/types'

import { StakeEvent, StakeFormFields } from './types'

interface VoteContext {
  stake: StakeFormFields
  transactionEvents: EventRecord[]
}

type VoteForCouncilState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'stake'; context: EmptyObject }
  | { value: 'transaction'; context: Pick<VoteContext, 'stake'> }
  | { value: 'success'; context: VoteContext }

type FailEvent = { type: 'FAIL' }
type PassEvent = { type: 'PASS' }
type VoteForCouncilEvent = FailEvent | PassEvent | StakeEvent

export const VoteForCouncilMachine = createMachine<Partial<VoteContext>, VoteForCouncilEvent, VoteForCouncilState>({
  initial: 'requirementsVerification',
  states: {
    requirementsVerification: {
      on: {
        FAIL: 'requirementsFailed',
        PASS: 'stake',
      },
    },

    requirementsFailed: { type: 'final' },

    stake: {
      on: {
        SET_STAKE: {
          target: 'transaction',
          actions: assign({ stake: (_, event) => event.stake }),
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
            actions: assign({ transactionEvents: (_, event) => event.data.events }),
            cond: isTransactionSuccess,
          },
      },
    },

    success: { type: 'final' },
  },
})
