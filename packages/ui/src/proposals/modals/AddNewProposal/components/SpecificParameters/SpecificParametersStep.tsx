import React from 'react'

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
import { UpdateChannelPayouts } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/UpdateChannelPayouts/UpdateChannelPayouts'
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

interface SpecificParametersStepProps {
  matches: AddNewProposalMachineState['matches']
}

export const SpecificParametersStep = ({ matches }: SpecificParametersStepProps) => {
  switch (true) {
    case matches('specificParameters.signal'):
      return <Signal />
    case matches('specificParameters.fundingRequest'):
      return <FundingRequest />
    case matches('specificParameters.runtimeUpgrade'):
      return <RuntimeUpgrade />
    case matches('specificParameters.setCouncilorReward'):
      return <SetCouncilorReward />
    case matches('specificParameters.setCouncilBudgetIncrement'):
      return <SetCouncilBudgetIncrement />
    case matches('specificParameters.fillWorkingGroupLeadOpening'):
      return <FillWorkingGroupLeadOpening />
    case matches('specificParameters.createWorkingGroupLeadOpening.workingGroupAndDescription'):
      return <WorkingGroupAndDescription />
    case matches('specificParameters.createWorkingGroupLeadOpening.durationAndProcess'):
      return <DurationAndProcess />
    case matches('specificParameters.createWorkingGroupLeadOpening.applicationForm'):
      return <ApplicationForm />
    case matches('specificParameters.cancelWorkingGroupLeadOpening'):
      return <CancelWorkingGroupLeadOpening />
    case matches('specificParameters.createWorkingGroupLeadOpening.stakingPolicyAndReward'):
      return <StakingPolicyAndReward />
    case matches('specificParameters.decreaseWorkingGroupLeadStake'):
      return <DecreaseWorkingGroupLeadStake />
    case matches('specificParameters.slashWorkingGroupLead'):
      return <SlashWorkingGroupLead />
    case matches('specificParameters.terminateWorkingGroupLead'):
      return <TerminateWorkingGroupLead />
    case matches('specificParameters.setWorkingGroupLeadReward'):
      return <SetWorkingGroupLeadReward />
    case matches('specificParameters.updateWorkingGroupBudget'):
      return <UpdateWorkingGroupBudget />
    case matches('specificParameters.setInitialInvitationCount'):
      return <SetInitialInvitationCount />
    case matches('specificParameters.setReferralCut'):
      return <SetReferralCut />
    case matches('specificParameters.setMembershipLeadInvitationQuota'):
      return <SetMembershipLeadInvitationQuota />
    case matches('specificParameters.setInitialInvitationBalance'):
      return <SetInitialInvitationBalance />
    case matches('specificParameters.setMaxValidatorCount'):
      return <SetMaxValidatorCount />
    case matches('specificParameters.setMembershipPrice'): {
      return <SetMembershipPrice />
    }
    case matches('specificParameters.updateChannelPayouts'): {
      return <UpdateChannelPayouts />
    }
    default:
      return null
  }
}
