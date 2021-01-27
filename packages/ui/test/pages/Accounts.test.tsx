import React from 'react'
import { Keyring } from '@polkadot/ui-keyring'
import { cleanup, render } from '@testing-library/react'
import { expect } from 'chai'
import sinon from 'sinon'
import { KeyringContext } from '../../src/providers/keyring/context'
import * as useAccountsModule from '../../src/hooks/useAccounts'
import * as useBalancesModule from '../../src/hooks/useBalances'
import { aliceSigner } from '../mocks/keyring'
import { UseBalances } from '../../src/hooks/useBalances'
import { Accounts } from '../../src/pages/Profile/Accounts'
import { Account } from '../../src/hooks/types'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import BN from 'bn.js'

describe('UI: Accounts list', () => {
  let accounts: {
    hasAccounts: boolean
    allAccounts: Account[]
  }
  let alice: string
  const JOY_1 = new BN(1)

  before(cryptoWaitReady)

  beforeEach(() => {
    alice = aliceSigner().address
    accounts = {
      hasAccounts: false,
      allAccounts: [],
    }
    sinon.stub(useAccountsModule, 'useAccounts').returns(accounts)
  })

  afterEach(cleanup)

  context('with empty keyring', () => {
    after(() => {
      sinon.restore()
    })

    it('Shows loading screen', async () => {
      const profile = render(
        <KeyringContext.Provider value={new Keyring()}>
          <Accounts />
        </KeyringContext.Provider>
      )
      expect(profile.getByText('Loading accounts...')).to.exist
    })
  })

  context('with development accounts', () => {
    let balances: UseBalances

    beforeEach(() => {
      balances = {
        hasBalances: true,
        map: {},
      }
      accounts.hasAccounts = true
      accounts.allAccounts.push({
        address: alice,
        name: 'alice',
      })
      sinon.stub(useBalancesModule, 'useBalances').returns(balances)
    })

    afterEach(() => {
      sinon.restore()
    })

    it('Renders empty balance when not returned', async () => {
      const { findByText } = renderAccounts()

      const alice = aliceSigner().address
      const aliceBox = (await findByText(alice))?.parentNode?.parentNode
      expect(aliceBox).to.exist
      expect(aliceBox?.querySelector('h5')?.textContent).to.equal('alice')
      expect(aliceBox?.nextSibling?.textContent).to.equal('-')
    })

    it('Renders balance value', async () => {
      balances.map[alice] = {
        total: JOY_1,
      }

      const { findByText } = renderAccounts()

      const aliceBox = (await findByText(alice))?.parentNode?.parentNode
      expect(aliceBox?.querySelector('h5')?.textContent).to.equal('alice')
      expect(aliceBox?.nextSibling?.textContent).to.equal('1.0000 JOY')
    })

    it.skip('Renders token transfer button', async () => {
      balances.map[alice] = {
        total: JOY_1,
      }

      const { findByText } = renderAccounts()
      expect((await findByText(alice))?.parentNode?.nextSibling?.nextSibling?.textContent).to.equal('send')
    })

    function renderAccounts() {
      return render(<Accounts />)
    }
  })
})
