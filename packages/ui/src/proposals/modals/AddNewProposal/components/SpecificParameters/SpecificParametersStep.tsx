import React from 'react'

import { ValidationHelpers } from '@/common/utils/validation'
import { DecreaseWorkingGroupLeadStake } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/DecreaseWorkingGroupLeadStake'
import { FundingRequest } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/FundingRequest'
import { RuntimeUpgrade } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/RuntimeUpgrade'
import { SetCouncilBudgetIncrement } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetCouncilBudgetIncrement'
import { SetCouncilorReward } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetCouncilorReward'
import { SetMaxValidatorCount } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetMaxValidatorCount'
import { SetMembershipLeadInvitationQuota } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetMembershipLeadInvitationQuota'
import { SetMembershipPrice } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetMembershipPrice'
import { SetReferralCut } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetReferralCut'
import { SetWorkingGroupLeadReward } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SetWorkingGroupLeadReward'
import { Signal } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/Signal'
import { SlashWorkingGroupLead } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SlashWorkingGroupLead'
import { TerminateWorkingGroupLead } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/TerminateWorkingGroupLead'
import { UpdateWorkingGroupBudget } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/UpdateWorkingGroupBudget'
import { CancelWorkingGroupLeadOpening } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/CancelWorkingGroupLeadOpening'
import {
  ApplicationForm,
  DurationAndProcess,
  StakingPolicyAndReward,
  WorkingGroupAndDescription,
} from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/CreateWorkingGroupLeadOpening'
import { FillWorkingGroupLeadOpening } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/WorkingGroupLeadOpening/FillWorkingGroupLeadOpening'
import { AddNewProposalMachineState } from '@/proposals/modals/AddNewProposal/machine'

import { SetInitialInvitationBalance } from './SetInitialInvitationBalance'
import { SetInitialInvitationCount } from './SetInitialInvitationCount'

interface SpecificParametersStepProps extends ValidationHelpers {
  state: AddNewProposalMachineState
}

export const SpecificParametersStep = ({ state, ...validationHelpers }: SpecificParametersStepProps) => {
  switch (true) {
    case state.matches('specificParameters.signal'):
      return <Signal />
    case state.matches('specificParameters.fundingRequest'):
      return <FundingRequest />
    case state.matches('specificParameters.runtimeUpgrade'):
      return <RuntimeUpgrade />
    case state.matches('specificParameters.setCouncilorReward'):
      return <SetCouncilorReward />
    case state.matches('specificParameters.setCouncilBudgetIncrement'):
      return <SetCouncilBudgetIncrement />
    case state.matches('specificParameters.fillWorkingGroupLeadOpening'):
      return <FillWorkingGroupLeadOpening />
    case state.matches('specificParameters.createWorkingGroupLeadOpening.workingGroupAndDescription'):
      return <WorkingGroupAndDescription {...validationHelpers} />
    case state.matches('specificParameters.createWorkingGroupLeadOpening.durationAndProcess'):
      return <DurationAndProcess />
    case state.matches('specificParameters.createWorkingGroupLeadOpening.applicationForm'):
      return <ApplicationForm />
    case state.matches('specificParameters.cancelWorkingGroupLeadOpening'):
      return <CancelWorkingGroupLeadOpening />
    case state.matches('specificParameters.createWorkingGroupLeadOpening.stakingPolicyAndReward'):
      return <StakingPolicyAndReward {...validationHelpers} />
    case state.matches('specificParameters.decreaseWorkingGroupLeadStake'):
      return <DecreaseWorkingGroupLeadStake />
    case state.matches('specificParameters.slashWorkingGroupLead'):
      return <SlashWorkingGroupLead />
    case state.matches('specificParameters.terminateWorkingGroupLead'):
      return <TerminateWorkingGroupLead />
    case state.matches('specificParameters.setWorkingGroupLeadReward'):
      return <SetWorkingGroupLeadReward />
    case state.matches('specificParameters.updateWorkingGroupBudget'):
      return <UpdateWorkingGroupBudget />
    case state.matches('specificParameters.setInitialInvitationCount'):
      return <SetInitialInvitationCount />
    case state.matches('specificParameters.setReferralCut'):
      return <SetReferralCut {...validationHelpers} />
    case state.matches('specificParameters.setMembershipLeadInvitationQuota'):
      return <SetMembershipLeadInvitationQuota />
    case state.matches('specificParameters.setInitialInvitationBalance'):
      return <SetInitialInvitationBalance />
    case state.matches('specificParameters.setMaxValidatorCount'):
      return <SetMaxValidatorCount {...validationHelpers} />
    case state.matches('specificParameters.setMembershipPrice'): {
      return <SetMembershipPrice />
    }
    default:
      return null
  }
}
