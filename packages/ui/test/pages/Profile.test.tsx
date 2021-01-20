import React from 'react'
import { Keyring } from '@polkadot/ui-keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render } from '@testing-library/react'
import { expect } from 'chai'
import sinon from 'sinon'
import { Profile } from '../../src/pages/Profile/Profile'
import { KeyringContext } from '../../src/providers/keyring/context'
import * as useAccountsModule from '../../src/hooks/useAccounts'
import * as useBalancesModule from '../../src/hooks/useBalances'
import { aliceSigner } from '../mocks/keyring'
import { UseBalances } from '../../src/hooks/useBalances'

describe('UI: Profile', () => {
  beforeEach(cryptoWaitReady)

  context('with empty keyring', () => {
    after(() => {
      sinon.restore()
    })

    it('Shows loading screen', async () => {
      sinon.stub(useAccountsModule, 'useAccounts').returns({
        hasAccounts: false,
        allAccounts: [],
      })

      const profile = render(<Profile />)
      expect(profile.getByText('Loading...')).to.exist
    })
  })

  context('with development accounts', () => {
    let balances: UseBalances

    beforeEach(() => {
      balances = {
        hasBalances: true,
        map: {},
      }
      sinon.stub(useBalancesModule, 'useBalances').returns(balances)
    })

    afterEach(() => {
      sinon.restore()
    })

    it('Renders accounts list for known addresses', async () => {
      const { findAllByRole } = renderProfile()

      const [, accountsRowGroup] = [...(await findAllByRole('rowgroup'))]
      expect(accountsRowGroup.childNodes).to.have.length(8)
    })

    it('Renders empty balance when not returned', async () => {
      const { findByText } = renderProfile()

      const alice = aliceSigner().address
      expect((await findByText(alice))?.previousSibling?.textContent).to.equal('alice')
      expect((await findByText(alice))?.parentNode?.nextSibling?.textContent).to.equal('-')
    })

    it('Renders balance value', async () => {
      const alice = aliceSigner().address

      balances.map[alice] = {
        total: '1000 JOY',
      }

      const { findByText } = renderProfile()
      expect((await findByText(alice))?.previousSibling?.textContent).to.equal('alice')
      expect((await findByText(alice))?.parentNode?.nextSibling?.textContent).to.equal('1000 JOY')
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
