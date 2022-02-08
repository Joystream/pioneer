import { useApi } from '@/common/hooks/useApi'

import { GroupIdName } from '../types'

export const useGroupMaxWorkersNumber = (groupId: GroupIdName) => {
  const { api } = useApi()
  const maxWorkerNumber = groupId && api?.consts[groupId].maxWorkerNumberLimit
  return maxWorkerNumber?.toNumber()
}
