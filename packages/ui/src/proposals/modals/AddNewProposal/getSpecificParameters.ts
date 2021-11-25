import { createType } from '@joystream/types'
import { WorkingGroupDef } from '@joystream/types/common'
import { ApiRx } from '@polkadot/api'
import { Null } from '@polkadot/types'

import { isValidSpecificParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SpecificParametersStep'
import { AddNewProposalMachineState } from '@/proposals/modals/AddNewProposal/machine'
import { GroupIdName } from '@/working-groups/types'

const GroupIdToGroupParam: Record<GroupIdName, typeof Null> = {
  contentDirectoryWorkingGroup: WorkingGroupDef.Content,
  gatewayWorkingGroup: WorkingGroupDef.Gateway,
  membershipWorkingGroup: WorkingGroupDef.Membership,
  operationsWorkingGroup: WorkingGroupDef.Operations,
  storageWorkingGroup: WorkingGroupDef.Storage,
  forumWorkingGroup: WorkingGroupDef.Forum,
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
          workingGroup: WorkingGroupDef.Membership,
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
    default:
      return { Signal: '' }
  }
}
