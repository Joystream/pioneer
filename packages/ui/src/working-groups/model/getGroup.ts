import { ApiRx } from '@polkadot/api'

import { groupExtrinsics, GroupName } from '../types'

export function getGroup(api: ApiRx, groupName: GroupName) {
  return api.tx[groupExtrinsics[groupName]]
}
