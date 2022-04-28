import {BN_ZERO} from '@/common/constants';
import {sumStakes} from '@/common/utils/bn';

import { useGetVoterStakeQuery, useGetElectionRoundQuery } from '../queries'


export const useVoteStake = (membersIds: string[]) => {
  const {data: electionRound} = useGetElectionRoundQuery()
  const electionCycleId = electionRound ? electionRound?.electedCouncils[0].councilElections[0].cycleId : ''
  console.log('electionCycleId', electionCycleId)
  console.log('toStr', electionCycleId.toString())
  const {data, loading} = useGetVoterStakeQuery({ variables: {id: electionCycleId.toString() ?? '', member_in: membersIds}})
  console.log('cand', data?.candidates)
  return {
    isLoading: loading,
    stake: data?.candidates ? sumStakes(data.candidates[0].votesReceived) : BN_ZERO,
  }
}
