import BN from 'bn.js'
import { assign, createMachine } from 'xstate'

import { Account } from '@/accounts/types'
import { EmptyObject } from '@/common/types'

interface StakingContext {
  stakingAccount?: Account
  stakingAmount?: BN
}

interface RewardAccountContext extends Required<StakingContext> {
  rewardAccount?: Account
}

export type AnnounceCandidacyContext = Partial<StakingContext & RewardAccountContext>

export type AnnounceCandidacyState =
  | { value: 'requirementsVerification'; context: EmptyObject }
  | { value: 'requirementsFailed'; context: EmptyObject }
  | { value: 'requiredStakeVerification'; context: EmptyObject }
  | { value: 'requiredStakeFailed'; context: EmptyObject }
  | { value: 'staking'; context: Required<StakingContext> }
  | { value: 'rewardAccount'; context: Required<RewardAccountContext> }
  | { value: 'candidateProfile'; context: Required<RewardAccountContext> }
  | { value: 'candidateProfile.titleAndDescription'; context: Required<RewardAccountContext> }
  | { value: 'candidateProfile.summaryAndBanner'; context: Required<RewardAccountContext> }
  | { value: 'candidateProfile.finishCandidateProfile'; context: Required<RewardAccountContext> }
  | { value: 'success'; context: Required<RewardAccountContext> }
  | { value: 'error'; context: AnnounceCandidacyContext }

type SetAccountEvent = { type: 'SET_ACCOUNT'; account: Account }
type SetAmountEvent = { type: 'SET_AMOUNT'; amount: BN }
type SetTitleEvent = { type: 'SET_TITLE'; title: string }

type AnnounceCandidacyEvent =
  | { type: 'FAIL' }
  | { type: 'BACK' }
  | { type: 'NEXT' }
  | SetAccountEvent
  | SetAmountEvent
  | SetTitleEvent

export const announceCandidacyMachine = createMachine<
  AnnounceCandidacyContext,
  AnnounceCandidacyEvent,
  AnnounceCandidacyState
>({
  initial: 'requirementsVerification',
  context: {},
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
          target: 'candidacyProfile',
          cond: (context) => !!context.rewardAccount,
        },
        SET_ACCOUNT: {
          actions: assign({
            rewardAccount: (context, event) => event.account,
          }),
        },
      },
    },
    candidacyProfile: {
      initial: 'titleAndDescription',
      meta: { isStep: true, stepTitle: 'Candidacy profile' },
      states: {
        titleAndDescription: {
          meta: { isStep: true, stepTitle: 'Title & Description' },
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
            BACK: 'titleAndDescription',
            NEXT: {
              target: 'finishCandidateProfile',
            },
          },
        },
        finishCandidateProfile: {
          type: 'final',
        },
      },
      onDone: 'error',
    },
    success: { type: 'final' },
    error: { type: 'final' },
  },
})
