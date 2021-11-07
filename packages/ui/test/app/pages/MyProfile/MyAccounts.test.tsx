import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, screen, within } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { BalancesContextProvider } from '@/accounts/providers/balances/provider'
import { GlobalModals } from '@/app/GlobalModals'
import { MyAccounts } from '@/app/pages/Profile/MyAccounts'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContextProvider } from '@/common/providers/modal/provider'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'

import { alice, bob } from '../../../_mocks/keyring'
import { MockQueryNodeProviders } from '../../../_mocks/providers'
import { setupMockServer } from '../../../_mocks/server'
import { stubApi, stubBalances, stubDefaultBalances } from '../../../_mocks/transactions'

const testStatisticItem = (header: HTMLElement, labelMatcher: RegExp, expected: RegExp) => {
  const label = within(header).getByText(labelMatcher)
  expect(label?.parentElement).toBeDefined()
  expect(label!.parentElement?.nextElementSibling?.textContent).toMatch(expected)
}

describe('Page: MyAccounts', () => {
  let useAccounts: UseAccounts
  const server = setupMockServer({ noCleanupAfterEach: true })
  const api = stubApi()
  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
  }

  beforeAll(async () => {
    await cryptoWaitReady()
    seedMembers(server.server, 2)
  })

  beforeEach(() => {
    useAccounts = {
      isLoading: false,
      hasAccounts: true,
      allAccounts: [alice, bob],
    }

    stubDefaultBalances(api)
  })

  it('Accounts List', async () => {
    renderPage()

    expect(await screen.findByText(/alice/i)).toBeDefined()
    expect(await screen.findByText(/bob/i)).toBeDefined()
  })

  it('Free balances', () => {
    renderPage()

    const header: HTMLElement = screen.getByRole('banner')
    testStatisticItem(header, /total balance/i, /2,000/i)
    testStatisticItem(header, /total transferable balance/i, /2,000/i)
    testStatisticItem(header, /total locked balance/i, /0/i)
    testStatisticItem(header, /total recoverable/i, /0/i)
  })

  it('Locked balance', () => {
    stubBalances(api, { locked: 250, available: 10_000 })

    renderPage()

    const header: HTMLElement = screen.getByRole('banner')
    testStatisticItem(header, /total balance/i, /20,500/i)
    testStatisticItem(header, /total transferable balance/i, /20,000/i)
    testStatisticItem(header, /total locked balance/i, /500/i)
    testStatisticItem(header, /total recoverable/i, /0/i)
  })

  it('Recoverable locked balance', () => {
    stubBalances(api, { locked: 250, available: 10_000, lockId: 'Staking Candidate' })

    renderPage()

    const header: HTMLElement = screen.getByRole('banner')

    testStatisticItem(header, /total balance/i, /20,500/i)
    testStatisticItem(header, /total transferable balance/i, /20,000/i)
    testStatisticItem(header, /total locked balance/i, /500/i)
    testStatisticItem(header, /total recoverable/i, /500/i)
  })

  function renderPage(path = '/profile') {
    const history = createMemoryHistory()
    history.push(path)

    render(
      <Router history={history}>
        <AccountsContext.Provider value={useAccounts}>
          <ApiContext.Provider value={api}>
            <BalancesContextProvider>
              <ModalContextProvider>
                <MockQueryNodeProviders>
                  <MembershipContext.Provider value={useMyMemberships}>
                    <Switch>
                      <Route path="/profile" component={MyAccounts} />
                    </Switch>
                    <GlobalModals />
                  </MembershipContext.Provider>
                </MockQueryNodeProviders>
              </ModalContextProvider>
            </BalancesContextProvider>
          </ApiContext.Provider>
        </AccountsContext.Provider>
      </Router>
    )
  }
})
