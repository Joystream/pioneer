import { createType } from '@joystream/types'
import { ProposalDetailsOf } from '@joystream/types/augment'
import { WorkingGroupDef, WorkingGroupKey } from '@joystream/types/common'
import { ApiRx } from '@polkadot/api'
import { ITuple } from '@polkadot/types/types'

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
}

type SpecificParameters<PARAM extends string> = Extract<keyof ProposalDetailsOf, `as${PARAM}`> extends `${infer KEY}`
  ? KEY extends keyof ProposalDetailsOf
    ? ProposalDetailsOf[KEY] extends ITuple<infer TUPLE>
      ? TUPLE
      : ProposalDetailsOf[KEY]
    : never
  : never

const buildSpecificParams = <PARAM extends string>(name: PARAM, params: SpecificParameters<PARAM>) => {
  return {
    [name]: params,
  }
}

const getWorkingGroupParam = (groupId: GroupIdName | undefined) => {
  if (!groupId) return null

  return GroupIdToGroupParam[groupId]
}

export const getSpecificParameters = (api: ApiRx, state: AddNewProposalMachineState): ProposalDetailsOf => {
  if (!isValidSpecificParameters(state)) {
    return createType('ProposalDetailsOf', { Signal: '' })
  }

  const specifics = state.context.specifics

  switch (state.context.type) {
    case 'signal': {
      return createType('ProposalDetailsOf', buildSpecificParams('Signal', createType('Text', specifics?.signal ?? '')))
    }
    case 'fundingRequest': {
      return createType('ProposalDetailsOf', {
        FundingRequest: [{ amount: specifics?.amount, account: specifics?.account?.address }],
      })
    }
    case 'runtimeUpgrade': {
      return createType('ProposalDetailsOf', {
        RuntimeUpgrade: createType('Bytes', [
          specifics?.runtime ? new Uint8Array(specifics.runtime) : new Uint8Array(),
        ]),
      })
    }
    case 'createWorkingGroupLeadOpening': {
      return createType('ProposalDetailsOf', {
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
      return createType('ProposalDetailsOf', {
        DecreaseWorkingGroupLeadStake: [
          specifics?.workerId,
          specifics?.stakingAmount,
          getWorkingGroupParam(specifics?.groupId),
        ],
      })
    }
    case 'slashWorkingGroupLead': {
      return createType('ProposalDetailsOf', {
        SlashWorkingGroupLead: [
          specifics?.workerId,
          specifics?.stakingAmount,
          getWorkingGroupParam(specifics?.groupId),
        ],
      })
    }
    case 'terminateWorkingGroupLead': {
      return createType('ProposalDetailsOf', {
        TerminateWorkingGroupLead: [
          specifics?.workerId,
          specifics?.stakingAmount,
          getWorkingGroupParam(specifics?.groupId),
        ],
      })
    }
    case 'setWorkingGroupLeadReward': {
      return createType('ProposalDetailsOf', {
        SlashWorkingGroupLead: [
          specifics?.workerId,
          specifics?.rewardPerBlock,
          getWorkingGroupParam(specifics?.groupId),
        ],
      })
    }
    case 'cancelWorkingGroupLeadOpening': {
      return createType('ProposalDetailsOf', {
        CancelWorkingGroupLeadOpening: [specifics?.openingId, WorkingGroupDef.Forum],
      })
    }
    case 'setCouncilorReward': {
      return createType('ProposalDetailsOf', { SetCouncilorReward: specifics?.amount })
    }
    case 'setCouncilBudgetIncrement': {
      return createType('ProposalDetailsOf', { SetCouncilBudgetIncrement: specifics?.amount })
    }
    case 'fillWorkingGroupLeadOpening': {
      return createType('ProposalDetailsOf', {
        FillWorkingGroupLeadOpening: {
          opening_id: specifics?.openingId,
          successful_application_id: specifics?.applicationId,
          workingGroup: WorkingGroupDef.Forum,
        },
      })
    }
    case 'updateWorkingGroupBudget': {
      return createType(
        'ProposalDetailsOf',
        buildSpecificParams('UpdateWorkingGroupBudget', [
          createType('Balance', specifics?.budgetUpdate ?? 0),
          createType('WorkingGroup', getWorkingGroupParam(specifics?.groupId)),
          createType('BalanceKind', specifics?.budgetUpdateKind ?? 'Positive'),
        ])
      )
    }
    case 'setMembershipLeadInvitationQuota': {
      return createType('ProposalDetailsOf', { SetMembershipLeadInvitationQuota: specifics?.amount })
    }
    case 'setReferralCut': {
      return createType('ProposalDetailsOf', { SetReferralCut: specifics?.amount?.toNumber() })
    }
    case 'setInitialInvitationBalance': {
      return createType('ProposalDetailsOf', { SetInitialInvitationBalance: specifics?.amount })
    }
    case 'setInitialInvitationCount': {
      return createType('ProposalDetailsOf', {
        SetInitialInvitationCount: [specifics?.invitationCount],
      })
    }
    case 'setMaxValidatorCount': {
      return createType('ProposalDetailsOf', { SetMaxValidatorCount: specifics?.amount?.toNumber() })
    }
    case 'setMembershipPrice': {
      return createType('ProposalDetailsOf', { SetMembershipPrice: specifics?.amount?.toNumber() })
    }
    default:
      return createType('ProposalDetailsOf', { Signal: '' })
  }
}
