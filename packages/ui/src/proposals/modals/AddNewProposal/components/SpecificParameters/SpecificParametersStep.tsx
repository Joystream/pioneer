import React from 'react'
import { State, Typestate } from 'xstate'

import { DecreaseWorkingGroupLeadStake } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/DecreaseWorkingGroupLeadStake'
import { FundingRequest } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/FundingRequest'
import { RuntimeUpgrade } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/RuntimeUpgrade'
import { SlashWorkingGroupLead } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SlashWorkingGroupLead'
import { CreateWorkingGroupLeadOpening } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/CreateWorkingGroupLeadOpening'
import { StakingPolicyAndReward } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/StakingPolicyAndReward'
import {
  AddNewProposalContext,
  AddNewProposalEvent,
  AddNewProposalMachineState,
} from '@/proposals/modals/AddNewProposal/machine'

interface SpecificParametersStepProps {
  send: (event: AddNewProposalEvent['type'], payload: any) => void
  state: State<AddNewProposalContext, AddNewProposalEvent, any, Typestate<AddNewProposalContext>>
}

export const isValidSpecificParameters = (state: AddNewProposalMachineState): boolean => {
  const specifics = state.context.specifics

  switch (true) {
    case state.matches('specificParameters.fundingRequest'): {
      return !!(specifics?.amount && specifics.amount.gtn(0) && specifics.account)
    }
    case state.matches('specificParameters.runtimeUpgrade'): {
      return !!specifics?.runtime && specifics.runtime.byteLength !== 0
    }
    case state.matches('specificParameters.createWorkingGroupLeadOpening.workingGroupAndOpeningDetails'): {
      return !!(specifics?.groupId && specifics.description && specifics.shortDescription)
    }
    case state.matches('specificParameters.createWorkingGroupLeadOpening.stakingPolicyAndReward'): {
      return !!(specifics?.stakingAmount && specifics.leavingUnstakingPeriod && specifics.rewardPerBlock)
    }
    case state.matches('specificParameters.decreaseWorkingGroupLeadStake'): {
      return !!(
        specifics?.stakingAmount &&
        specifics?.stakingAmount.gtn(0) &&
        specifics.groupId &&
        specifics.workerId !== undefined
      )
    }
    case state.matches('specificParameters.slashWorkingGroupLead'): {
      return !!(
        specifics?.slashingAmount &&
        specifics?.slashingAmount.gtn(0) &&
        specifics.groupId &&
        specifics.workerId !== undefined
      )
    }
    default:
      return false
  }
}

export const SpecificParametersStep = ({ send, state }: SpecificParametersStepProps) => {
  switch (true) {
    case state.matches('specificParameters.fundingRequest'):
      return (
        <FundingRequest
          account={state.context.specifics?.account}
          amount={state.context.specifics?.amount}
          setAccount={(account) => send('SET_ACCOUNT', { account })}
          setAmount={(amount) => send('SET_AMOUNT', { amount })}
        />
      )
    case state.matches('specificParameters.runtimeUpgrade'):
      return (
        <RuntimeUpgrade
          runtime={state.context.specifics?.runtime}
          setRuntime={(runtime) => send('SET_RUNTIME', { runtime })}
        />
      )
    case state.matches('specificParameters.createWorkingGroupLeadOpening.workingGroupAndOpeningDetails'):
      return (
        <CreateWorkingGroupLeadOpening
          description={state.context.specifics?.description}
          shortDescription={state.context.specifics?.shortDescription}
          groupId={state.context.specifics?.groupId}
          setDescription={(description) => send('SET_DESCRIPTION', { description })}
          setShortDescription={(shortDescription) => send('SET_SHORT_DESCRIPTION', { shortDescription })}
          setGroupId={(groupId) => send('SET_WORKING_GROUP', { groupId })}
        />
      )
    case state.matches('specificParameters.createWorkingGroupLeadOpening.stakingPolicyAndReward'):
      return (
        <StakingPolicyAndReward
          stakingAmount={state.context.specifics?.stakingAmount}
          leavingUnstakingPeriod={state.context.specifics?.leavingUnstakingPeriod}
          rewardPerBlock={state.context.specifics?.rewardPerBlock}
          setStakingAmount={(stakingAmount) => send('SET_STAKING_AMOUNT', { stakingAmount })}
          setLeavingUnstakingPeriod={(leavingUnstakingPeriod) =>
            send('SET_LEAVING_UNSTAKING_PERIOD', { leavingUnstakingPeriod })
          }
          setRewardPerBlock={(rewardPerBlock) => send('SET_REWARD_PER_BLOCK', { rewardPerBlock })}
        />
      )
    case state.matches('specificParameters.decreaseWorkingGroupLeadStake'):
      return (
        <DecreaseWorkingGroupLeadStake
          stakingAmount={state.context.specifics?.stakingAmount}
          groupId={state.context.specifics?.groupId}
          workerId={state.context.specifics?.workerId}
          setStakingAmount={(stakingAmount) => send('SET_STAKING_AMOUNT', { stakingAmount })}
          setGroupId={(groupId) => send('SET_WORKING_GROUP', { groupId })}
          setWorkerId={(workerId) => send('SET_WORKER', { workerId })}
        />
      )
    case state.matches('specificParameters.slashWorkingGroupLead'):
      return (
        <SlashWorkingGroupLead
          slashingAmount={state.context.specifics?.slashingAmount}
          groupId={state.context.specifics?.groupId}
          workerId={state.context.specifics?.workerId}
          setSlashingAmount={(slashingAmount) => send('SET_SLASHING_AMOUNT', { slashingAmount })}
          setGroupId={(groupId) => send('SET_WORKING_GROUP', { groupId })}
          setWorkerId={(workerId) => send('SET_WORKER', { workerId })}
        />
      )
    default:
      return null
  }
}
