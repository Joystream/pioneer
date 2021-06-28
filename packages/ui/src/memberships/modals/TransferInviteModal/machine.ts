import BN from 'bn.js'
import { assign, createMachine } from 'xstate'

import { isTransactionError, isTransactionSuccess, transactionMachine } from '../../../common/model/machines'
import { Member } from '../../types'

type EmptyObject = Record<string, never>

interface TransferInvitesContext {
  numberOfInvites?: BN
  targetMember?: Member
}

type TransferInvitesState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'prepare'; context: EmptyObject }
  | { value: 'transaction'; context: Required<TransferInvitesContext> }
  | { value: 'success'; context: Required<TransferInvitesContext> }
  | { value: 'error'; context: Required<TransferInvitesContext> }

export type TransferInvitesEvent =
  | { type: 'PASS' }
  | { type: 'FAIL' }
  | { type: 'DONE'; numberOfInvites: BN; targetMember: Member }
  | { type: 'SUCCESS' }
  | { type: 'ERROR' }

export const transferInvitesMachine = createMachine<TransferInvitesContext, TransferInvitesEvent, TransferInvitesState>(
  {
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
            },
          ],
        },
      },
      success: { type: 'final' },
      error: { type: 'final' },
    },
  }
)
