import { OpeningMetadata } from '@joystream/metadata-protobuf'
import { createType } from '@joystream/types'
import { ProposalDetailsOf } from '@joystream/types/augment'
import { WorkingGroupKey } from '@joystream/types/common'
import { ProposalDetails } from '@joystream/types/src/proposals'
import { ApiRx } from '@polkadot/api'

import { BN_ZERO } from '@/common/constants'
import { metadataToBytes } from '@/common/model/JoystreamNode'
import { last } from '@/common/utils'
import { AddNewProposalForm } from '@/proposals/modals/AddNewProposal/helpers'
import { GroupIdName } from '@/working-groups/types'

const GroupIdToGroupParam: Record<GroupIdName, WorkingGroupKey> = {
  contentWorkingGroup: 'Content',
  forumWorkingGroup: 'Forum',
  gatewayWorkingGroup: 'Gateway',
  membershipWorkingGroup: 'Membership',
  distributionWorkingGroup: 'Distribution',
  storageWorkingGroup: 'Storage',
  operationsWorkingGroupAlpha: 'OperationsAlpha',
  operationsWorkingGroupBeta: 'OperationsBeta',
  operationsWorkingGroupGamma: 'OperationsGamma',
}

const idToRuntimeId = (id: string): number => Number(last(id.split('-')))

const getWorkingGroupParam = (groupId: GroupIdName | undefined) => {
  if (!groupId) return undefined

  return GroupIdToGroupParam[groupId]
}

