import { useMemo } from 'react'

import { useGetProposalsCountQuery } from '@/proposals/queries'

type Result = 'approved' | 'rejected' | 'all'

const approvedStages = ['ProposalStatusGracing', 'ProposalStatusExecuted']
const rejectedStages = ['ProposalStatusRejected', 'ProposalStatusSlashed']

export const useProposalsCount = (result: Result) => {
  const variables = useMemo(() => {
    switch (result) {
      case 'approved':
        return { where: { status_json: { isTypeOf_in: approvedStages } } }
      case 'rejected':
        return { where: { status_json: { isTypeOf_in: rejectedStages } } }
      case 'all':
      default:
        return { where: { isFinalized_eq: false } }
    }
  }, [result])

  const { loading, data } = useGetProposalsCountQuery({ variables })

  return {
    loading: loading,
    count: data?.proposalsConnection.totalCount,
  }
}
