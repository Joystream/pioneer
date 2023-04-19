import { GetProposalQuery, useGetPayloadDataObjectIdQuery, useGetProposalQuery } from '@/proposals/queries'
import { asProposalWithDetails, ProposalWithDetails } from '@/proposals/types'

interface UseProposal {
  isLoading: boolean
  proposal: ProposalWithDetails | null
}

export const useProposal = (id: string): UseProposal => {
  const params = { variables: { where: { id: id } } }

  const { loading, data } = useGetProposalQuery(params)
  const payloadDataObjectId = usePayloadDataObjectId(data?.proposal)

  return {
    isLoading: loading,
    proposal: data && data.proposal ? asProposalWithDetails(data.proposal, { payloadDataObjectId }) : null,
  }
}

const usePayloadDataObjectId = (proposal: GetProposalQuery['proposal']): string | undefined => {
  const payloadHash =
    (proposal?.details.__typename === 'UpdateChannelPayoutsProposalDetails' && proposal.details.payloadHash) ||
    undefined
  const isExecuted = proposal?.status.__typename === 'ProposalStatusExecuted'
  const inBlock = (isExecuted && proposal?.statusSetAtBlock) || undefined
  const { data } = useGetPayloadDataObjectIdQuery({
    variables: { inBlock: inBlock ?? 0, payloadHash: payloadHash ?? '' },
    skip: !inBlock || !payloadHash,
  })
  return data?.channelPayoutsUpdatedEvents[0].payloadDataObjectId
}
