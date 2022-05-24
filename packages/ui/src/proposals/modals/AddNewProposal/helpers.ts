import BN from 'bn.js'

import { Account } from '@/accounts/types'
import { QuestionValueProps } from '@/common/components/EditableInputList/EditableInputList'
import { Member } from '@/memberships/types'
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
