import { EventRecord } from '@polkadot/types/interfaces/system'
import { assign, createMachine } from 'xstate'

import {
  isTransactionCanceled,
  isTransactionError,
  isTransactionSuccess,
  transactionMachine,
} from '@/common/model/machines'
import { EmptyObject } from '@/common/types'

// interface RewardAccountContext extends Required<StakingContext> {
//   rewardAccount?: Account
// }
//
// interface TitleAndBulletPointsContext extends Required<RewardAccountContext> {
//   title?: string
//   bulletPoints: string[]
// }

// interface SummaryAndBannerContext extends Required<TitleAndBulletPointsContext> {
//   summary?: string
//   banner?: string
// }

// export interface FinalAnnounceCandidacyContext extends Required<TitleAndBulletPointsContext> {
//   summary: string
//   banner?: string
// }

export interface TransactionContext {
  transactionEvents?: EventRecord[]
}

export type AnnounceCandidacyState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'requiredStakeVerification'; context: EmptyObject }
  | { value: 'requiredStakeFailed'; context: EmptyObject }
  | { value: 'staking'; context: EmptyObject }
  | { value: 'rewardAccount'; context: EmptyObject }
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

// type SetAccountEvent = { type: 'SET_ACCOUNT'; account: Account }
// type SetAmountEvent = { type: 'SET_AMOUNT'; amount: BN }
// type SetTitleEvent = { type: 'SET_TITLE'; title: string }
// type SetBulletPointsEvent = { type: 'SET_BULLET_POINTS'; bulletPoints: string[] }
// type SetSummaryEvent = { type: 'SET_SUMMARY'; summary: string }
// type SetBannerEvent = { type: 'SET_BANNER'; banner: string }

type AnnounceCandidacyEvent =
  | { type: 'FAIL' }
  | { type: 'BACK' }
  | { type: 'NEXT' }
  | { type: 'BOUND' }
  | { type: 'REQUIRES_STAKING_CANDIDATE' }
// | SetAccountEvent
// | SetAmountEvent
// | SetTitleEvent
// | SetBulletPointsEvent
// | SetSummaryEvent
// | SetBannerEvent

export const announceCandidacyMachine = createMachine<
  TransactionContext,
  AnnounceCandidacyEvent,
  AnnounceCandidacyState
>({
  initial: 'rewardAccount',
  states: {
    requirementsVerification: {
      on: {
        FAIL: 'requirementsFailed',
        NEXT: 'requiredStakeVerification',
      },
    },
    requirementsFailed: { type: 'final' },
    requiredStakeVerification: {
      on: {
        FAIL: 'requiredStakeFailed',
        NEXT: 'staking',
      },
    },
    requiredStakeFailed: { type: 'final' },
    staking: {
      id: 'staking',
      meta: { isStep: true, stepTitle: 'Staking' },
      on: {
        NEXT: {
          target: 'rewardAccount',
        },
      },
    },
    rewardAccount: {
      id: 'rewardAccount',
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
            BACK: '#rewardAccount',
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
    success: { type: 'final' },
    error: { type: 'final' },
    canceled: { type: 'final' },
  },
})
