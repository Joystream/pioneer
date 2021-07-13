import { typenameToProposalDetails } from '../model/proposalDetails'
import { ProposalWithDetailsFieldsFragment } from '../queries'

import { ProposalType } from './proposals'

type DetailsFragment = ProposalWithDetailsFieldsFragment['details']
type ProposalDetailsTypename = DetailsFragment['__typename']

interface BaseProposalDetails {
  type: Exclude<ProposalType, 'fundingRequest'>
}

interface FundingRequestDetails {
  type: 'fundingRequest'
  destinations?: {
    account: string
    amount: number
  }[]
}

export type ProposalDetails = BaseProposalDetails | FundingRequestDetails

const asFundingRequest = (
  fragment: DetailsFragment & { __typename: 'FundingRequestProposalDetails' }
): FundingRequestDetails => {
  return {
    type: 'fundingRequest',
    destinations: fragment.destinationsList?.destinations.map((d) => ({ account: d.account, amount: d.amount })),
  }
}

interface DetailsCast<T extends { __typename: string }> {
  (fragment: T & DetailsFragment): any
}

const detailsCasts: Partial<Record<ProposalDetailsTypename, DetailsCast<any>>> = {
  FundingRequestProposalDetails: asFundingRequest,
}

export const asProposalDetails = (fragment: DetailsFragment): ProposalDetails => {
  const type = fragment.__typename as ProposalDetailsTypename
  if (fragment.__typename in detailsCasts) {
    return detailsCasts[type]?.(fragment)
  }
  return { type: typenameToProposalDetails(fragment.__typename) }
}
