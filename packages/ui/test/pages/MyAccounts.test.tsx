import { Keyring } from '@polkadot/ui-keyring/Keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { cleanup, render, within } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'
import { HashRouter } from 'react-router-dom'

import { MemberFieldsFragment } from '../../src/api/queries'
import { Account, Balances } from '../../src/common/types'
import { Accounts } from '../../src/pages/Profile/MyAccounts/Accounts'
import { KeyringContext } from '../../src/providers/keyring/context'
import { MembershipContext } from '../../src/providers/membership/context'
import { shortenAddress } from '../../src/utils/formatters'
import { alice, aliceStash, bob, bobStash } from '../mocks/keyring'
import { getMember } from '../mocks/members'
import { MockApolloProvider } from '../mocks/providers'
import { setupMockServer } from '../mocks/server'

const useAccounts: { hasAccounts: boolean; allAccounts: Account[] } = {
  hasAccounts: false,
  allAccounts: [],
}

jest.mock('../../src/hooks/useAccounts', () => {
  return {
    useAccounts: () => useAccounts,
  }
})

let balances: Balances | null = null

const useBalance = {
  useBalance: () => balances,
}

jest.mock('../../src/hooks/useBalance', () => useBalance)

describe('UI: Accounts list', () => {
  const mockServer = setupMockServer()

  beforeAll(cryptoWaitReady)

  beforeEach(async () => {
    useAccounts.hasAccounts = false
    useAccounts.allAccounts.splice(0)
  })

  afterEach(cleanup)

  describe('with empty keyring', () => {
    it('Shows loading screen', async () => {
      const profile = render(
        <KeyringContext.Provider value={new Keyring()}>
          <Accounts />
        </KeyringContext.Provider>
      )
      expect(profile.getByText('Loading accounts...')).toBeDefined()
    })
  })

  describe('with development accounts', () => {
    beforeEach(() => {
      useAccounts.hasAccounts = true
      useAccounts.allAccounts.push(alice)
    })

    it('Renders empty balance when not returned', async () => {
      const { findByText } = renderAccounts()

      const aliceAddress = alice.address
      const aliceBox = (await findByText(shortenAddress(aliceAddress)))?.parentNode?.parentNode
      expect(aliceBox).toBeDefined()
      expect(aliceBox?.querySelector('h5')?.textContent).toBe('alice')
      expect(aliceBox?.nextSibling?.textContent).toBe('-')
    })

    it('Renders balance value', async () => {
      balances = {
        total: new BN(1000),
        locked: new BN(0),
        transferable: new BN(1000),
        recoverable: new BN(0),
      }
      const { findByText } = renderAccounts()

      const aliceBox = (await findByText(shortenAddress(alice.address)))?.parentNode?.parentNode
      expect(aliceBox?.querySelector('h5')?.textContent).toBe('alice')
      expect(aliceBox?.nextSibling?.textContent).toBe('1,000')
    })
  })

  describe('with active membership', () => {
    beforeEach(() => {
      useAccounts.hasAccounts = true
      useAccounts.allAccounts.push(alice, aliceStash, bob, bobStash)
    })

    it("Annotate active member's accounts", async () => {
      balances = {
        total: new BN(1000),
        locked: new BN(0),
        transferable: new BN(1000),
        recoverable: new BN(0),
      }
      mockServer.createMember('Alice')
      const aliceMember = getMember('Alice')
      const { findByText } = renderAccounts(aliceMember)

      const aliceBox = (await findByText(shortenAddress(alice.address)))!.parentElement!.parentElement!
      expect(await within(aliceBox).findByText(/root account/i)).toBeDefined()

      const aliceStashBox = (await findByText(shortenAddress(aliceStash.address)))!.parentElement!.parentElement!
      expect(await within(aliceStashBox).findByText(/controller account/i)).toBeDefined()
    })
  })

  function renderAccounts(active?: MemberFieldsFragment) {
    return render(
      <HashRouter>
        <MockApolloProvider>
          <MembershipContext.Provider value={{ active, setActive: () => undefined }}>
            <Accounts />
          </MembershipContext.Provider>
        </MockApolloProvider>
      </HashRouter>
    )
  }
})
