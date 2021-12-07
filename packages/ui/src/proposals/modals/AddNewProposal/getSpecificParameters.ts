import { createType } from '@joystream/types'
import { ProposalDetailsOf } from '@joystream/types/augment'
import { WorkingGroupDef, WorkingGroupKey } from '@joystream/types/common'
import { ApiRx } from '@polkadot/api'
import { ITuple } from '@polkadot/types/types'

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


type SpecificParameters<PARAM extends string> = Extract<keyof ProposalDetailsOf, `as${PARAM}`> extends `${infer KEY}` ?
  KEY extends keyof ProposalDetailsOf ?
      ProposalDetailsOf[KEY] extends ITuple<infer TUPLE> ? TUPLE : never
    : never
  : never

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
    case 'setCouncilorReward': {
      return { SetCouncilorReward: specifics?.amount }
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
    case 'updateWorkingGroupBudget': {
      const params: SpecificParameters<'UpdateWorkingGroupBudget'> = [
        createType('Balance', specifics?.budgetUpdate ?? 0),
        createType('WorkingGroup', getWorkingGroupParam(specifics?.groupId)),
        createType('BalanceKind', specifics?.budgetUpdateKind ?? 'Positive')
      ]
      return {
        UpdateWorkingGroupBudget: params,
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
    case 'setInitialInvitationCount': {
      return {
        SetInitialInvitationCount: [specifics?.invitationCount],
      }
    }
    case 'setMaxValidatorCount': {
      return { SetMaxValidatorCount: specifics?.amount?.toNumber() }
    }
    case 'setMembershipPrice': {
      return { SetMembershipPrice: specifics?.amount?.toNumber() }
    }
    default:
      return { Signal: '' }
  }
}
