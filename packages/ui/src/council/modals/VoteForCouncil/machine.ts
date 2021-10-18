import { EventRecord } from '@polkadot/types/interfaces'
import { assign, createMachine } from 'xstate'

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
  | { value: 'beforeTransaction'; context: Pick<VoteContext, 'stake'> }

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
          actions: assign({ stake: (context, event) => event.stake }),
        },
      },
    },

    transaction: {
      invoke: {
        id: 'transaction',
        src: transactionMachine,
      },
    },
  },
})
