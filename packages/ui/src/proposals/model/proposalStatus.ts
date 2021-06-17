import { lowerFirstLetter, capitalizeFirstLetter } from '../../common/helpers'
import { ProposalStatus } from '../types'

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

  return lowerFirstLetter(status) as ProposalStatus
}

export const proposalStatusToTypename = (status: ProposalStatus) => {
  return 'ProposalStatus' + capitalizeFirstLetter(status)
}
