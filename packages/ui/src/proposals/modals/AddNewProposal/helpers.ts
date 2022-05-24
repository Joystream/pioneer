import BN from 'bn.js'
import * as Yup from 'yup'

import { Account } from '@/accounts/types'
import { QuestionValueProps } from '@/common/components/EditableInputList/EditableInputList'
import { BNSchema, lessThanMixed, maxContext, minContext, moreThanMixed } from '@/common/utils/validation'
import { AccountSchema, StakingAccountSchema } from '@/memberships/model/validation'
import { Member } from '@/memberships/types'
import { MAX_VALIDATOR_COUNT } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetMaxValidatorCount'
import { ProposalType } from '@/proposals/types'
import { GroupIdName } from '@/working-groups/types'

export const defaultProposalValues = {
  groupId: undefined,
  proposalType: {
    type: undefined,
  },
  stakingAccount: {
    stakingAccount: undefined,
  },
  proposalDetails: {
    title: undefined,
    rationale: undefined,
  },
  triggerAndDiscussion: {
    discussionWhitelist: [],
  },
  updateWorkingGroupBudget: {
    isPositive: true,
  },
  durationAndProcess: {
    isLimited: false,
  },
}

export interface AddNewProposalForm {
  groupId?: GroupIdName
  proposalType: {
    type?: ProposalType
  }
  stakingAccount: {
    stakingAccount?: Account
  }
  proposalDetails: {
    title?: string
    rationale?: string
  }
  triggerAndDiscussion: {
    discussionWhitelist: Member[]
    isDiscussionClosed: boolean
    trigger: boolean
    triggerBlock?: number
  }
  signal: {
    signal?: string
  }
  fundingRequest: {
    amount: BN
    account: Account
  }
  runtimeUpgrade: {
    runtime?: ArrayBuffer
  }
  setCouncilorReward: {
    amount?: BN
  }
  setCouncilBudgetIncrement: {
    amount?: BN
  }
  fillWorkingGroupLeadOpening: {
    openingId?: string
    applicationId?: string
    groupId?: GroupIdName
  }
  workingGroupAndDescription: {
    title?: string
    description?: string
    shortDescription?: string
    groupId?: GroupIdName
  }
  durationAndProcess: {
    details?: string
    duration?: number
    isLimited: boolean
  }
  applicationForm: {
    questions?: QuestionValueProps[]
  }
  cancelWorkingGroupLeadOpening: {
    groupId?: GroupIdName
    openingId?: string
  }
  stakingPolicyAndReward: {
    stakingAmount?: BN
    leavingUnstakingPeriod?: number
    rewardPerBlock?: BN
  }
  decreaseWorkingGroupLeadStake: {
    stakingAmount?: BN
    groupId?: GroupIdName
    workerId?: number
  }
  slashWorkingGroupLead: {
    slashingAmount?: BN
    groupId?: GroupIdName
    workerId?: number
  }
  terminateWorkingGroupLead: {
    slashingAmount?: BN
    groupId?: GroupIdName
    workerId?: number
  }
  setWorkingGroupLeadReward: {
    rewardPerBlock?: BN
    groupId?: GroupIdName
    workerId?: number
  }
  updateWorkingGroupBudget: {
    budgetUpdate?: BN
    isPositive: boolean
    groupId?: GroupIdName
  }
  setInitialInvitationCount: {
    invitationCount?: BN
  }
  setReferralCut: {
    referralCut?: number
  }
  setMembershipLeadInvitationQuota: {
    amount?: BN
  }
  setInitialInvitationBalance: {
    amount?: BN
  }
  setMaxValidatorCount: {
    validatorCount?: BN
  }
  setMembershipPrice: {
    amount?: BN
  }
}

