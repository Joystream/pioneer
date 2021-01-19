import { Keyring } from '@polkadot/ui-keyring'
import { render } from '@testing-library/react'
import { expect } from 'chai'
import React from 'react'
import sinon from 'sinon'
import { Profile } from '../../src/pages/Profile/Profile'
import { KeyringContext } from '../../src/providers/keyring/context'
import { aliceSigner } from '../mocks/keyring'

describe('UI: Profile', () => {
  context('with empty keyring', () => {
    after(() => {
      sinon.restore()
    })

    it('Shows loading screen', async () => {
      const useAccountsModule = await import('../../src/hooks/useAccounts')

      sinon.stub(useAccountsModule, 'useAccounts').returns({
        hasAccounts: false,
        allAccounts: [],
      })

      const profile = render(<Profile />)
      expect(profile.getByText('Loading...')).to.exist
    })
  })

  context('with development accounts', () => {

    it('Renders accounts list for known addresses', async () => {
      const { findAllByRole } = renderProfile()

      const [, accountsRowGroup] = [...await findAllByRole('rowgroup')]
      expect(accountsRowGroup.childNodes).to.have.length(8)
    })

    it("Displays account's data", async () => {
      const { findByText } = renderProfile()

      const alice = aliceSigner().address
      expect((await findByText(alice))?.previousSibling?.textContent).to.equal('alice')
    })

    function renderProfile() {
      return render(
        <KeyringContext.Provider value={new Keyring()}>
          <Profile />
        </KeyringContext.Provider>
      )
    }
  })
})
