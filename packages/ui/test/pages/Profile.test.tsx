import React from 'react'
import { expect } from 'chai'
import { render, screen } from '@testing-library/react'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { TypeRegistry } from '@polkadot/types'
import metaStatic from '@polkadot/metadata/static'
import { Metadata } from '@polkadot/metadata'
import keyring from '@polkadot/ui-keyring'
import { Profile } from '../../src/pages/Profile/Profile'
import { SubstrateContext } from '../../src/providers/substrate/context'
import { State, types } from '../../src/providers/substrate/reducer'
import { aliceSigner, MemoryStore } from '../mocks/keyring'

export function createApiWithAugmentations(): ApiPromise {
  const registry = new TypeRegistry()
  const metadata = new Metadata(registry, metaStatic)

  registry.setMetadata(metadata)

  const api = new ApiPromise({ provider: new WsProvider('ws://', false), registry })

  api.injectMetadata(metadata, true)

  return api
}

describe('UI: Profile', () => {
  before(() => {
    keyring.loadAll({ isDevelopment: true, store: new MemoryStore() })
  })

  it('Shows loading', () => {
    render(<Profile />)
    expect(screen.getByText('Loading...')).to.not.be.empty
  })

  it('Renders accounts list for known addresses', () => {
    const state: State = {
      keyringState: 'READY',
      api: createApiWithAugmentations(),
      keyring: keyring,
      socket: 'ws://',
      apiState: 'READY',
      jsonrpc: {},
      types: types,
    }

    render(
      <SubstrateContext.Provider value={state}>
        <Profile />
      </SubstrateContext.Provider>
    )
    const alice = aliceSigner().address
    expect(screen.getByText(alice)).to.not.be.empty
  })
})
