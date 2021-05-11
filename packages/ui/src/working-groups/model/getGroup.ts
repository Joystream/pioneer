import { ApiRx } from '@polkadot/api'

import { groupExtrinsics } from '../types'

export function getGroup(api?: ApiRx, groupName?: string) {
  if (api && groupName && groupName in groupExtrinsics) {
    const name = groupName as keyof typeof groupExtrinsics
    return api.tx[groupExtrinsics[name]]
  }
}
