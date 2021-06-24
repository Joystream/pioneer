import { lowerFirstLetter } from '../../common/helpers'
import { ProposalDetails } from '../types'

export const proposalDetails: ProposalDetails[] = [
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

export const enabledProposals: ProposalDetails[] = ['signal']

export const typenameToProposalDetails = (typename: string): ProposalDetails => {
  const details = typename.replace('ProposalDetails', '')

  return lowerFirstLetter(details) as ProposalDetails
}
