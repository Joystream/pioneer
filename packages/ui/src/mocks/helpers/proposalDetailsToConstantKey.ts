import { Api } from '@/api'
import { ProposalFieldsFragment } from '@/proposals/queries'

export type ProposalDetailsType =
  | ProposalFieldsFragment['details']['__typename']
  | 'FundingRequestMultipleRecipientsProposalDetails'

export const proposalDetailsToConstantKey = (details: ProposalDetailsType) =>
  proposalDetailsToConstantKeyMap.get(details) as string

const proposalDetailsToConstantKeyMap = new Map<ProposalDetailsType, keyof Api['consts']['proposalsCodex']>([
  ['AmendConstitutionProposalDetails', 'amendConstitutionProposalParameters'],
  ['CancelWorkingGroupLeadOpeningProposalDetails', 'cancelWorkingGroupLeadOpeningProposalParameters'],
  ['CreateWorkingGroupLeadOpeningProposalDetails', 'createWorkingGroupLeadOpeningProposalParameters'],
  ['DecreaseWorkingGroupLeadStakeProposalDetails', 'decreaseWorkingGroupLeadStakeProposalParameters'],
  ['FillWorkingGroupLeadOpeningProposalDetails', 'fillWorkingGroupOpeningProposalParameters'],
  ['FundingRequestProposalDetails', 'fundingRequestProposalParameters'],
  ['FundingRequestMultipleRecipientsProposalDetails', 'fundingRequestProposalParameters'],
  ['RuntimeUpgradeProposalDetails', 'runtimeUpgradeProposalParameters'],
  ['SetCouncilBudgetIncrementProposalDetails', 'setCouncilBudgetIncrementProposalParameters'],
  ['SetCouncilorRewardProposalDetails', 'setCouncilorRewardProposalParameters'],
  ['SetInitialInvitationBalanceProposalDetails', 'setInitialInvitationBalanceProposalParameters'],
  ['SetInitialInvitationCountProposalDetails', 'setInvitationCountProposalParameters'],
  ['SetMaxValidatorCountProposalDetails', 'setMaxValidatorCountProposalParameters'],
  ['SetMembershipLeadInvitationQuotaProposalDetails', 'setMembershipLeadInvitationQuotaProposalParameters'],
  ['SetMembershipPriceProposalDetails', 'setMembershipPriceProposalParameters'],
  ['SetReferralCutProposalDetails', 'setReferralCutProposalParameters'],
  ['SetWorkingGroupLeadRewardProposalDetails', 'setWorkingGroupLeadRewardProposalParameters'],
  ['SignalProposalDetails', 'signalProposalParameters'],
  ['SlashWorkingGroupLeadProposalDetails', 'slashWorkingGroupLeadProposalParameters'],
  ['TerminateWorkingGroupLeadProposalDetails', 'terminateWorkingGroupLeadProposalParameters'],
  ['UpdateChannelPayoutsProposalDetails', 'updateChannelPayoutsProposalParameters'],
  ['UpdateWorkingGroupBudgetProposalDetails', 'updateWorkingGroupBudgetProposalParameters'],
  ['VetoProposalDetails', 'vetoProposalProposalParameters'],
])
