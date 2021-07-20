import { WorkingGroupDef } from '@joystream/types/common'
import { ApiRx } from '@polkadot/api'

import { isValidSpecificParameters } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SpecificParametersStep'
import { AddNewProposalMachineState } from '@/proposals/modals/AddNewProposal/machine'

export const getSpecificParameters = (api: ApiRx, state: AddNewProposalMachineState): any => {
  if (!isValidSpecificParameters(state)) {
    return { Signal: '' }
  }

  switch (state.context.type) {
    case 'fundingRequest': {
      const specifics = state.context.specifics

      return {
        FundingRequest: [{ amount: specifics?.amount, account: specifics?.account?.address }],
      }
    }
    case 'runtimeUpgrade': {
      const specifics = state.context.specifics

      return {
        RuntimeUpgrade: specifics?.runtime,
      }
    }
    case 'createWorkingGroupLeadOpening': {
      const specifics = state.context.specifics

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
    default:
      return { Signal: '' }
  }
}
