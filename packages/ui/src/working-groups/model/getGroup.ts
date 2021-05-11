import { ApiRx } from '@polkadot/api'

import { groupExtrinsics, GroupName } from '../types'

export function getGroup(api?: ApiRx, groupName?: GroupName | string) {
  if (api && groupName && groupName in groupExtrinsics) {
    return api.tx[groupExtrinsics[groupName as GroupName]]
  }
}
