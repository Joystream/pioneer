import { useGetLatestElectionQuery } from '@/council/queries'
import { asLatestElection } from '@/council/types/LatestElection'

interface Props {
  skip: boolean
}

export const useLatestElection = (props?: Props) => {
  const { loading, data } = useGetLatestElectionQuery({ skip: props?.skip })
  const rawElection = data?.electionRounds[0]

  return {
    isLoading: loading,
    election: rawElection && asLatestElection(rawElection),
  }
}
