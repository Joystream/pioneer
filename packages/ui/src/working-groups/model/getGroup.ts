import { Api } from '@/api'

import { GroupIdName } from '../types'

export function getGroup(api: Api, groupName: GroupIdName) {
  return api.tx?.[groupName]
}
