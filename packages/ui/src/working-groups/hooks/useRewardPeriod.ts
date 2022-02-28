import { useApi } from '@/common/hooks/useApi'

import { GroupIdName } from '../types'

export const useRewardPeriod = (groupId?: GroupIdName) => {
  const { api } = useApi()
  const rewardPeriod = groupId && api?.consts[groupId]?.rewardPeriod
  return rewardPeriod?.toBn()
}
