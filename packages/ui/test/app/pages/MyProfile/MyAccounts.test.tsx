import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, screen, within } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { GlobalModals } from '@/app/GlobalModals'
import { MyAccounts } from '@/app/pages/Profile/MyAccounts'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContextProvider } from '@/common/providers/modal/provider'
import { seedMembers } from '@/mocks/data'

import { alice, bob } from '../../../_mocks/keyring'
import { MockQueryNodeProviders } from '../../../_mocks/providers'
import { setupMockServer } from '../../../_mocks/server'
import { stubApi, stubDefaultBalances } from '../../../_mocks/transactions'

const testStatisticItem = (labelMatcher: RegExp, expected: RegExp) => {
  const header = screen.getByRole('banner')

  const label = within(header).getByText(labelMatcher)
  expect(label?.parentElement).toBeDefined()
  expect(label!.parentElement?.nextElementSibling?.textContent).toMatch(expected)
}

describe('Page: MyAccounts', () => {
  let useAccounts: UseAccounts
  const server = setupMockServer()
  const api = stubApi()

  beforeAll(cryptoWaitReady)

  beforeEach(() => {
    useAccounts = {
      hasAccounts: true,
      allAccounts: [alice, bob],
    }

    stubDefaultBalances(api)
    seedMembers(server.server)
  })

  it('Accounts List', async () => {
    renderPage()

    expect(await screen.findByText(/alice/i)).toBeDefined()
    expect(await screen.findByText(/bob/i)).toBeDefined()
  })

  it('With free balances', () => {
    renderPage()

    testStatisticItem(/total balance/i, /2,000/i)
    testStatisticItem(/total transferable balance/i, /2,000/i)
    testStatisticItem(/total locked balance/i, /0/i)
    testStatisticItem(/total recoverable/i, /0/i)
  })

  function renderPage(path = '/profile') {
    const history = createMemoryHistory()
    history.push(path)

    render(
      <Router history={history}>
        <AccountsContext.Provider value={useAccounts}>
          <ModalContextProvider>
            <MockQueryNodeProviders>
              <ApiContext.Provider value={api}>
                <Switch>
                  <Route path="/profile" component={MyAccounts} />
                </Switch>
                <GlobalModals />
              </ApiContext.Provider>
            </MockQueryNodeProviders>
          </ModalContextProvider>
        </AccountsContext.Provider>
      </Router>
    )
  }
})
