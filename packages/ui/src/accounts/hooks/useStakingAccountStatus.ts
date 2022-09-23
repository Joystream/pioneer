import { useApi } from '@/api/hooks/useApi'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'

export type StakingStatus = 'unknown' | 'free' | 'other' | 'candidate' | 'confirmed'

export const useStakingAccountStatus = (address?: string, memberId?: string): StakingStatus => {
  const { api } = useApi()

  const stakingAccountInfoSize = useFirstObservableValue(
    () => (address ? api?.query.members.stakingAccountIdMemberStatus.size(address) : undefined),
    [api?.isConnected, address]
  )
  const stakingAccountInfo = useFirstObservableValue(
    () => (address ? api?.query.members.stakingAccountIdMemberStatus(address) : undefined),
    [api?.isConnected, address]
  )

  if (!stakingAccountInfoSize || !stakingAccountInfo) {
    return 'unknown'
  }

  if (stakingAccountInfoSize.isEmpty) {
    return 'free'
  }

  if (!stakingAccountInfo.memberId.eq(String(memberId ?? '-1'))) {
    return 'other'
  }

  return stakingAccountInfo.confirmed.isTrue ? 'confirmed' : 'candidate'
}
