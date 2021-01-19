import React from 'react'
import { expect } from 'chai'
import sinon from 'sinon'
import { render } from '@testing-library/react'
import { Keyring } from '@polkadot/ui-keyring'
import { Profile } from '../../src/pages/Profile/Profile'
import { aliceSigner, MemoryStore } from '../mocks/keyring'
import { KeyringContext } from '../../src/providers/keyring/context'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useAccountsModule = require('../../src/hooks/useAccounts')

describe('UI: Profile', () => {
  context('with empty keyring', () => {
    after(() => {
      sinon.restore()
    })

    it('Shows loading screen', () => {
      sinon.stub(useAccountsModule, 'useAccounts').returns({
        hasAccounts: false,
        allAccounts: [],
      })

      const profile = render(<Profile />)
      expect(profile.getByText('Loading...')).to.exist
    })
  })

  context('with development accounts', () => {
    let keyring: Keyring

    before(() => {
      keyring = new Keyring()
      keyring.loadAll({ isDevelopment: true, store: new MemoryStore() })
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
})
