import { registry, types } from '@joystream/types'
import '@joystream/types/augment/augment-api'
import '@joystream/types/augment/augment-types'
import { ApiRx, WsProvider } from '@polkadot/api'
import rpc from '@polkadot/types/interfaces/jsonrpc'

export type Api = ApiRx

export const Api = {
  create: (nodeRpcEndpoint: string) => {
    const provider = new WsProvider(nodeRpcEndpoint)
    return ApiRx.create({ provider, rpc, types, registry })
  },
}
