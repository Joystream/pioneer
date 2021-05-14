import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { HashRouter } from 'react-router-dom'

import { Account } from '../../../src/accounts/types'
import { Memberships } from '../../../src/app/pages/Profile/components/Memberships'
import { MembershipContextProvider } from '../../../src/memberships/providers/membership/provider'
import { seedMembers } from '../../../src/mocks/data'
import { alice, aliceStash, bob, bobStash } from '../../_mocks/keyring'
import { MockApolloProvider } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

const useAccounts: { hasAccounts: boolean; allAccounts: Account[] } = {
  hasAccounts: true,
  allAccounts: [],
}

jest.mock('../../../src/accounts/hooks/useAccounts', () => {
  return {
    useAccounts: () => useAccounts,
  }
})

describe('UI: Memberships list', () => {
  beforeAll(async () => {
    await cryptoWaitReady()
    useAccounts.allAccounts.push(alice, aliceStash, bob, bobStash)
  })

  const mockServer = setupMockServer()

  it('No memberships', async () => {
    const { findByRole } = renderMemberships()

    expect(await findByRole('button', { name: /create a membership/i })).toBeDefined()
  })

  it('With memberships', async () => {
    seedMembers(mockServer.server)
    const { getByText } = renderMemberships()

    await waitForElementToBeRemoved(() => getByText('Loading...'))

    expect(getByText(/alice/i)).toBeDefined()
    expect(getByText(/bob/i)).toBeDefined()
  })

  function renderMemberships() {
    return render(
      <HashRouter>
        <MockApolloProvider>
          <MembershipContextProvider>
            <Memberships />
          </MembershipContextProvider>
        </MockApolloProvider>
      </HashRouter>
    )
  }
})
