import '@joystream/types'
import { ApiRx } from '@polkadot/api'
import { WsProvider } from '@polkadot/rpc-provider'

export type Api = ApiRx

export const Api = {
  create: (nodeRpcEndpoint: string) => {
    const provider = new WsProvider(nodeRpcEndpoint)
    return ApiRx.create({ provider })
  },
}
