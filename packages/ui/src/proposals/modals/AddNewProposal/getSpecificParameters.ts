import { createType } from '@joystream/types'
import { ProposalDetailsOf } from '@joystream/types/augment'
import { WorkingGroupKey } from '@joystream/types/common'
import { ProposalDetails } from '@joystream/types/src/proposals'
import { ApiRx } from '@polkadot/api'

import { BN_ZERO } from '@/common/constants'
import { last } from '@/common/utils'
import { isValidSpecificParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SpecificParametersStep'
import { AddNewProposalMachineState } from '@/proposals/modals/AddNewProposal/machine'
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

export const getSpecificParameters = (api: ApiRx, state: AddNewProposalMachineState): ProposalDetailsOf => {
  if (!isValidSpecificParameters(state)) {
    return createType('ProposalDetailsOf', { Signal: '' })
  }

  const specifics = state.context.specifics

  switch (state.context.type) {
    case 'signal': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        Signal: createType('Text', specifics?.signal ?? ''),
      })
    }
    case 'fundingRequest': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        FundingRequest: [{ amount: specifics?.amount, account: specifics?.account?.address }],
      })
    }
    case 'runtimeUpgrade': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        RuntimeUpgrade: createType('Bytes', [
          specifics?.runtime ? new Uint8Array(specifics.runtime) : new Uint8Array(),
        ]),
      })
    }
    case 'createWorkingGroupLeadOpening': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        CreateWorkingGroupLeadOpening: {
          description: specifics?.description,
          stake_policy: {
            stake_amount: specifics?.stakingAmount,
            leaving_unstaking_period: specifics?.leavingUnstakingPeriod,
          },
          reward_per_block: specifics?.rewardPerBlock,
          working_group: getWorkingGroupParam(specifics?.groupId),
        },
      })
    }
    case 'decreaseWorkingGroupLeadStake': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        DecreaseWorkingGroupLeadStake: [
          specifics?.workerId ?? 0,
          specifics?.stakingAmount ?? BN_ZERO,
          getWorkingGroupParam(specifics?.groupId) ?? 'Distribution',
        ],
      })
    }
    case 'slashWorkingGroupLead': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        SlashWorkingGroupLead: [
          specifics?.workerId ?? 0,
          specifics?.slashingAmount ?? BN_ZERO,
          getWorkingGroupParam(specifics?.groupId) ?? 'Distribution',
        ],
      })
    }
    case 'terminateWorkingGroupLead': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        TerminateWorkingGroupLead: {
          worker_id: specifics?.workerId,
          working_group: getWorkingGroupParam(specifics?.groupId),
          slashing_amount: specifics?.slashingAmount,
        },
      })
    }
    case 'setWorkingGroupLeadReward': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        SetWorkingGroupLeadReward: [
          specifics?.workerId ?? 0,
          specifics?.rewardPerBlock,
          getWorkingGroupParam(specifics?.groupId) ?? 'Distribution',
        ],
      })
    }
    case 'cancelWorkingGroupLeadOpening': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        CancelWorkingGroupLeadOpening: [
          specifics?.openingId ? idToRuntimeId(specifics.openingId) : 0,
          getWorkingGroupParam(specifics?.groupId) ?? 'Distribution',
        ],
      })
    }
    case 'setCouncilorReward': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        SetCouncilorReward: specifics?.amount ?? BN_ZERO,
      })
    }
    case 'setCouncilBudgetIncrement': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        SetCouncilBudgetIncrement: specifics?.amount ?? BN_ZERO,
      })
    }
    case 'fillWorkingGroupLeadOpening': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        FillWorkingGroupLeadOpening: {
          opening_id: specifics?.openingId ? idToRuntimeId(specifics.openingId) : 0,
          successful_application_id: specifics?.applicationId ? idToRuntimeId(specifics.applicationId) : 0,
          working_group: getWorkingGroupParam(specifics?.groupId),
        },
      })
    }
    case 'updateWorkingGroupBudget': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        UpdateWorkingGroupBudget: [
          specifics?.budgetUpdate ?? BN_ZERO,
          getWorkingGroupParam(specifics?.groupId) ?? 'Distribution',
          specifics?.budgetUpdateKind ?? 'Positive',
        ],
      })
    }
    case 'setMembershipLeadInvitationQuota': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        SetMembershipLeadInvitationQuota: specifics?.amount ?? BN_ZERO,
      })
    }
    case 'setReferralCut': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        SetReferralCut: specifics?.referralCut ?? 0,
      })
    }
    case 'setInitialInvitationBalance': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        SetInitialInvitationBalance: specifics?.amount ?? BN_ZERO,
      })
    }
    case 'setInitialInvitationCount': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        SetInitialInvitationCount: specifics?.invitationCount ?? BN_ZERO,
      })
    }
    case 'setMaxValidatorCount': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        SetMaxValidatorCount: specifics?.amount?.toNumber() ?? 0,
      })
    }
    case 'setMembershipPrice': {
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', {
        SetMembershipPrice: specifics?.amount?.toNumber() ?? 0,
      })
    }
    default:
      return createType<ProposalDetails, 'ProposalDetails'>('ProposalDetails', { Signal: '' })
  }
}
