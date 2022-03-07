import { u32 } from '@polkadot/types'
import React from 'react'
import { State, Typestate } from 'xstate'

import { DecreaseWorkingGroupLeadStake } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/DecreaseWorkingGroupLeadStake'
import { FundingRequest } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/FundingRequest'
import { RuntimeUpgrade } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/RuntimeUpgrade'
import { SetCouncilBudgetIncrement } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetCouncilBudgetIncrement'
import { SetCouncilorReward } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetCouncilorReward'
import {
  MAX_VALIDATOR_COUNT,
  SetMaxValidatorCount,
} from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetMaxValidatorCount'
import { SetMembershipLeadInvitationQuota } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetMembershipLeadInvitationQuota'
import { SetMembershipPrice } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetMembershipPrice'
import { SetReferralCut } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetReferralCut'
import { SetWorkingGroupLeadReward } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetWorkingGroupLeadReward'
import { Signal } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/Signal'
import { SlashWorkingGroupLead } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SlashWorkingGroupLead'
import { TerminateWorkingGroupLead } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/TerminateWorkingGroupLead'
import { UpdateWorkingGroupBudget } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/UpdateWorkingGroupBudget'
import { CancelWorkingGroupLeadOpening } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/CancelWorkingGroupLeadOpening'
import { CreateWorkingGroupLeadOpening } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/CreateWorkingGroupLeadOpening'
import { FillWorkingGroupLeadOpening } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/FillWorkingGroupLeadOpening'
import { StakingPolicyAndReward } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/StakingPolicyAndReward'
import {
  AddNewProposalContext,
  AddNewProposalEvent,
  AddNewProposalMachineState,
} from '@/proposals/modals/AddNewProposal/machine'

import { SetInitialInvitationBalance } from './SetInitialInvitationBalance'
import { SetInitialInvitationCount } from './SetInitialInvitationCount'

export interface ExecutionProps {
  setIsExecutionError: (value: boolean) => void
}

interface SpecificParametersStepProps extends ExecutionProps {
  send: (event: AddNewProposalEvent['type'], payload: any) => void
  state: State<AddNewProposalContext, AddNewProposalEvent, any, Typestate<AddNewProposalContext>>
}

export const isValidSpecificParameters = (state: AddNewProposalMachineState, minimumValidatorCount?: u32): boolean => {
  const specifics = state.context.specifics

  switch (true) {
    case state.matches('specificParameters.signal'): {
      return !!specifics?.signal
    }
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
      return !!(
        specifics?.stakingAmount?.toNumber() &&
        specifics.leavingUnstakingPeriod &&
        specifics.rewardPerBlock?.toNumber()
      )
    }
    case state.matches('specificParameters.cancelWorkingGroupLeadOpening'): {
      return !!specifics?.openingId
    }
    case state.matches('specificParameters.setMaxValidatorCount'): {
      return !!(
        specifics?.amount &&
        specifics.amount.ltn(MAX_VALIDATOR_COUNT) &&
        specifics.amount.gtn(minimumValidatorCount?.toNumber() || 0)
      )
    }
    case state.matches('specificParameters.setCouncilorReward'): {
      return !!(specifics?.amount && specifics.amount.gtn(0))
    }
    case state.matches('specificParameters.setCouncilBudgetIncrement'): {
      return !!(specifics?.amount && specifics.amount.gtn(0))
    }
    case state.matches('specificParameters.setWorkingGroupLeadReward'): {
      return !!(
        specifics?.rewardPerBlock &&
        specifics?.rewardPerBlock.gtn(0) &&
        specifics.groupId &&
        typeof specifics.workerId === 'number'
      )
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
    case state.matches('specificParameters.setReferralCut'): {
      return !!(specifics?.referralCut && specifics.referralCut > 0 && specifics.referralCut < 101)
    }
    case state.matches('specificParameters.terminateWorkingGroupLead'): {
      return !!(specifics?.groupId && specifics.workerId !== undefined)
    }
    case state.matches('specificParameters.fillWorkingGroupLeadOpening'): {
      return typeof specifics?.applicationId === 'number' && typeof specifics?.openingId === 'number'
    }
    case state.matches('specificParameters.updateWorkingGroupBudget'): {
      return !!(
        specifics?.groupId &&
        specifics?.budgetUpdate &&
        specifics.budgetUpdate.gtn(0) &&
        specifics.budgetUpdateKind
      )
    }
    case state.matches('specificParameters.setMembershipLeadInvitationQuota'): {
      return !!(specifics?.amount && specifics.amount.gtn(0))
    }
    case state.matches('specificParameters.setInitialInvitationBalance'): {
      return !!(specifics?.amount && specifics?.amount.gtn(0))
    }
    case state.matches('specificParameters.setMembershipPrice'): {
      return !!(specifics?.amount && specifics?.amount.gtn(0))
    }
    case state.matches('specificParameters.setInitialInvitationCount'): {
      return !!specifics?.invitationCount
    }
    default:
      return false
  }
}

