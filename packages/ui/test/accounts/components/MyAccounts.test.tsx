import { Keyring } from '@polkadot/ui-keyring/Keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { cleanup, render, within } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'
import { HashRouter } from 'react-router-dom'

import { Accounts } from '@/accounts/components/Accounts'
import { Account, Balances } from '@/accounts/types'
import { shortenAddress } from '@/common/model/formatters'
import { KeyringContext } from '@/common/providers/keyring/context'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { Member } from '@/memberships/types'
import { seedMembers } from '@/mocks/data'

import { alice, aliceStash, bob, bobStash } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockApiProvider, MockApolloProvider } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

const useMyAccounts: { hasAccounts: boolean; allAccounts: Account[] } = {
  hasAccounts: false,
  allAccounts: [],
}

jest.mock('@/accounts/hooks/useMyAccounts', () => {
  return {
    useMyAccounts: () => useMyAccounts,
  }
})

let balances: Balances | null = null

const useBalance = {
  useBalance: () => balances,
}

jest.mock('@/accounts/hooks/useBalance', () => useBalance)

describe('UI: Accounts list', () => {
  const mockServer = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(cryptoWaitReady)

  beforeEach(async () => {
    useMyAccounts.hasAccounts = false
    useMyAccounts.allAccounts.splice(0)
  })

  afterEach(cleanup)

  describe('with empty keyring', () => {
    it('Shows loading screen', async () => {
      const profile = render(
        <KeyringContext.Provider value={new Keyring()}>
          <Accounts />
        </KeyringContext.Provider>
      )
      expect(profile.getByText(/^Loading/i)).toBeDefined()
    })
  })

  describe('with development accounts', () => {
    beforeEach(() => {
      useMyAccounts.hasAccounts = true
      useMyAccounts.allAccounts.push(alice)
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
        locks: [],
      }
      const { findByText } = renderAccounts()

      const aliceBox = (await findByText(shortenAddress(alice.address)))?.parentNode?.parentNode
      expect(aliceBox?.querySelector('h5')?.textContent).toBe('alice')
      expect(aliceBox?.nextSibling?.textContent).toBe('1,000')
    })
  })

  describe('with active membership', () => {
    beforeEach(() => {
      useMyAccounts.hasAccounts = true
      useMyAccounts.allAccounts.push(alice, aliceStash, bob, bobStash)
    })

    it("Annotate active member's accounts", async () => {
      balances = {
        total: new BN(1000),
        locked: new BN(0),
        transferable: new BN(1000),
        recoverable: new BN(0),
        locks: [],
      }
      const aliceMember = getMember('alice')
      seedMembers(mockServer.server, 2)
      const { findByText } = renderAccounts(aliceMember)

      const aliceBox = (await findByText(shortenAddress(alice.address)))!.parentElement!.parentElement!
      expect(await within(aliceBox).findByText(/controller account/i)).toBeDefined()

      const aliceStashBox = (await findByText(shortenAddress(aliceStash.address)))!.parentElement!.parentElement!
      expect(await within(aliceStashBox).findByText(/root account/i)).toBeDefined()
    })
  })

  function renderAccounts(active?: Member) {
    return render(
      <HashRouter>
        <MockApiProvider>
          <MockApolloProvider>
            <MembershipContext.Provider value={{ active, setActive: () => undefined } as unknown as MyMemberships}>
              <Accounts />
            </MembershipContext.Provider>
          </MockApolloProvider>
        </MockApiProvider>
      </HashRouter>
    )
  }
})
