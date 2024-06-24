import { lowerFirstLetter } from '../../common/helpers'
import { ProposalType } from '../types'

export const proposalDetails: ProposalType[] = [
  'signal',
  'runtimeUpgrade',
  'fundingRequest',
  'setMaxValidatorCount',
  'createWorkingGroupLeadOpening',
  'fillWorkingGroupLeadOpening',
  'updateWorkingGroupBudget',
  'decreaseWorkingGroupLeadStake',
  'slashWorkingGroupLead',
  'setWorkingGroupLeadReward',
  'terminateWorkingGroupLead',
  'amendConstitution',
  'cancelWorkingGroupLeadOpening',
  'setMembershipPrice',
  'setCouncilBudgetIncrement',
  'setCouncilorReward',
  'setInitialInvitationBalance',
  'setInitialInvitationCount',
  'setMembershipLeadInvitationQuota',
  'setReferralCut',
  'veto',
  'updateChannelPayouts',
  'updatePalletFrozenStatus',
  'setEraPayoutDampingFactor',
  'decreaseCouncilBudget',
  'updateTokenPalletTokenConstraints',
  'updateArgoBridgeConstraints',
]

export const enabledProposals: ProposalType[] = [
  'signal',
  'runtimeUpgrade',
  'fundingRequest',
  'createWorkingGroupLeadOpening',
  'cancelWorkingGroupLeadOpening',
  'decreaseWorkingGroupLeadStake',
  'slashWorkingGroupLead',
  'setWorkingGroupLeadReward',
  'setMaxValidatorCount',
  'terminateWorkingGroupLead',
  'fillWorkingGroupLeadOpening',
  'updateWorkingGroupBudget',
  'setInitialInvitationCount',
  'setCouncilBudgetIncrement',
  'setCouncilorReward',
  'setMembershipLeadInvitationQuota',
  'setReferralCut',
  'setInitialInvitationBalance',
  'setMembershipPrice',
  'updateChannelPayouts',
  'updatePalletFrozenStatus',
  'setEraPayoutDampingFactor',
  'decreaseCouncilBudget',
  'updateTokenPalletTokenConstraints',
  'updateArgoBridgeConstraints',
]

export const typenameToProposalDetails = (typename: string): ProposalType => {
  const details = typename.replace('ProposalDetails', '')

  return lowerFirstLetter(details) as ProposalType
}
