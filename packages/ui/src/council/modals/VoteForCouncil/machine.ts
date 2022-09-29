import { EventRecord } from '@polkadot/types/interfaces'
import BN from 'bn.js'
import { assign, createMachine, State, StateSchema, Typestate } from 'xstate'

import { Account } from '@/accounts/types'
import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'
import { EmptyObject } from '@/common/types'

export interface VoteContext {
  stake?: BN
  account?: Account
  transactionEvents: EventRecord[]
}

type VoteForCouncilState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'stake'; context: EmptyObject }
  | { value: 'transaction'; context: VoteContext }
  | { value: 'success'; context: VoteContext }
  | { value: 'error'; context: VoteContext }

type FailEvent = { type: 'FAIL' }
type PassEvent = { type: 'PASS' }
type StakeEvent = { type: 'SET_STAKE'; stake: BN }
type AccountEvent = { type: 'SET_ACCOUNT'; account: Account }
export type VoteForCouncilEvent = FailEvent | PassEvent | StakeEvent | AccountEvent

export type VoteForCouncilMachineState = State<
  VoteContext,
  VoteForCouncilEvent,
  StateSchema<VoteContext>,
  Typestate<VoteContext>
>

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
          actions: assign({ stake: (_, event) => event.stake }),
        },
        SET_ACCOUNT: {
          actions: assign({ account: (_, event) => event.account }),
        },
        PASS: 'transaction',
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
          {
            target: 'error',
            actions: assign({ transactionEvents: (_, event) => event.data.events }),
            cond: isTransactionError,
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
        error: 'There was a problem casting your vote.',
      },
    }),
  },
})
