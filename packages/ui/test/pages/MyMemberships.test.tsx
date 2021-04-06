import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, waitForElementToBeRemoved, within } from '@testing-library/react'
import React from 'react'
import { HashRouter } from 'react-router-dom'

import { MemberFieldsFragment } from '../../src/api/queries'
import { Account } from '../../src/common/types'
import { Memberships } from '../../src/pages/Profile/MyMemberships/Memberships'
import { MembershipContext } from '../../src/providers/membership/context'
import { alice, bob } from '../mocks/keyring'
import { getMember } from '../mocks/members'
import { MockApolloProvider } from '../mocks/providers'
import { setupMockServer } from '../mocks/server'

const useAccounts: { hasAccounts: boolean; allAccounts: Account[] } = {
  hasAccounts: true,
  allAccounts: [],
}

jest.mock('../../src/hooks/useAccounts', () => {
  return {
    useAccounts: () => useAccounts,
  }
})

describe('UI: Memberships list', () => {
  beforeAll(async () => {
    await cryptoWaitReady()
    useAccounts.allAccounts.push(alice, bob)
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
      mockServer.createMember('Alice')
      mockServer.createMember('Bob')
      const { getByText } = renderMemberships()

      await waitForElementToBeRemoved(() => getByText('Loading...'))

      expect(getByText(/alice_handle/i)).toBeDefined()
      expect(getByText(/bob_handle/i)).toBeDefined()
    })

    it('Shows active membership', async () => {
      mockServer.createMember('Alice')
      mockServer.createMember('Bob')
      const { getByText } = renderMemberships(getMember('Bob'))

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
