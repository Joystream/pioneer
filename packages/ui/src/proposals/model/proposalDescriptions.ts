import { DisabledProposal, ProposalType } from '@/proposals/types'

type ProposalDescriptions = {
  [key in ProposalType | DisabledProposal]: string
}
export const proposalDescriptions: ProposalDescriptions = {
  signal:
    'Think of signal as the what, whereas rationale parameter in other proposals would be the why. Signal proposal does not effect any platform parameters when accepted. ',
  fundingRequest: 'Request to credit council budget and transfer tokens to specified accounts.',
  setMaxValidatorCount: 'Specifies maximum allowed validator workers on the platform.',
  createWorkingGroupLeadOpening:
    'Same effect as when creating an opening for workers in the given group with given inputs, except the opening type is for lead.',
  fillWorkingGroupLeadOpening: 'Same effect as when filling opening in group for worker with given inputs.',
  updateWorkingGroupBudget:
    'Positive budget update gets debited from the council budget and credited to the group budget, otherwise the reverse.',
  decreaseWorkingGroupLeadStake: 'Same effect as when decreasing worker stake in group with given inputs.',
  slashWorkingGroupLead: 'Same effect as slashing worker in the group, the staking account gets slashed.',
  setWorkingGroupLeadReward: 'Same effect as updating the reward of the worker.',
  terminateWorkingGroupLead:
    'Same as when terminating a worker in group with given inputs, and removing lead designation.',
  amendConstitution: 'Proposal to amend constitution. Does not effect platform parameters.',
  cancelWorkingGroupLeadOpening: 'Same as when cancelling an opening for workers in the given group with given inputs.',
  setMembershipPrice: 'Sets new membership price.',
  setCouncilBudgetIncrement:
    'This proposal sets how much tokens is added to council budget every new budget period. This budget is spent on working groups, spending proposals and council rewards.',
  setCouncilorReward:
    'All councilors are paid out the same flat reward rate from the councillor budget, subject to budget constraints. ',
  setInitialInvitationBalance:
    'Invitation balance is deposited to new member’s account to cover basic transactions. This balance can only be used on fees.',
  setInitialInvitationCount:
    'New members have default allocation of new members invite. Invites can be transferred to other members.',
  setMembershipLeadInvitationQuota:
    'Membership Workgroup Lead is automatically assigned invitations upon taking the role. This proposals is aimed on managing this invitations count.',
  setReferralCut:
    'Referrals, same as new membership invitations are incentivised by the platform. Referral cut entails the reward to the originator of invitation links which resulted in new memberships.',
  updateChannelPayouts:
    'Proposal to submit the Channel Incentives Payout payload, update the min/max claimable amounts and block/allow claiming of awarded JOYs by channels.',
  runtimeUpgrade: 'Proposal to upgrade version to the new runtime.',
  createBlogPost: 'Council blog',
  editBlogPost: 'Unlocked blog post can be edited.',
  lockBlogPost: 'When a post is locked it can no longer be modified.',
  unlockBlogPost: 'Unlocked post can be modified.',
  veto: 'Veto for a particular, previously issued proposal. Vetoed proposal is automatically discarded.',
}
