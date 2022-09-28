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

export interface TransactionContext {
  transactionEvents?: EventRecord[]
}

export type AnnounceCandidacyState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'staking'; context: EmptyObject }
  | { value: 'reward'; context: EmptyObject }
  | { value: 'candidateProfile'; context: EmptyObject }
  | { value: 'candidateProfile.titleAndBulletPoints'; context: EmptyObject }
  | { value: 'candidateProfile.summaryAndBanner'; context: EmptyObject }
  | { value: 'candidateProfile.finishCandidateProfile'; context: EmptyObject }
  | { value: 'beforeTransaction'; context: TransactionContext }
  | { value: 'bindStakingAccountTransaction'; context: TransactionContext }
  | { value: 'announceCandidacyTransaction'; context: TransactionContext }
  | { value: 'candidacyNoteTransaction'; context: TransactionContext }
  | { value: 'success'; context: TransactionContext }
  | { value: 'error'; context: TransactionContext }

type AnnounceCandidacyEvent =
  | { type: 'FAIL' }
  | { type: 'BACK' }
  | { type: 'NEXT' }
  | { type: 'BOUND' }
  | { type: 'REQUIRES_STAKING_CANDIDATE' }

export const announceCandidacyMachine = createMachine<
  TransactionContext,
  AnnounceCandidacyEvent,
  AnnounceCandidacyState
>({
  initial: 'requirementsVerification',
  states: {
    requirementsVerification: {
      on: {
        FAIL: 'requirementsFailed',
        NEXT: 'staking',
      },
    },
    requirementsFailed: { type: 'final' },
    staking: {
      id: 'staking',
      meta: { isStep: true, stepTitle: 'Staking' },
      on: {
        NEXT: {
          target: 'reward',
        },
      },
    },
    reward: {
      id: 'reward',
      meta: { isStep: true, stepTitle: 'Reward account' },
      on: {
        BACK: '#staking',
        NEXT: {
          target: 'candidateProfile',
        },
      },
    },
    candidateProfile: {
      initial: 'titleAndBulletPoints',
      meta: { isStep: true, stepTitle: 'Candidate profile' },
      states: {
        titleAndBulletPoints: {
          meta: { isStep: true, stepTitle: 'Title & Bullet points' },
          on: {
            BACK: '#reward',
            NEXT: {
              target: 'summaryAndBanner',
            },
          },
        },
        summaryAndBanner: {
          meta: { isStep: true, stepTitle: 'Summary & Banner' },
          on: {
            BACK: 'titleAndBulletPoints',
            NEXT: {
              target: 'finishCandidateProfile',
            },
          },
        },
        finishCandidateProfile: {
          type: 'final',
        },
      },
      onDone: 'beforeTransaction',
    },
    beforeTransaction: {
      id: 'beforeTransaction',
      on: {
        BOUND: 'announceCandidacyTransaction',
        REQUIRES_STAKING_CANDIDATE: 'bindStakingAccountTransaction',
        FAIL: 'requirementsFailed',
      },
    },
    bindStakingAccountTransaction: {
      invoke: {
        id: 'bindStakingAccountTransaction',
        src: transactionMachine,
        onDone: [
          {
            target: 'announceCandidacyTransaction',
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            cond: isTransactionSuccess,
          },
          {
            target: 'error',
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            cond: isTransactionError,
          },
          {
            target: 'canceled',
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    announceCandidacyTransaction: {
      invoke: {
        id: 'announceCandidacyTransaction',
        src: transactionMachine,
        onDone: [
          {
            target: 'candidacyNoteTransaction',
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            cond: isTransactionSuccess,
          },
          {
            target: 'error',
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            cond: isTransactionError,
          },
          {
            target: 'canceled',
            cond: isTransactionCanceled,
          },
        ],
      },
    },
    candidacyNoteTransaction: {
      invoke: {
        id: 'candidacyNoteTransaction',
        src: transactionMachine,
        onDone: [
          {
            target: 'success',
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            cond: isTransactionSuccess,
          },
          {
            target: 'error',
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
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
        error: 'There was a problem while announcing candidacy.',
      },
      cancel: {
        target: 'staking',
        action: 'BACK',
      },
    }),
  },
})
