import { useApi } from '@/api/hooks/useApi'

import { GroupIdName } from '../types'

export const useGroupMaxWorkersNumber = (groupId: GroupIdName) => {
  const { api } = useApi()
  const maxWorkerNumber = api?.consts[groupId].maxWorkerNumberLimit
  return maxWorkerNumber?.toNumber()
}
