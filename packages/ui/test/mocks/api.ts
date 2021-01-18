import { ApiPromise, WsProvider } from '@polkadot/api'
import { TypeRegistry } from '@polkadot/types'
import { Metadata } from '@polkadot/metadata'
import metaStatic from '@polkadot/metadata/static'

export function createApiWithAugmentations(): ApiPromise {
  const registry = new TypeRegistry()
  const metadata = new Metadata(registry, metaStatic)

  registry.setMetadata(metadata)

  const api = new ApiPromise({ provider: new WsProvider('ws://', false), registry })

  api.injectMetadata(metadata, true)

  return api
}
