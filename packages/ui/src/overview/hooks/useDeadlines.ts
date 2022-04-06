import { ProposalWhereInput } from '@/common/api/queries'
import { DeadlineNamespace } from '@/overview/components/DeadlineList/DeadlineList'
import { useGetProposalsLazyQuery } from '@/proposals/queries'
import { asProposal } from '@/proposals/types'

export const useDeadlines = () => {
  const where: ProposalWhereInput = { status_json: { isTypeOf_eq: 'ProposalStatusDeciding' } }

  const [get1, { loading: proposalLoading, data }] = useGetProposalsLazyQuery({ variables: { where } })

  const fetchAllDeadlines = () => {
    get1()
  }

  return {
    fetchDeadlines: fetchAllDeadlines,
    isLoading: proposalLoading,
    proposals: data && data.proposals ? data.proposals.map(asProposal) : [],
  }
}
