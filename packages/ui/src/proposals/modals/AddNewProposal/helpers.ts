import BN from 'bn.js'
import * as Yup from 'yup'

import { Account } from '@/accounts/types'
import { Api } from '@/api'
import { CurrencyName } from '@/app/constants/currency'
import { QuestionValueProps } from '@/common/components/EditableInputList/EditableInputList'
import { isDefined } from '@/common/utils'
import {
  BNSchema,
  NumberSchema,
  lessThanMixed,
  maxContext,
  maxMixed,
  minContext,
  minMixed,
  moreThanMixed,
  whenDefined,
} from '@/common/utils/validation'
import { AccountSchema, StakingAccountSchema } from '@/memberships/model/validation'
import { Member } from '@/memberships/types'
import { equalToContext } from '@/proposals/model/validation'
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
    isDiscussionClosed: false,
  },
  fundingRequest: {
    payMultiple: false,
    hasPreviewedInput: true,
  },
  updateWorkingGroupBudget: {
    isPositive: true,
  },
  durationAndProcess: {
    isLimited: false,
  },
  updateChannelPayouts: {
    cashoutEnabled: true,
  },
  updatePalletFrozenStatus: {
    pallet: 'ProjectToken',
    enable: false,
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
    amount?: BN
    account?: Account
    payMultiple?: boolean
    csvInput?: string
    accountsAndAmounts?: { amount: BN; account: string }[]
    hasPreviewedInput?: boolean
  }
  runtimeUpgrade: {
    runtime?: File
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
    invitationCount?: number
  }
  setReferralCut: {
    referralCut?: number
  }
  setMembershipLeadInvitationQuota: {
    count?: number
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
  updateChannelPayouts: {
    commitment?: string
    payloadSize?: number
    payloadHash?: string
    minimumCashoutAllowed?: BN
    maximumCashoutAllowed?: BN
    cashoutEnabled?: boolean
    payload: {
      objectCreationParams: { size_: BN; ipfsContentId: any /* Bytes */ }
      expectedDataSizeFee: BN
      expectedDataObjectStateBloatBond: BN
    }
  }
  updatePalletFrozenStatus: {
    enable: boolean
    pallet: string
  }
  setEraPayoutDampingFactor: {
    dampingFactor?: number
  }
  decreaseCouncilBudget?: {
    amount?: BN
  }
  updateTokenPalletTokenConstraints?: {
    maxYearlyRate?: number
    minAmmSlope?: BN
    minSaleDuration?: number
    minRevenueSplitDuration?: number
    minRevenueSplitTimeToStart?: number
    salePlatformFee?: number
    ammBuyTxFees?: number
    ammSellTxFees?: number
    bloatBond?: BN
  }
  updateArgoBridgeConstraints?: {
    operatorAccount?: Account
    pauserAccounts?: (Account | undefined)[]
    bridgingFee?: BN
    thawnDuration?: number
    remoteChains?: (number | undefined)[]
  }
}

