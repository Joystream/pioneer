import React from 'react'
import { expect } from 'chai'
import { render } from '@testing-library/react'
import keyring, { Keyring } from '@polkadot/ui-keyring'
import { Profile } from '../../src/pages/Profile/Profile'
import { aliceSigner, MemoryStore } from '../mocks/keyring'
import { KeyringContext } from '../../src/providers/keyring/context'

describe('UI: Profile', () => {
  before(() => {
    keyring.loadAll({ isDevelopment: true, store: new MemoryStore() })
  })

  it.skip('Shows loading', () => {
    const keyring = new Keyring()

    const profile = render(
      <KeyringContext.Provider value={keyring}>
        <Profile />
      </KeyringContext.Provider>
    )
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
      <KeyringContext.Provider value={keyring}>
        <Profile />
      </KeyringContext.Provider>
    )
  }
})
