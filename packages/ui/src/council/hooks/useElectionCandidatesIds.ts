import { useMemo } from 'react'

import { useGetElectionCandidatesIdsQuery } from '../queries'

export const useElectionCandidatesIds = (electionCycleId = -1) => {
  const { data } = useGetElectionCandidatesIdsQuery({ variables: { electionCycleId } })
  return useMemo(() => data?.candidates.map((candidate) => candidate.id), [data])
}
