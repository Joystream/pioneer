import { ProposalDetails, ProposalStatus } from '@/proposals/types'

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

export const typenameToProposalDetails = (typename: string): ProposalDetails => {
  const details = typename.replace('ProposalDetails', '')
  console.log(details, details.charAt(0).toLowerCase() + status.slice(1))
  return (details.charAt(0).toLowerCase() + details.slice(1)) as ProposalDetails
}
