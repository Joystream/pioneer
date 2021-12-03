import { createType } from '@joystream/types'
import { WorkingGroupDef, WorkingGroupKey } from '@joystream/types/common'
import { ApiRx } from '@polkadot/api'

import { isValidSpecificParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SpecificParametersStep'
import { AddNewProposalMachineState } from '@/proposals/modals/AddNewProposal/machine'
import { GroupIdName } from '@/working-groups/types'

const GroupIdToGroupParam: Record<GroupIdName, WorkingGroupKey> = {
  contentDirectoryWorkingGroup: 'Content',
  forumWorkingGroup: 'Forum',
  gatewayWorkingGroup: 'Gateway',
  membershipWorkingGroup: 'Membership',
  operationsWorkingGroup: 'Operations',
  storageWorkingGroup: 'Storage',
}

const getWorkingGroupParam = (groupId: GroupIdName | undefined) => {
  if (!groupId) return null

  return GroupIdToGroupParam[groupId]
}

export const getSpecificParameters = (api: ApiRx, state: AddNewProposalMachineState): any => {
  if (!isValidSpecificParameters(state)) {
    return { Signal: '' }
  }

  const specifics = state.context.specifics

  switch (state.context.type) {
    case 'signal': {
      return {
        Signal: specifics?.signal,
      }
    }
    case 'fundingRequest': {
      return {
        FundingRequest: [{ amount: specifics?.amount, account: specifics?.account?.address }],
      }
    }
    case 'runtimeUpgrade': {
      return {
        RuntimeUpgrade: createType('Bytes', specifics?.runtime ? new Uint8Array(specifics.runtime) : new Uint8Array()),
      }
    }
    case 'createWorkingGroupLeadOpening': {
      return {
        CreateWorkingGroupLeadOpening: {
          description: specifics?.description,
          staking_policy: {
            stake_amount: specifics?.stakingAmount,
            leaving_unstaking_period: specifics?.leavingUnstakingPeriod,
          },
          reward_per_block: specifics?.rewardPerBlock,
          working_group: getWorkingGroupParam(specifics?.groupId),
        },
      }
    }
    case 'decreaseWorkingGroupLeadStake': {
      return {
        DecreaseWorkingGroupLeadStake: [
          specifics?.workerId,
          specifics?.stakingAmount,
          getWorkingGroupParam(specifics?.groupId),
        ],
      }
    }
    case 'slashWorkingGroupLead': {
      return {
        SlashWorkingGroupLead: [
          specifics?.workerId,
          specifics?.stakingAmount,
          getWorkingGroupParam(specifics?.groupId),
        ],
      }
    }
    case 'terminateWorkingGroupLead': {
      return {
        TerminateWorkingGroupLead: [
          specifics?.workerId,
          specifics?.stakingAmount,
          getWorkingGroupParam(specifics?.groupId),
        ],
      }
    }
    case 'setWorkingGroupLeadReward': {
      return {
        SlashWorkingGroupLead: [
          specifics?.workerId,
          specifics?.rewardPerBlock,
          getWorkingGroupParam(specifics?.groupId),
        ],
      }
    }
    case 'cancelWorkingGroupLeadOpening': {
      return { CancelWorkingGroupLeadOpening: [specifics?.openingId, WorkingGroupDef.Forum] }
    }
    case 'setCouncilBudgetIncrement': {
      return { SetCouncilBudgetIncrement: specifics?.amount }
    }
    case 'fillWorkingGroupLeadOpening': {
      return {
        FillWorkingGroupLeadOpening: {
          opening_id: specifics?.openingId,
          successful_application_id: specifics?.applicationId,
          workingGroup: WorkingGroupDef.Forum,
        },
      }
    }
    case 'setMembershipLeadInvitationQuota': {
      return { SetMembershipLeadInvitationQuota: specifics?.amount }
    }
    case 'setReferralCut': {
      return { SetReferralCut: specifics?.amount?.toNumber() }
    }
    case 'setInitialInvitationBalance': {
      return { SetInitialInvitationBalance: specifics?.amount }
    }
    case 'setMaxValidatorCount': {
      return { SetMaxValidatorCount: specifics?.amount?.toNumber() }
    }
    default:
      return { Signal: '' }
  }
}
