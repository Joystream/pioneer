import { useEffect } from 'react'

import { isDefined } from '@/common/utils'
import { useGetLatestElectionLazyQuery } from '@/council/queries'
import { asLatestElection } from '@/council/types/LatestElection'

import { useElectionStage } from './useElectionStage'

interface Props {
  skip?: boolean
}

export const useLatestElection = ({ skip }: Props) => {
  const [fetch, { loading, data }] = useGetLatestElectionLazyQuery()
  const { stage, changedAt } = useElectionStage()
  const rawElection = data?.electionRounds[0]

  useEffect(() => {
    if (!skip && isDefined(changedAt) && (!data || stage === 'announcing')) {
      fetch()
    }
  }, [changedAt])

  return {
    isLoading: loading,
    election: rawElection && asLatestElection(rawElection),
  }
}
