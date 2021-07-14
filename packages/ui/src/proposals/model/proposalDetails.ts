import { lowerFirstLetter } from '@/common/helpers'

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

export const enabledProposals: ProposalType[] = ['fundingRequest', 'createWorkingGroupLeadOpening']

export const typenameToProposalDetails = (typename: string): ProposalType => {
  const details = typename.replace('ProposalDetails', '')

  return lowerFirstLetter(details) as ProposalType
}
