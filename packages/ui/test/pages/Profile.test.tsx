import React from 'react'
import { expect } from 'chai'
import { render } from '@testing-library/react'
import { Profile } from '../../src/pages/Profile/Profile'
import { aliceSigner, createMockKeyring } from '../mocks/keyring'
import { KeyringContext } from '../../src/providers/keyring/context'
import { cryptoWaitReady } from '@polkadot/util-crypto'

describe('UI: Profile', () => {
  before(() => cryptoWaitReady())

  it('Shows loading', () => {
    const profile = render(
      <KeyringContext.Provider value={createMockKeyring()}>
        <Profile />
      </KeyringContext.Provider>
    )
    expect(profile.getByText('Loading...')).to.not.be.empty
  })

  it('Renders accounts list for known addresses', () => {
    const profilePage = renderProfile()

    const [, accountsRowGroup] = [...profilePage.getAllByRole('rowgroup')]
    expect(accountsRowGroup.childNodes).to.have.length(1)
  })

  it("Displays account's data", () => {
    const profilePage = renderProfile()

    const alice = aliceSigner().address
    expect(profilePage.getByText(alice)?.previousSibling?.textContent).to.equal('alice')
  })

  function renderProfile() {
    return render(
      <KeyringContext.Provider value={createMockKeyring({ useMockAddresses: true })}>
        <Profile />
      </KeyringContext.Provider>
    )
  }
})