export const SpecificParametersStep = ({ send, state, setIsExecutionError }: SpecificParametersStepProps) => {
  const {
    context: { specifics },
  } = state

  switch (true) {
    case state.matches('specificParameters.signal'):
      return <Signal signal={state.context.specifics?.signal} setSignal={(signal) => send('SET_SIGNAL', { signal })} />
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
    case state.matches('specificParameters.setCouncilorReward'):
      return (
        <SetCouncilorReward
          amount={state.context.specifics?.amount}
          setAmount={(amount) => send('SET_AMOUNT', { amount })}
        />
      )
    case state.matches('specificParameters.setCouncilBudgetIncrement'):
      return (
        <SetCouncilBudgetIncrement
          amount={state.context.specifics?.amount}
          setAmount={(amount) => send('SET_AMOUNT', { amount })}
        />
      )
    case state.matches('specificParameters.fillWorkingGroupLeadOpening'): {
      return (
        <FillWorkingGroupLeadOpening
          applicationId={specifics?.applicationId}
          openingId={specifics?.openingId}
          setApplicationId={(applicationId: number) => send('SET_APPLICATION_ID', { applicationId })}
          setOpeningId={(openingId: number) => send('SET_OPENING_ID', { openingId })}
          setWorkingGroupId={(groupId) => send('SET_WORKING_GROUP', { groupId })}
        />
      )
    }
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
    case state.matches('specificParameters.cancelWorkingGroupLeadOpening'):
      return (
        <CancelWorkingGroupLeadOpening
          groupId={state.context.specifics?.groupId}
          openingId={state.context.specifics?.openingId}
          setGroupId={(groupId) => send('SET_WORKING_GROUP', { groupId })}
          setOpeningId={(openingId) => send('SET_OPENING_ID', { openingId })}
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
          setIsExecutionError={setIsExecutionError}
          workingGroupId={state.context.specifics?.groupId}
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
    case state.matches('specificParameters.terminateWorkingGroupLead'):
      return (
        <TerminateWorkingGroupLead
          slashingAmount={state.context.specifics?.slashingAmount}
          groupId={state.context.specifics?.groupId}
          workerId={state.context.specifics?.workerId}
          setSlashingAmount={(slashingAmount) => send('SET_SLASHING_AMOUNT', { slashingAmount })}
          setGroupId={(groupId) => send('SET_WORKING_GROUP', { groupId })}
          setWorkerId={(workerId) => send('SET_WORKER', { workerId })}
        />
      )
    case state.matches('specificParameters.setWorkingGroupLeadReward'):
      return (
        <SetWorkingGroupLeadReward
          rewardPerBlock={state.context.specifics?.rewardPerBlock}
          groupId={state.context.specifics?.groupId}
          workerId={state.context.specifics?.workerId}
          setRewardPerBlock={(rewardPerBlock) => send('SET_REWARD_PER_BLOCK', { rewardPerBlock })}
          setGroupId={(groupId) => send('SET_WORKING_GROUP', { groupId })}
          setWorkerId={(workerId) => send('SET_WORKER', { workerId })}
        />
      )
    case state.matches('specificParameters.updateWorkingGroupBudget'):
      return (
        <UpdateWorkingGroupBudget
          setBudgetUpdate={(amount) => send('SET_BUDGET_UPDATE', { amount })}
          setBudgetUpdateKind={(kind) => send('SET_BUDGET_UPDATE_KIND', { kind })}
          budgetUpdate={state.context.specifics?.budgetUpdate}
          groupId={state.context.specifics?.groupId}
          setGroupId={(groupId) => send('SET_WORKING_GROUP', { groupId })}
        />
      )
    case state.matches('specificParameters.setInitialInvitationCount'):
      return (
        <SetInitialInvitationCount
          setNewCount={(count) => send('SET_INVITATION_COUNT', { count })}
          invitationCount={state.context.specifics?.invitationCount}
        />
      )
    case state.matches('specificParameters.setReferralCut'): {
      return (
        <SetReferralCut
          setReferralCut={(referralCut) => send('SET_REFERRAL_CUT', { referralCut })}
          referralCut={state.context.specifics?.referralCut}
        />
      )
    }
    case state.matches('specificParameters.setMembershipLeadInvitationQuota'):
      return (
        <SetMembershipLeadInvitationQuota
          amount={state.context.specifics?.amount}
          setAmount={(amount) => send('SET_AMOUNT', { amount })}
        />
      )
    case state.matches('specificParameters.setInitialInvitationBalance'): {
      return (
        <SetInitialInvitationBalance
          setAmount={(amount) => send('SET_AMOUNT', { amount })}
          amount={state.context.specifics?.amount}
        />
      )
    }
    case state.matches('specificParameters.setMaxValidatorCount'):
      return (
        <SetMaxValidatorCount
          setValidatorCount={(amount) => send('SET_AMOUNT', { amount })}
          validatorCount={state.context.specifics?.amount}
        />
      )
    case state.matches('specificParameters.setMembershipPrice'): {
      return (
        <SetMembershipPrice
          setAmount={(amount) => send('SET_AMOUNT', { amount })}
          amount={state.context.specifics?.amount}
        />
      )
    }
    default:
      return null
  }
}
