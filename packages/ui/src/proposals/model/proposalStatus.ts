import { ProposalStatus } from '@/proposals/types'

export const proposalActiveStatuses: ProposalStatus[] = ['deciding', 'gracing', 'dormant']
export const proposalPastStatuses: ProposalStatus[] = [
  'vetoed',
  'executed',
  'executionFailed',
  'slashed',
  'rejected',
  'expired',
  'cancelled',
  'canceledByRuntime',
]

export const isProposalActive = (status: ProposalStatus) => proposalActiveStatuses.includes(status)

export const proposalStatuses: ProposalStatus[] = [...proposalActiveStatuses, ...proposalPastStatuses]

export const typenameToProposalStatus = (typename: string): ProposalStatus => {
  const status = typename.replace('ProposalStatus', '')
  console.log(status, status.charAt(0).toLowerCase() + status.slice(1))
  return (status.charAt(0).toLowerCase() + status.slice(1)) as ProposalStatus
}
