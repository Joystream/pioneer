import { afterAll, beforeAll, expect } from '@jest/globals'
import { Keyring } from '@polkadot/ui-keyring/Keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { cleanup, render, within } from '@testing-library/react'
import BN from 'bn.js'
import { Server } from 'miragejs/server'
import React from 'react'
import { HashRouter } from 'react-router-dom'
import sinon from 'sinon'
import { MemberFieldsFragment } from '../../src/api/queries'
import { Account } from '../../src/common/types'
import * as useAccountsModule from '../../src/hooks/useAccounts'
import * as useBalanceModule from '../../src/hooks/useBalance'
import { makeServer } from '../../src/mocks/server'
import { Accounts } from '../../src/pages/Profile/MyAccounts/Accounts'
import { KeyringContext } from '../../src/providers/keyring/context'
import { MembershipContext } from '../../src/providers/membership/context'
import { MockApolloProvider } from '../helpers/providers'
import { aliceSigner } from '../mocks/keyring'
import { KnownAccounts, knownAccounts } from '../mocks/keyring/accounts'
import { createMember, getMember } from '../mocks/members'

describe('UI: Accounts list', () => {
  let accountsMock: {
    hasAccounts: boolean
    allAccounts: Account[]
  }
  let known: KnownAccounts

  beforeAll(async () => {
    known = await knownAccounts()
  })

  beforeAll(cryptoWaitReady)

  beforeEach(async () => {
    accountsMock = {
      hasAccounts: false,
      allAccounts: [],
    }
    sinon.stub(useAccountsModule, 'useAccounts').returns(accountsMock)
  })

  let server: Server

  beforeEach(() => {
    server = makeServer('test')
  })

  afterEach(() => {
    server.shutdown()
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
      accountsMock.hasAccounts = true
      accountsMock.allAccounts.push({
        address: known.alice.address,
        name: 'alice',
      })
    })

    afterEach(() => {
      sinon.restore()
    })

    it('Renders empty balance when not returned', async () => {
      const { findByText } = renderAccounts()
      sinon.stub(useBalanceModule, 'useBalance').returns(null)

      const alice = (await aliceSigner()).address
      const aliceBox = (await findByText(alice))?.parentNode?.parentNode
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

      const aliceBox = (await findByText(known.alice.address))?.parentNode?.parentNode
      expect(aliceBox?.querySelector('h5')?.textContent).toBe('alice')
      expect(aliceBox?.nextSibling?.textContent).toBe('1,000')
    })
  })

  describe('with active membership', () => {
    beforeEach(() => {
      accountsMock.hasAccounts = true
      accountsMock.allAccounts.push(known.alice)
      accountsMock.allAccounts.push(known.aliceStash)
      accountsMock.allAccounts.push(known.bob)
      accountsMock.allAccounts.push(known.bobStash)
    })

    it("Annotate active member's accounts", async () => {
      await createMember(server, 'Alice')
      const alice = await getMember('Alice')
      const { findByText } = renderAccounts(alice as MemberFieldsFragment)

      const aliceBox = (await findByText(known.alice.address))!.parentElement!.parentElement!
      expect(await within(aliceBox).findByText(/root account/i)).toBeDefined()

      const aliceStashBox = (await findByText(known.aliceStash.address))!.parentElement!.parentElement!
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
