import { useMemo } from 'react'

import { useGetProposalsCountQuery } from '@/proposals/queries'

type ProposalStatus =
  | 'ProposalStatusGracing'
  | 'ProposalStatusExecuted'
  | 'ProposalStatusRejected'
  | 'ProposalStatusSlashed'

export const useProposalsCount = () => {
  const toBeDecided = useGetProposalsCountQuery({
    variables: {
      where: {
        isFinalized_eq: false,
        status_json: { isTypeOf_not: 'ProposalStatusGracing' },
      },
    },
  })

  // NOTE: `isTypeOf_in` is not currently supported by Hydra
  const approved = [
    useProposalsCountByStatus('ProposalStatusGracing'),
    useProposalsCountByStatus('ProposalStatusExecuted'),
  ]
  const rejected = [
    useProposalsCountByStatus('ProposalStatusRejected'),
    useProposalsCountByStatus('ProposalStatusSlashed'),
  ]

  return useMemo(
    () => ({
      toBeDecided: { isLoading: toBeDecided.loading, count: toBeDecided.data?.proposalsConnection.totalCount ?? 0 },
      approved: toResult(approved),
      rejected: toResult(rejected),
    }),
    [toBeDecided, approved, rejected]
  )
}

type QueryResult = ReturnType<typeof useGetProposalsCountQuery>
const useProposalsCountByStatus = (isTypeOf_eq: ProposalStatus, skip = false): QueryResult =>
  useGetProposalsCountQuery({ variables: { where: { status_json: { isTypeOf_eq } } }, skip })

const toResult = (queryResults: QueryResult[]) => ({
  isLoading: queryResults.some((result) => result.loading),
  count: queryResults.reduce((count, result) => count + (result.data?.proposalsConnection.totalCount ?? 0), 0),
})
