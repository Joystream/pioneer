import { EventRecord } from '@polkadot/types/interfaces/system'
import BN from 'bn.js'
import { assign, createMachine } from 'xstate'

import { Account } from '@/accounts/types'
import { getDataFromEvent } from '@/common/model/JoystreamNode'
import { isTransactionError, isTransactionSuccess, transactionMachine } from '@/common/model/machines'
import { EmptyObject } from '@/common/types'
import { AddNewProposalContext, SpecificParametersContext } from '@/proposals/modals/AddNewProposal/machine'

interface StakingContext {
  stakingAccount?: Account
  stakingAmount?: BN
}

interface RewardAccountContext extends Required<StakingContext> {
  rewardAccount?: Account
}

interface TitleAndBulletPointsContext extends Required<RewardAccountContext> {
  title?: string
  bulletPoints: string[]
}

interface SummaryAndBannerContext extends Required<TitleAndBulletPointsContext> {
  summary?: string
  banner?: string
}

export interface FinalAnnounceCandidacyContext extends Required<TitleAndBulletPointsContext> {
  summary: string
  banner?: string
}

export interface TransactionContext extends FinalAnnounceCandidacyContext {
  transactionEvents?: EventRecord[]
}

export type AnnounceCandidacyContext = Partial<
  StakingContext & RewardAccountContext & TitleAndBulletPointsContext & SummaryAndBannerContext & TransactionContext
>

export type AnnounceCandidacyState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'requiredStakeVerification'; context: EmptyObject }
  | { value: 'requiredStakeFailed'; context: EmptyObject }
  | { value: 'staking'; context: StakingContext }
  | { value: 'rewardAccount'; context: RewardAccountContext }
  | { value: 'candidateProfile'; context: RewardAccountContext }
  | { value: 'candidateProfile.titleAndBulletPoints'; context: TitleAndBulletPointsContext }
  | { value: 'candidateProfile.summaryAndBanner'; context: SummaryAndBannerContext }
  | { value: 'candidateProfile.finishCandidateProfile'; context: FinalAnnounceCandidacyContext }
  | { value: 'beforeTransaction'; context: TransactionContext }
  | { value: 'bindStakingAccountTransaction'; context: TransactionContext }
  | { value: 'announceCandidacyTransaction'; context: TransactionContext }
  | { value: 'candidacyNoteTransaction'; context: TransactionContext }
  | { value: 'success'; context: TransactionContext }
  | { value: 'error'; context: TransactionContext }

type SetAccountEvent = { type: 'SET_ACCOUNT'; account: Account }
type SetAmountEvent = { type: 'SET_AMOUNT'; amount: BN }
type SetTitleEvent = { type: 'SET_TITLE'; title: string }
type SetBulletPointsEvent = { type: 'SET_BULLET_POINTS'; bulletPoints: string[] }
type SetSummaryEvent = { type: 'SET_SUMMARY'; summary: string }
type SetBannerEvent = { type: 'SET_BANNER'; banner: string }

type AnnounceCandidacyEvent =
  | { type: 'FAIL' }
  | { type: 'BACK' }
  | { type: 'NEXT' }
  | { type: 'BOUND' }
  | { type: 'REQUIRES_STAKING_CANDIDATE' }
  | SetAccountEvent
  | SetAmountEvent
  | SetTitleEvent
  | SetBulletPointsEvent
  | SetSummaryEvent
  | SetBannerEvent

export const announceCandidacyMachine = createMachine<
  AnnounceCandidacyContext,
  AnnounceCandidacyEvent,
  AnnounceCandidacyState
>({
  initial: 'requirementsVerification',
  context: {
    bulletPoints: [],
  },
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
          cond: (context) => !!(context.stakingAccount && context.stakingAmount),
        },
        SET_ACCOUNT: {
          actions: assign({
            stakingAccount: (context, event) => event.account,
          }),
        },
        SET_AMOUNT: {
          actions: assign({
            stakingAmount: (context, event) => event.amount,
          }),
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
          cond: (context) => !!context.rewardAccount,
        },
        SET_ACCOUNT: {
          actions: assign({
            rewardAccount: (context, event) => event.account,
          }),
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
            SET_TITLE: {
              actions: assign({
                title: (context, event) => event.title,
              }),
            },
            SET_BULLET_POINTS: {
              actions: assign({
                bulletPoints: (context, event) => event.bulletPoints,
              }),
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
            SET_SUMMARY: {
              actions: assign({
                summary: (context, event) => event.summary,
              }),
            },
            SET_BANNER: {
              actions: assign({
                banner: (context, event) => event.banner,
              }),
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
        ],
      },
    },
    announceCandidacyTransaction: {
      invoke: {
        id: 'announceCandidacyTransaction',
        src: transactionMachine,
        onDone: [
          {
            target: 'success',
            actions: assign({ transactionEvents: (context, event) => event.data.events }),
            cond: isTransactionSuccess,
          },
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
        ],
      },
    },
    success: { type: 'final' },
    error: { type: 'final' },
  },
})
