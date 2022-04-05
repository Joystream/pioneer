import {BN_ZERO} from '@/common/constants';
import {sumStakes} from '@/common/utils/bn';

import { useGetVoterStakeQuery } from '../queries'


export const useVoteStake = (membersIds: string[], electionRoundId?: string) => {
  const {data, loading} = useGetVoterStakeQuery({ variables: {id: electionRoundId ?? '', member_in: membersIds}})

  return {
    isLoading: loading,
    stake: data?.candidates ? sumStakes(data.candidates[0].votesReceived) : BN_ZERO,
  }
}