export const schemaFactory = (api?: Api) => {
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
        .max(api?.consts.proposalsEngine.titleMaxLength.toNumber() ?? 0, 'Title exceeds maximum length'),
      rationale: Yup.string()
        .required('Field is required')
        .max(api?.consts.proposalsEngine.descriptionMaxLength.toNumber() ?? 0, 'Rationale exceeds maximum length'),
    }),
    triggerAndDiscussion: Yup.object().shape({
      trigger: Yup.boolean(),
      triggerBlock: Yup.number().when('trigger', {
        is: true,
        then: NumberSchema.test(minContext('The minimum block number is ${min}', 'minTriggerBlock', false))
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
      payMultiple: Yup.boolean().required(),
      amount: BNSchema.when('payMultiple', {
        is: false,
        then: (schema) =>
          schema
            .test(moreThanMixed(0, ''))
            .test(
              maxMixed(
                api?.consts.proposalsCodex.fundingRequestProposalMaxTotalAmount,
                'Maximal amount allowed is ${max}'
              )
            )
            .required('Field is required'),
      }),
      account: AccountSchema.when('payMultiple', {
        is: false,
        then: (schema) => schema.required('Field is required'),
      }),
      hasPreviewedInput: Yup.boolean().when('payMultiple', {
        is: true,
        then: (schema) =>
          schema
            .test('previewedinput', 'Please preview', (value) => typeof value !== 'undefined' && value)
            .required('Field is required'),
      }),
      accountsAndAmounts: Yup.array().when('payMultiple', {
        is: true,
        then: (schema) => schema.required(),
      }),
    }),
    runtimeUpgrade: Yup.object().shape({
      runtime: Yup.mixed()
        .required('Field is required')
        .test('byteLength', 'Invalid input', (value: File) => value.size > 0),
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
        then: NumberSchema.required('Field is required'),
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
        minContext('Input must be at least ${min} for proposal to execute', 'leaderOpeningStake', true, 'execution')
      ).required('Field is required'),
      leavingUnstakingPeriod: BNSchema.test(
        minContext(
          'Input must be at least ${min} for proposal to execute',
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
      slashingAmount: BNSchema.test(moreThanMixed(0, 'Amount must be greater than zero')),
      groupId: Yup.string().required('Field is required'),
      workerId: Yup.number().test('execution', (value, schema) => {
        if (!schema.parent.groupId) return true
        return typeof value !== 'undefined'
      }),
    }),
    setWorkingGroupLeadReward: Yup.object().shape({
      rewardPerBlock: BNSchema.test(moreThanMixed(0, 'Amount must be greater than zero')).required('Field is required'),
      groupId: Yup.string().required('Field is required'),
      workerId: Yup.number().test('execution', (value, context) => {
        if (!context.parent.groupId) return true
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
      referralCut: NumberSchema.test(
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
      count: NumberSchema.min(1, 'Quota must be greater than zero').required('Field is required'),
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
    updateChannelPayouts: Yup.object().shape({
      payloadSize: Yup.number(),
      payloadHash: whenDefined('payloadSize', Yup.string().required()),
      commitment: whenDefined('payloadSize', Yup.string().required()),
      minimumCashoutAllowed: BNSchema.test(
        minContext(
          `Input should be at least \${min}${CurrencyName.integerValue} for proposal to execute`,
          'minCashoutAllowed',
          true,
          'execution'
        )
      ).required(),
      maximumCashoutAllowed: BNSchema.test(
        minMixed(Yup.ref('minimumCashoutAllowed'), 'Maximum cashout cannot be lower than minimum')
      )
        .test(
          maxContext(
            `Input should be at most \${max}${CurrencyName.integerValue} for proposal to execute`,
            'maxCashoutAllowed',
            true,
            'execution'
          )
        )
        .required(),
      channelCashoutsEnabled: Yup.boolean(),
    }),
    updatePalletFrozenStatus: Yup.object().shape({
      enable: Yup.boolean()
        .test(
          equalToContext(
            (enable) =>
              `The ProjectToken pallet is currently ${
                enable ? 'enabled' : 'disabled'
              }, so presently this proposal would fail due to execution constraints.`,
            'palletFrozenStatus',
            'execution'
          )
        )
        .required('Field is required'),
    }),
    setEraPayoutDampingFactor: Yup.object().shape({
      dampingFactor: NumberSchema.min(0, 'The value must be between 0 and 100%.')
        .max(100, 'The value must be between 0 and 100%.')
        .required('Field is required'),
    }),
    decreaseCouncilBudget: Yup.object().shape({
      amount: BNSchema.test(moreThanMixed(0, 'Amount must be greater than zero'))
        .test(
          maxContext(
            `The current council budget is \${max}${CurrencyName.integerValue}`,
            'councilBudget',
            true,
            'execution'
          )
        )
        .required(),
    }),
    updateTokenPalletTokenConstraints: Yup.object()
      .shape({
        maxYearlyRate: NumberSchema.min(0, 'Rate must be 0 or greater').max(10 ** 6, 'Rate must be 100 or less'),
        minAmmSlope: BNSchema.test(moreThanMixed(0, 'Amount must be greater than zero')),
        minSaleDuration: NumberSchema.min(0, 'Duration must be 0 or greater'),
        minRevenueSplitDuration: NumberSchema.min(0, 'Duration must be 0 or greater'),
        minRevenueSplitTimeToStart: NumberSchema.min(0, 'Duration must be 0 or greater'),
        salePlatformFee: NumberSchema.min(0, 'Rate must be 0 or greater').max(10 ** 6, 'Rate must be 100 or less'),
        ammBuyTxFees: NumberSchema.min(0, 'Rate must be 0 or greater').max(10 ** 6, 'Rate must be 100 or less'),
        ammSellTxFees: NumberSchema.min(0, 'Rate must be 0 or greater').max(10 ** 6, 'Rate must be 100 or less'),
        bloatBond: BNSchema.test(moreThanMixed(0, 'Amount must be greater than zero')),
      })
      .test((fields) => {
        if (fields && Object.values(fields).some(isDefined)) return true
        return new Yup.ValidationError('At least one field is required', fields, 'updateTokenPalletTokenConstraints')
      }),
    updateArgoBridgeConstraints: Yup.object()
      .shape({
        operatorAccount: AccountSchema,
        pauserAccounts: Yup.array(AccountSchema),
        bridgingFee: BNSchema.test(minMixed(0, 'Amount must be 0 or greater')),
        thawnDuration: NumberSchema.min(0, 'Duration must be 0 or greater'),
        remoteChains: Yup.array(Yup.number()),
      })
      .test((fields) => {
        if (fields && Object.values(fields).some(isDefined)) return true
        throw new Yup.ValidationError('At least one field is required', fields, 'updateTokenPalletTokenConstraints')
      }),
  })
}
