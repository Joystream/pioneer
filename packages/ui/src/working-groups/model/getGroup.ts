import { ApiRx } from '@polkadot/api'

import { GroupIdName } from '../types'

export function getGroup(api: ApiRx, groupName: GroupIdName) {
  return api.tx[groupName]
}
