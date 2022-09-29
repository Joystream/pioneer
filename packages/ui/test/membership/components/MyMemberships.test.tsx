import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { HashRouter } from 'react-router-dom'

import { Memberships } from '@/app/pages/Profile/components/Memberships'
import { MembershipContextProvider } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'

import { alice, aliceStash, bob, bobStash } from '../../_mocks/keyring'
import { MockApolloProvider } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { stubAccounts } from '../../_mocks/transactions'
import { loaderSelector } from '../../setup'

describe('UI: Memberships list', () => {
  beforeAll(async () => {
    await cryptoWaitReady()
    stubAccounts([alice, aliceStash, bob, bobStash])
  })

  const mockServer = setupMockServer()

  it('No memberships', async () => {
    const { findByRole } = renderMemberships()

    expect(await findByRole('button', { name: /create a membership/i })).toBeDefined()
  })

  it('With memberships', async () => {
    seedMembers(mockServer.server, 2)
    const { getByText } = renderMemberships()

    await waitForElementToBeRemoved(() => loaderSelector())

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
