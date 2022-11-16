import BN from 'bn.js'
import * as Yup from 'yup'

import { Account } from '@/accounts/types'
import { QuestionValueProps } from '@/common/components/EditableInputList/EditableInputList'
import { BNSchema, lessThanMixed, maxContext, maxMixed, minContext, moreThanMixed } from '@/common/utils/validation'
import { AccountSchema, StakingAccountSchema } from '@/memberships/model/validation'
import { Member } from '@/memberships/types'
import { ProposalType } from '@/proposals/types'
import { ProxyApi } from '@/proxyApi'
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
    isDiscussionClosed: false,
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
    leadId?: string
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

export const schemaFactory = (api?: ProxyApi) => {
  return Yup.object().shape({
    groupId: Yup.string(),
    proposalType: Yup.object().shape({
      type: Yup.string().required('Field is required'),
    }),
    stakingAccount: Yup.object().shape({
      stakingAccount: StakingAccountSchema.required('Field is required'),
    }),
    proposalDetails: Yup.object().shape({
      title: Yup.string()
        .required('Field is required')
        .max(api?.consts.proposalsEngine.titleMaxLength.toNumber() ?? 0, 'Title exceeds maximum length')
        .matches(/^[\x20-\x7E]*$/, 'Title includes forbidden characters'),
      rationale: Yup.string()
        .required('Field is required')
        .max(api?.consts.proposalsEngine.descriptionMaxLength.toNumber() ?? 0, 'Rationale exceeds maximum length'),
    }),
    triggerAndDiscussion: Yup.object().shape({
      trigger: Yup.boolean(),
      triggerBlock: Yup.number().when('trigger', {
        is: true,
        then: Yup.number()
          .test(minContext('The minimum block number is ${min}', 'minTriggerBlock', false))
          .test(maxContext('The maximum block number is ${max}', 'maxTriggerBlock', false))
          .required('Field is required'),
      }),
      isDiscussionClosed: Yup.boolean(),
      discussionWhitelist: Yup.array().when('isDiscussionClosed', {
        is: true,
        then: Yup.array().required('Field is required'),
      }),
    }),
    signal: Yup.object().shape({
      signal: Yup.string().required('Field is required').trim(),
    }),
    fundingRequest: Yup.object().shape({
      amount: BNSchema.test(moreThanMixed(0, ''))
        // todo: change funding request to allow upload request in file
        .test(
          maxMixed(api?.consts.proposalsCodex.fundingRequestProposalMaxTotalAmount, 'Maximal amount allowed is ${max}')
        )
        .required('Field is required'),
      account: AccountSchema.required('Field is required'),
    }),
    runtimeUpgrade: Yup.object().shape({
      runtime: Yup.mixed()
        .test('byteLength', 'Invalid input', (value: ArrayBuffer) => value.byteLength !== 0)
        .required('Field is required'),
    }),
    setCouncilorReward: Yup.object().shape({
      amount: BNSchema.test(moreThanMixed(0, '')).required('Field is required'),
    }),
    setCouncilBudgetIncrement: Yup.object().shape({
      amount: BNSchema.test(moreThanMixed(0, '')).required('Field is required'),
    }),
    fillWorkingGroupLeadOpening: Yup.object().shape({
      openingId: Yup.string().required('Field is required'),
      applicationId: Yup.string().required('Field is required'),
      groupId: Yup.string().required('Field is required'),
    }),
    workingGroupAndDescription: Yup.object().shape({
      title: Yup.string().required('Field is required').max(55, 'Max length is 55 characters'),
      description: Yup.string().required('Field is required'),
      shortDescription: Yup.string().required('Field is required'),
      groupId: Yup.string().required('Field is required'),
    }),
    durationAndProcess: Yup.object().shape({
      details: Yup.string().required('Field is required'),
      isLimited: Yup.boolean(),
      duration: Yup.number().when('isLimited', {
        is: true,
        then: Yup.number().required('Field is required'),
      }),
    }),
    applicationForm: Yup.object().shape({
      questions: Yup.array()
        .of(
          Yup.object({
            questionField: Yup.string().required('Field is required'),
            shortValue: Yup.boolean(),
          })
        )
        .min(1)
        .required('Field is required'),
    }),
    cancelWorkingGroupLeadOpening: Yup.object().shape({
      groupId: Yup.string().required('Field is required'),
      openingId: Yup.string().required('Field is required'),
    }),
    stakingPolicyAndReward: Yup.object().shape({
      stakingAmount: BNSchema.test(
        minContext('Input must be greater than ${min} for proposal to execute', 'leaderOpeningStake', true, 'execution')
      ).required('Field is required'),
      leavingUnstakingPeriod: BNSchema.test(
        minContext(
          'Input must be greater than ${min} for proposal to execute',
          'minUnstakingPeriodLimit',
          false,
          'execution'
        )
      ).required('Field is required'),
      rewardPerBlock: BNSchema.test(moreThanMixed(1, 'Amount must be greater than zero')).required('Field is required'),
    }),
    decreaseWorkingGroupLeadStake: Yup.object().shape({
      groupId: Yup.string().required('Field is required'),
      stakingAmount: BNSchema.test(moreThanMixed(0, 'Amount must be greater than zero')).required('Field is required'),
      workerId: Yup.number().required('Field is required'),
    }),
    slashWorkingGroupLead: Yup.object().shape({
      slashingAmount: BNSchema.test(moreThanMixed(0, 'Amount must be greater than zero')).required('Field is required'),
      groupId: Yup.string().required('Field is required'),
      workerId: Yup.number().required('Field is required'),
    }),
    terminateWorkingGroupLead: Yup.object().shape({
      slashingAmount: BNSchema,
      groupId: Yup.string().required('Field is required'),
      workerId: Yup.number().required('Field is required'),
    }),
    setWorkingGroupLeadReward: Yup.object().shape({
      rewardPerBlock: BNSchema.test(moreThanMixed(0, 'Amount must be greater than zero')).required('Field is required'),
      groupId: Yup.string().required('Field is required'),
      workerId: Yup.number().test('execution', (value, context) => {
        if (!context.parent.groupId) {
          return true
        }
        return typeof value !== 'undefined'
      }),
    }),
    updateWorkingGroupBudget: Yup.object().shape({
      isPositive: Yup.boolean(),
      groupId: Yup.string().required('Field is required'),
      budgetUpdate: BNSchema.test(moreThanMixed(0, 'Amount must be greater than zero')).required('Field is required'),
    }),
    setInitialInvitationCount: Yup.object().shape({
      invitationCount: BNSchema.test(moreThanMixed(0, 'Amount must be greater than zero', false)).required(
        'Field is required'
      ),
    }),
    setReferralCut: Yup.object().shape({
      referralCut: Yup.number()
        .test(
          maxContext(
            'Input must be equal or less than ${max}% for proposal to execute',
            'maximumReferralCut',
            false,
            'execution'
          )
        )
        .max(100, 'Value exceed maximal percentage')
        .required('Field is required'),
    }),
    setMembershipLeadInvitationQuota: Yup.object().shape({
      amount: BNSchema.test(moreThanMixed(0, 'Amount must be greater than zero')).required('Field is required'),
      leadId: Yup.string().test('execution', (value) => !!value),
    }),
    setInitialInvitationBalance: Yup.object().shape({
      amount: BNSchema.test(moreThanMixed(0, 'Amount must be greater than zero')).required('Field is required'),
    }),
    setMaxValidatorCount: Yup.object().shape({
      validatorCount: BNSchema.test(minContext('Minimal amount allowed is ${min}', 'minimumValidatorCount', false))
        .test(
          lessThanMixed(
            api?.consts.proposalsCodex.setMaxValidatorCountProposalMaxValidators?.toNumber(),
            'Maximal amount allowed is ${less}',
            false
          )
        )
        .required('Field is required'),
    }),
    setMembershipPrice: Yup.object().shape({
      amount: BNSchema.test(moreThanMixed(0, 'Amount must be greater than zero')).required('Field is required'),
    }),
  })
}
