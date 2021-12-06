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
  'createBlogPost',
  'editBlogPost',
  'lockBlogPost',
  'unlockBlogPost',
  'veto',
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
  'setInitialInvitationCount',
  'setCouncilBudgetIncrement',
  'setCouncilorReward',
  'setMembershipLeadInvitationQuota',
  'setReferralCut',
  'setInitialInvitationBalance',
  'setMembershipPrice',
]

export const typenameToProposalDetails = (typename: string): ProposalType => {
  const details = typename.replace('ProposalDetails', '')

  return lowerFirstLetter(details) as ProposalType
}
