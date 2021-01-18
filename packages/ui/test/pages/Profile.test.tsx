import React from 'react'
import { expect } from 'chai'
import { render } from '@testing-library/react'
import keyring from '@polkadot/ui-keyring'
import { Profile } from '../../src/pages/Profile/Profile'
import { SubstrateContext } from '../../src/providers/substrate/context'
import { State, types } from '../../src/providers/substrate/reducer'
import { aliceSigner, MemoryStore } from '../mocks/keyring'
import { createApiWithAugmentations } from '../mocks/api'

describe('UI: Profile', () => {
  const state: State = {
    keyringState: 'READY',
    api: createApiWithAugmentations(),
    keyring: keyring,
    socket: 'ws://',
    apiState: 'READY',
    jsonrpc: {},
    types: types,
  }

  before(() => {
    keyring.loadAll({ isDevelopment: true, store: new MemoryStore() })
  })

  it('Shows loading', () => {
    const profile = render(<Profile />)
    expect(profile.getByText('Loading...')).to.not.be.empty
  })

  it('Renders accounts list for known addresses', () => {
    const profilePage = renderProfile()

    const [, accountsRowGroup] = [...profilePage.getAllByRole('rowgroup')]
    expect(accountsRowGroup.childNodes).to.have.length(8)
  })

  it("Displays account's data", () => {
    const profilePage = renderProfile()

    const alice = aliceSigner().address
    expect(profilePage.getByText(alice)?.previousSibling?.textContent).to.equal('alice')
  })

  function renderProfile() {
    return render(
      <SubstrateContext.Provider value={state}>
        <Profile />
      </SubstrateContext.Provider>
    )
  }
})
