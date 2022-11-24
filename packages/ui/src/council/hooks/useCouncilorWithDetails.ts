import { useMemo } from 'react'

import { ElectionRoundWhereInput } from '@/common/api/queries'
import { sumStakes } from '@/common/utils/bn'
import { ElectedCouncil } from '@/council/types'

import { useGetCouncilorVoterStakeQuery } from '../queries'

export const useCouncilorWithDetails = (council?: ElectedCouncil) => {
  const cycleId = council?.electionCycleId
  const electionRound: ElectionRoundWhereInput = cycleId ? { cycleId_eq: cycleId } : { isFinished_eq: false }
  const { data, loading } = useGetCouncilorVoterStakeQuery({ skip: !council, variables: { electionRound } })
  const councilors = useMemo(
    () =>
      Array.from(council?.councilors ?? []).map((councilor) => ({
        ...councilor,
        voterStake:
          data &&
          sumStakes(data.candidates.find(({ memberId }) => councilor.member.id === memberId)?.votesReceived ?? []),
      })),
    [data, council]
  )
  return { isLoading: loading, councilors }
}