export const getSpecificParameters = (
  api: ApiRx,
  specifics: Omit<AddNewProposalForm, 'triggerAndDiscussion' | 'stakingAccount' | 'proposalDetails'>,
  isFormValid: boolean
): ProposalDetailsOf => {
  if (!isFormValid || !specifics.proposalType.type) {
    return createType('ProposalDetailsOf', { Signal: '' })
  }

  switch (
    specifics.proposalType.type as keyof Omit<
      AddNewProposalForm,
      'triggerAndDiscussion' | 'stakingAccount' | 'proposalDetails' | 'proposalType'
    >
  ) {
    case 'signal': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        Signal: createType('Text', specifics.signal.signal ?? ''),
      })
    }
    case 'fundingRequest': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        FundingRequest: [
          { amount: specifics?.fundingRequest.amount, account: specifics?.fundingRequest.account?.address },
        ],
      })
    }
    case 'runtimeUpgrade': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        RuntimeUpgrade: createType('Bytes', [
          specifics?.runtimeUpgrade.runtime ? new Uint8Array(specifics.runtimeUpgrade.runtime) : new Uint8Array(),
        ]),
      })
    }
    case 'stakingPolicyAndReward': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        CreateWorkingGroupLeadOpening: {
          description: metadataToBytes(OpeningMetadata, {
            title: specifics?.workingGroupAndDescription.title,
            shortDescription: specifics?.workingGroupAndDescription.shortDescription,
            description: specifics?.workingGroupAndDescription.description,
            hiringLimit: 1,
            expectedEndingTimestamp: specifics?.durationAndProcess.duration?.isLimited
              ? specifics.durationAndProcess.duration.length
              : undefined,
            applicationDetails: specifics?.durationAndProcess.details,
            applicationFormQuestions: specifics?.applicationForm.questions?.map(({ questionField, shortValue }) => ({
              question: questionField,
              type: OpeningMetadata.ApplicationFormQuestion.InputType[shortValue ? 'TEXT' : 'TEXTAREA'],
            })),
          }),
          stake_policy: {
            stake_amount: specifics?.stakingPolicyAndReward.stakingAmount,
            leaving_unstaking_period: specifics?.stakingPolicyAndReward.leavingUnstakingPeriod,
          },
          reward_per_block: specifics?.stakingPolicyAndReward.rewardPerBlock,
          working_group: getWorkingGroupParam(specifics?.workingGroupAndDescription.groupId),
        },
      })
    }
    case 'decreaseWorkingGroupLeadStake': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        DecreaseWorkingGroupLeadStake: [
          specifics?.decreaseWorkingGroupLeadStake.workerId ?? 0,
          specifics?.decreaseWorkingGroupLeadStake.stakingAmount ?? BN_ZERO,
          getWorkingGroupParam(specifics?.decreaseWorkingGroupLeadStake.groupId) ?? 'Distribution',
        ],
      })
    }
    case 'slashWorkingGroupLead': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        SlashWorkingGroupLead: [
          specifics?.slashWorkingGroupLead.workerId ?? 0,
          specifics?.slashWorkingGroupLead.slashingAmount ?? BN_ZERO,
          getWorkingGroupParam(specifics?.slashWorkingGroupLead.groupId) ?? 'Distribution',
        ],
      })
    }
    case 'terminateWorkingGroupLead': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        TerminateWorkingGroupLead: {
          worker_id: specifics?.terminateWorkingGroupLead.workerId,
          working_group: getWorkingGroupParam(specifics?.terminateWorkingGroupLead.groupId),
          slashing_amount: specifics?.terminateWorkingGroupLead.slashingAmount,
        },
      })
    }
    case 'setWorkingGroupLeadReward': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        SetWorkingGroupLeadReward: [
          specifics?.setWorkingGroupLeadReward.workerId ?? 0,
          specifics?.setWorkingGroupLeadReward.rewardPerBlock,
          getWorkingGroupParam(specifics?.setWorkingGroupLeadReward.groupId) ?? 'Distribution',
        ],
      })
    }
    case 'cancelWorkingGroupLeadOpening': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        CancelWorkingGroupLeadOpening: [
          specifics?.cancelWorkingGroupLeadOpening.openingId
            ? idToRuntimeId(specifics.cancelWorkingGroupLeadOpening.openingId)
            : 0,
          getWorkingGroupParam(specifics?.cancelWorkingGroupLeadOpening.groupId) ?? 'Distribution',
        ],
      })
    }
    case 'setCouncilorReward': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        SetCouncilorReward: specifics?.setCouncilorReward.amount ?? BN_ZERO,
      })
    }
    case 'setCouncilBudgetIncrement': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        SetCouncilBudgetIncrement: specifics?.setCouncilBudgetIncrement.amount ?? BN_ZERO,
      })
    }
    case 'fillWorkingGroupLeadOpening': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        FillWorkingGroupLeadOpening: {
          opening_id: specifics?.fillWorkingGroupLeadOpening.openingId
            ? idToRuntimeId(specifics.fillWorkingGroupLeadOpening.openingId)
            : 0,
          successful_application_id: specifics?.fillWorkingGroupLeadOpening.applicationId
            ? idToRuntimeId(specifics.fillWorkingGroupLeadOpening.applicationId)
            : 0,
          working_group: getWorkingGroupParam(specifics?.fillWorkingGroupLeadOpening.groupId),
        },
      })
    }
    case 'updateWorkingGroupBudget': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        UpdateWorkingGroupBudget: [
          specifics?.updateWorkingGroupBudget.budgetUpdate ?? BN_ZERO,
          getWorkingGroupParam(specifics?.updateWorkingGroupBudget.groupId) ?? 'Distribution',
          specifics?.updateWorkingGroupBudget.budgetUpdateKind ?? 'Positive',
        ],
      })
    }
    case 'setMembershipLeadInvitationQuota': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        SetMembershipLeadInvitationQuota: specifics?.setMembershipLeadInvitationQuota.amount ?? BN_ZERO,
      })
    }
    case 'setReferralCut': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        SetReferralCut: specifics?.setReferralCut.referralCut ?? 0,
      })
    }
    case 'setInitialInvitationBalance': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        SetInitialInvitationBalance: specifics?.setInitialInvitationBalance.amount ?? BN_ZERO,
      })
    }
    case 'setInitialInvitationCount': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        SetInitialInvitationCount: specifics?.setInitialInvitationCount.invitationCount ?? BN_ZERO,
      })
    }
    case 'setMaxValidatorCount': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        SetMaxValidatorCount: specifics?.setMaxValidatorCount.validatorCount?.toNumber() ?? 0,
      })
    }
    case 'setMembershipPrice': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        SetMembershipPrice: specifics?.setMembershipPrice.amount?.toNumber() ?? 0,
      })
    }
    default:
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', { Signal: '' })
  }
}
