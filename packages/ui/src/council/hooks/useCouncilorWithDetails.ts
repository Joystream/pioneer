import {sumStakes} from '@/common/utils/bn';

import {useGetCouncilorVoterStakeQuery} from '../queries'
import {useMemo} from 'react';
import {ElectedCouncil} from '@/council/types';


export const useCouncilorWithDetails = (council?: ElectedCouncil) => {
  const cycleId = council?.electionCycleId
  const electionRound =  cycleId ? { cycleId } : { isFinished_eq: false }
  const { data, loading } = useGetCouncilorVoterStakeQuery({ skip: !council, variables: { electionRound } })
  const councilors = useMemo(() =>
      Array.from(council?.councilors ?? []).map(councilor => ({
        ...councilor,
        voterStake: data && sumStakes(data.candidates.find(({memberId}) => councilor.member.id === memberId)?.votesReceived ?? []),
      })),
    [data, council],
  )
  return { isLoading: loading, councilors }}
