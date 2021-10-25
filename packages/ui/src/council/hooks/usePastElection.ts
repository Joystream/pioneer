import { useGetPastElectionQuery } from '@/council/queries'

import { asPastElectionWithDetails } from '../types/PastElection'

export const usePastElection = (id: string) => {
  const { loading, data } = useGetPastElectionQuery({ variables: { id } })

  return {
    isLoading: loading,
    election: data && data.electionRoundByUniqueInput && asPastElectionWithDetails(data.electionRoundByUniqueInput),
  }
}
