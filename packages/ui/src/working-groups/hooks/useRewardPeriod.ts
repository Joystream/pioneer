import { u32 } from '@polkadot/types'

import { useApi } from '@/api/hooks/useApi'

import { GroupIdName } from '../types'

export const useRewardPeriod = (groupId?: GroupIdName) => {
  const { api } = useApi()
  const rewardPeriod = (groupId && api?.consts[groupId]?.rewardPeriod) as u32 | undefined
  return rewardPeriod?.toBn()
}
