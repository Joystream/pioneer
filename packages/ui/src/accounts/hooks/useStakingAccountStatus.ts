import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

type StakingStatus = 'unknown' | 'free' | 'other' | 'candidate' | 'confirmed'

export const useStakingAccountStatus = (address?: string, memberId?: string): StakingStatus => {
  const { api } = useApi()

  const stakingAccountInfoSize = useObservable(
    address ? api?.query.members.stakingAccountIdMemberStatus.size(address) : undefined,
    [api, address]
  )
  const stakingAccountInfo = useObservable(
    address ? api?.query.members.stakingAccountIdMemberStatus(address) : undefined,
    [api, address]
  )

  if (!stakingAccountInfoSize || !stakingAccountInfo) {
    return 'unknown'
  }

  if (stakingAccountInfoSize.isEmpty) {
    return 'free'
  }

  if (!stakingAccountInfo.member_id.eq(parseInt(memberId ?? '-1'))) {
    return 'other'
  }

  return stakingAccountInfo.confirmed.isTrue ? 'confirmed' : 'candidate'
}
