import { afterAll, beforeAll, expect } from '@jest/globals'
import { Keyring } from '@polkadot/ui-keyring/Keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { cleanup, render, within } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'
import { HashRouter } from 'react-router-dom'
import sinon from 'sinon'
import { MemberFieldsFragment } from '../../src/api/queries'
import { Account } from '../../src/common/types'
import * as useBalanceModule from '../../src/hooks/useBalance'
import { Accounts } from '../../src/pages/Profile/MyAccounts/Accounts'
import { KeyringContext } from '../../src/providers/keyring/context'
import { MembershipContext } from '../../src/providers/membership/context'
import { shortenAddress } from '../../src/utils/formatters'
import { MockApolloProvider } from '../helpers/providers'
import { alice, aliceSigner, aliceStash, bob, bobStash } from '../mocks/keyring'
import { KnownAccounts, knownAccounts } from '../mocks/keyring/accounts'
import { getMember } from '../mocks/members'
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

describe('UI: Accounts list', () => {
  const mockServer = setupMockServer()
  let known: KnownAccounts

  beforeAll(async () => {
    known = await knownAccounts()
  })

  beforeAll(cryptoWaitReady)

  beforeEach(async () => {
    useAccounts.hasAccounts = false
    useAccounts.allAccounts.splice(0)
  })

  afterEach(cleanup)

  describe('with empty keyring', () => {
    afterAll(() => {
      sinon.restore()
    })

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

    afterEach(() => {
      sinon.restore()
    })

    it('Renders empty balance when not returned', async () => {
      const { findByText } = renderAccounts()
      sinon.stub(useBalanceModule, 'useBalance').returns(null)

      const alice = (await aliceSigner()).address
      const aliceBox = (await findByText(shortenAddress(alice)))?.parentNode?.parentNode
      expect(aliceBox).toBeDefined()
      expect(aliceBox?.querySelector('h5')?.textContent).toBe('alice')
      expect(aliceBox?.nextSibling?.textContent).toBe('-')
    })

    it('Renders balance value', async () => {
      sinon.stub(useBalanceModule, 'useBalance').returns({
        total: new BN(1000),
        locked: new BN(0),
        transferable: new BN(1000),
        recoverable: new BN(0),
      })
      const { findByText } = renderAccounts()

      const aliceBox = (await findByText(shortenAddress(known.alice.address)))?.parentNode?.parentNode
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
      await mockServer.createMember('Alice')
      const alice = await getMember('Alice')
      const { findByText } = renderAccounts(alice as MemberFieldsFragment)

      const aliceBox = (await findByText(shortenAddress(known.alice.address)))!.parentElement!.parentElement!
      expect(await within(aliceBox).findByText(/root account/i)).toBeDefined()

      const aliceStashBox = (await findByText(shortenAddress(known.aliceStash.address)))!.parentElement!.parentElement!
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
