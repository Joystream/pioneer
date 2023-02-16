import { ApiRx } from '@polkadot/api'
import { getPolkadotApiChainInfo } from 'injectweb3-connect'

import { ProxyApi } from '@/proxyApi'

import { MetadataDef } from '../types'

export const getChainMetadata = async (api: ProxyApi | ApiRx): Promise<MetadataDef> => {
  if ('_async' in api) {
    return await api._async.chainMetadata
  } else {
    return await getPolkadotApiChainInfo(api)
  }
}
