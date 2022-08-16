import { Keyring } from '@polkadot/ui-keyring/Keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { cleanup, configure, render, within } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'
import { HashRouter } from 'react-router-dom'

import { Accounts } from '@/accounts/components/Accounts'
import { shortenAddress } from '@/common/model/formatters'
import { KeyringContext } from '@/common/providers/keyring/context'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { Member } from '@/memberships/types'
import { seedMembers } from '@/mocks/data'

import { alice, aliceStash, bob, bobStash } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockApolloProvider } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { stubAccounts } from '../../_mocks/transactions'
import { mockDefaultBalance, mockedBalances } from '../../setup'

configure({ testIdAttribute: 'id' })

describe('UI: Accounts list', () => {
  const mockServer = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(cryptoWaitReady)

  beforeEach(() => {
    stubAccounts([])
  })

  afterEach(cleanup)

  describe('with empty keyring', () => {
    it('Shows loading screen', async () => {
      stubAccounts([], { isLoading: true })
      const profile = render(
        <KeyringContext.Provider value={new Keyring()}>
          <Accounts />
        </KeyringContext.Provider>
      )

      expect(profile.getByTestId('accountItemLoading')).toBeDefined()
    })
  })

  describe('with development accounts', () => {
    beforeEach(() => {
      stubAccounts([alice])
      mockedBalances.mockReturnValue(null)
    })

    it('Renders empty balance when not returned', async () => {
      const { findByText } = renderAccounts()

      const aliceAddress = alice.address
      const aliceBox = (await findByText(shortenAddress(aliceAddress)))?.parentNode?.parentNode
      expect(aliceBox).toBeDefined()
      expect(aliceBox?.querySelector('h5')?.textContent).toBe('alice')
      expect(aliceBox?.nextSibling).toHaveAttribute('id', 'tokenValueSkeleton')
    })

    it('Renders balance value', async () => {
      mockedBalances.mockReturnValue({
        ...mockDefaultBalance,
        total: new BN(1000),
        transferable: new BN(1000),
      })
      const { findByText } = renderAccounts()

      const aliceBox = (await findByText(shortenAddress(alice.address)))?.parentNode?.parentNode
      expect(aliceBox?.querySelector('h5')?.textContent).toBe('alice')
      expect(aliceBox?.nextSibling?.textContent).toBe('1,000')
    })
  })

  describe('with active membership', () => {
    beforeEach(() => {
      stubAccounts([alice, aliceStash, bob, bobStash])
    })

    it("Annotate active member's accounts", async () => {
      mockedBalances.mockReturnValue({
        ...mockDefaultBalance,
        total: new BN(1000),
        transferable: new BN(1000),
      })
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
        <MockApolloProvider>
          <MembershipContext.Provider value={{ active, setActive: () => undefined } as unknown as MyMemberships}>
            <Accounts />
          </MembershipContext.Provider>
        </MockApolloProvider>
      </HashRouter>
    )
  }
})
