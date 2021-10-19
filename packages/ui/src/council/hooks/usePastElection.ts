import { useGetPastElectionQuery } from '@/council/queries'

import { asPastElection } from '../types/PastElection'

export const usePastElection = (id: string) => {
  const { loading, data } = useGetPastElectionQuery({ variables: { id } })

  return {
    isLoading: loading,
    election: data && data.electionRoundByUniqueInput && asPastElection(data.electionRoundByUniqueInput),
  }
}
