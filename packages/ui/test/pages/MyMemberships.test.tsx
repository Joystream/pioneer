import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, waitForElementToBeRemoved, within } from '@testing-library/react'
import React from 'react'
import { HashRouter } from 'react-router-dom'
import sinon from 'sinon'
import { MemberFieldsFragment } from '../../src/api/queries'
import { Account } from '../../src/common/types'
import * as useAccountsModule from '../../src/hooks/useAccounts'
import { Memberships } from '../../src/pages/Profile/MyMemberships/Memberships'
import { MembershipContext } from '../../src/providers/membership/context'
import { MockApolloProvider } from '../helpers/providers'
import { aliceSigner, bobSigner } from '../mocks/keyring'
import { setupMockServer } from '../mocks/server'

describe('UI: Memberships list', () => {
  let accounts: {
    hasAccounts: boolean
    allAccounts: Account[]
  }
  let alice: string
  let bob: string

  beforeAll(cryptoWaitReady)

  beforeAll(async () => {
    alice = (await aliceSigner()).address
    bob = (await bobSigner()).address

    accounts = {
      hasAccounts: true,
      allAccounts: [
        { address: alice, name: 'alice' },
        { address: bob, name: 'bob' },
      ],
    }
    sinon.stub(useAccountsModule, 'useAccounts').returns(accounts)
  })

  const mockServer = setupMockServer()

  describe('with no memberships', () => {
    it('Shows Create Membership button', async () => {
      const { findByRole } = renderMemberships()

      expect(await findByRole('button', { name: /create a membership/i })).toBeDefined()
    })
  })

  describe('with memberships', () => {
    it('Shows list of memberships', async () => {
      await mockServer.createMember('Alice')
      await mockServer.createMember('Bob')
      const { getByText } = renderMemberships()

      await waitForElementToBeRemoved(() => getByText('Loading...'))

      expect(getByText(/alice_handle/i)).toBeDefined()
      expect(getByText(/bob_handle/i)).toBeDefined()
    })

    it('Shows active membership', async () => {
      await mockServer.createMember('Alice')
      const bob = await mockServer.createMember('Bob')
      const { getByText } = renderMemberships((bob.attrs as unknown) as MemberFieldsFragment)

      await waitForElementToBeRemoved(() => getByText('Loading...'))

      const activeMemberships = getByText(/active membership/i).parentElement!
      expect(activeMemberships).toBeDefined()
      expect(within(activeMemberships).getByText(/bob_handle/i)).toBeDefined()

      const otherMemberships = getByText(/other memberships/i).parentElement!
      expect(otherMemberships).toBeDefined()
      expect(within(otherMemberships).getByText(/alice_handle/i)).toBeDefined()
    })
  })

  function renderMemberships(active?: MemberFieldsFragment) {
    return render(
      <HashRouter>
        <MockApolloProvider>
          <MembershipContext.Provider value={{ active, setActive: () => undefined }}>
            <Memberships />
          </MembershipContext.Provider>
        </MockApolloProvider>
      </HashRouter>
    )
  }
})