export const schemaFactory = (titleMaxLength: number, rationaleMaxLength: number) => {
  return Yup.object().shape({
    groupId: Yup.string(),
    proposalType: Yup.object().shape({
      type: Yup.string().required(),
    }),
    stakingAccount: Yup.object().shape({
      stakingAccount: StakingAccountSchema.required(),
    }),
    proposalDetails: Yup.object().shape({
      title: Yup.string().required().max(titleMaxLength, 'Title exceeds maximum length'),
      rationale: Yup.string().required().max(rationaleMaxLength, 'Rationale exceeds maximum length'),
    }),
    triggerAndDiscussion: Yup.object().shape({
      trigger: Yup.boolean(),
      triggerBlock: Yup.number().when('trigger', {
        is: true,
        then: Yup.number()
          .test(minContext('The minimum block number is ${min}', 'minTriggerBlock'))
          .test(maxContext('The maximum block number is ${max}', 'maxTriggerBlock'))
          .required(),
      }),
      isDiscussionClosed: Yup.boolean(),
      discussionWhitelist: Yup.array().when('isDiscussionClosed', {
        is: true,
        then: Yup.array().required(),
      }),
    }),
    signal: Yup.object().shape({
      signal: Yup.string().required().trim(),
    }),
    fundingRequest: Yup.object().shape({
      amount: BNSchema.test(moreThanMixed(0, '')).required(),
      account: AccountSchema.required(),
    }),
    runtimeUpgrade: Yup.object().shape({
      runtime: Yup.mixed()
        .test('byteLength', 'Invalid input', (value: ArrayBuffer) => value.byteLength !== 0)
        .required(),
    }),
    setCouncilorReward: Yup.object().shape({
      amount: BNSchema.test(moreThanMixed(0, '')).required(),
    }),
    setCouncilBudgetIncrement: Yup.object().shape({
      amount: BNSchema.test(moreThanMixed(0, '')).required(),
    }),
    fillWorkingGroupLeadOpening: Yup.object().shape({
      openingId: Yup.string().required(),
      applicationId: Yup.string().required(),
      groupId: Yup.string().required(),
    }),
    workingGroupAndDescription: Yup.object().shape({
      title: Yup.string().required().max(55, 'Max length is 55 characters'),
      description: Yup.string().required(),
      shortDescription: Yup.string().required(),
      groupId: Yup.string().required(),
    }),
    durationAndProcess: Yup.object().shape({
      details: Yup.string().required(),
      isLimited: Yup.boolean(),
      duration: Yup.number().when('isLimited', {
        is: true,
        then: Yup.number().required(),
      }),
    }),
    applicationForm: Yup.object().shape({
      questions: Yup.array()
        .of(
          Yup.object({
            questionField: Yup.string().required(),
            shortValue: Yup.boolean(),
          })
        )
        .min(1)
        .required(),
    }),
    cancelWorkingGroupLeadOpening: Yup.object().shape({
      groupId: Yup.string().required(),
      openingId: Yup.string().required(),
    }),
    stakingPolicyAndReward: Yup.object().shape({
      stakingAmount: BNSchema.test(
        minContext('Input must be greater than ${min} for proposal to execute', 'leaderOpeningStake')
      ).required(),
      leavingUnstakingPeriod: BNSchema.test(
        minContext('Input must be greater than ${min} for proposal to execute', 'minUnstakingPeriodLimit')
      ).required(),
      rewardPerBlock: BNSchema.test(moreThanMixed(1, 'Amount must be greater than zero')).required(),
    }),
    decreaseWorkingGroupLeadStake: Yup.object().shape({
      groupId: Yup.string().required(),
      stakingAmount: BNSchema.test(moreThanMixed(0, 'Amount must be greater than zero')).required(),
      workerId: Yup.number().required(),
    }),
    slashWorkingGroupLead: Yup.object().shape({
      slashingAmount: BNSchema.test(moreThanMixed(0, 'Amount must be greater than zero')).required(),
      groupId: Yup.string().required(),
      workerId: Yup.number().required(),
    }),
    terminateWorkingGroupLead: Yup.object().shape({
      slashingAmount: BNSchema,
      groupId: Yup.string().required(),
      workerId: Yup.number().required(),
    }),
    setWorkingGroupLeadReward: Yup.object().shape({
      rewardPerBlock: BNSchema.test(moreThanMixed(0, 'Amount must be greater than zero')).required(),
      groupId: Yup.string().required(),
      workerId: Yup.number().required(),
    }),
    updateWorkingGroupBudget: Yup.object().shape({
      isPositive: Yup.boolean(),
      groupId: Yup.string().required(),
      budgetUpdate: BNSchema.test(moreThanMixed(0, 'Amount must be greater than zero')).required(),
    }),
    setInitialInvitationCount: Yup.object().shape({
      invitationCount: BNSchema.test(moreThanMixed(0, 'Amount must be greater than zero')).required(),
    }),
    setReferralCut: Yup.object().shape({
      referralCut: Yup.number()
        .test(maxContext('Input must be equal or less than ${max}% for proposal to execute', 'maximumReferralCut'))
        .max(100, 'Value exceed maximal percentage')
        .required(),
    }),
    setMembershipLeadInvitationQuota: Yup.object().shape({
      amount: BNSchema.test(moreThanMixed(0, 'Amount must be greater than zero')).required(),
    }),
    setInitialInvitationBalance: Yup.object().shape({
      amount: BNSchema.test(moreThanMixed(0, 'Amount must be greater than zero')).required(),
    }),
    setMaxValidatorCount: Yup.object().shape({
      validatorCount: BNSchema.test(minContext('Minimal amount allowed is ${min}', 'minimumValidatorCount'))
        .test(lessThanMixed(MAX_VALIDATOR_COUNT, 'Maximal amount allowed is ${less}'))
        .required('Field is required'),
    }),
    setMembershipPrice: Yup.object().shape({
      amount: BNSchema.test(moreThanMixed(0, 'Amount must be greater than zero')).required(),
    }),
  })
}
