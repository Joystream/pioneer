import { WorkingGroupDef } from '@joystream/types/common'
import { ApiRx } from '@polkadot/api'

import { isValidSpecificParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SpecificParametersStep'
import { AddNewProposalMachineState } from '@/proposals/modals/AddNewProposal/machine'

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
        RuntimeUpgrade: specifics?.runtime,
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
        DecreaseWorkingGroupLeadStake: [specifics?.workerId, specifics?.stakingAmount, WorkingGroupDef.Forum],
      }
    }
    default:
      return { Signal: '' }
  }
}
