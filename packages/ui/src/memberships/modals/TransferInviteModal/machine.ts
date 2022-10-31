import { EventRecord } from '@polkadot/types/interfaces/system'
import BN from 'bn.js'
import { assign, createMachine } from 'xstate'

import { transactionModalFinalStatusesFactory } from '@/common/modals/utils'
import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'
import { EmptyObject } from '@/common/types'

import { Member } from '../../types'

interface TransferInvitesContext {
  numberOfInvites?: BN
  targetMember?: Member
}

interface TransactionContext {
  transactionEvents?: EventRecord[]
}

type Context = TransferInvitesContext & TransactionContext

type TransferInvitesState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'transaction'; context: Required<TransferInvitesContext> }
  | { value: 'success'; context: Required<TransferInvitesContext> }
  | { value: 'error'; context: Required<Context> }
  | { value: 'canceled'; context: Required<Context> }

export type TransferInvitesEvent =
  | { type: 'PASS' }
  | { type: 'FAIL' }
  | { type: 'DONE'; numberOfInvites: BN; targetMember: Member }
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }

export const transferInvitesMachine = createMachine<Context, TransferInvitesEvent, TransferInvitesState>({
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
          actions: assign({
            numberOfInvites: (context, event) => event.numberOfInvites,
            targetMember: (context, event) => event.targetMember,
          }),
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
        error: 'There was a problem transferring your invites.',
      },
    }),
  },
})
