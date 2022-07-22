import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'

import { RecoverBalanceModalCall } from '@/accounts/modals/RecoverBalance'
import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { BalancesContextProvider } from '@/accounts/providers/balances/provider'
import { GlobalModals } from '@/app/GlobalModals'
import { MyAccounts } from '@/app/pages/Profile/MyAccounts'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'

import { getButton, queryButton } from '../../../_helpers/getButton'
import { createBalance } from '../../../_mocks/chainTypes'
import { alice, bob } from '../../../_mocks/keyring'
import { MockQueryNodeProviders } from '../../../_mocks/providers'
import { setupMockServer } from '../../../_mocks/server'
import { MEMBER_ALICE_DATA } from '../../../_mocks/server/seeds'
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
    helpers: {
      getMemberIdByBoundAccountAddress: () => MEMBER_ALICE_DATA.id,
    },
  }

  let useModal: UseModal<any>

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
    useModal = {
      hideModal: jest.fn(),
      modal: null,
      modalData: undefined,
      showModal: jest.fn(),
    }
    useMyMemberships.members = []

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
    stubBalances(api, { locked: 250, available: 10_000, lockId: 'Council Candidate' })

    renderPage()

    const header: HTMLElement = screen.getByRole('banner')

    testStatisticItem(header, /total balance/i, /20,500/i)
    testStatisticItem(header, /total transferable balance/i, /20,000/i)
    testStatisticItem(header, /total locked balance/i, /500/i)
    testStatisticItem(header, /total recoverable/i, /500/i)
  })

  describe('Recover balance button', () => {
    it('Recoverable', async () => {
      stubBalances(api, { locked: 250, available: 10_000, lockId: 'Council Candidate' })

      renderPage()

      fireEvent.click(await screen.findByText(/alice/i))
      await screen.findByText(/Council Candidate/i)

      expect(await getButton(/^recover$/i)).toBeDefined()
    })

    it('Opens modal', async () => {
      stubBalances(api, { locked: 250, available: 10_000, lockId: 'Council Candidate' })

      renderPage()

      await act(async () => {
        fireEvent.click(await screen.findByText(/alice/i))
        fireEvent.click(await getButton(/^recover$/i))
      })

      const expected: RecoverBalanceModalCall = {
        modal: 'RecoverBalance',
        data: {
          address: alice.address,
          lock: {
            amount: createBalance(250).toBn(),
            type: 'Council Candidate',
          },
          memberId: MEMBER_ALICE_DATA.id,
        },
      }
      expect(useModal.showModal).toBeCalledWith(expected)
    })

    it('Nonrecoverable', async () => {
      stubBalances(api, { locked: 250, available: 10_000, lockId: 'Bound Staking Account' })

      renderPage()

      fireEvent.click(await screen.findByText(/alice/i))
      await screen.findByText(/Bound Staking Account/i)

      expect(await queryButton(/^recover$/i)).not.toBeDefined()
    })
  })

  function renderPage(path = '/profile') {
    const history = createMemoryHistory()
    history.push(path)

    render(
      <Router history={history}>
        <AccountsContext.Provider value={useAccounts}>
          <ApiContext.Provider value={api}>
            <BalancesContextProvider>
              <ModalContext.Provider value={useModal}>
                <MockQueryNodeProviders>
                  <MembershipContext.Provider value={useMyMemberships}>
                    <Switch>
                      <Route path="/profile" component={MyAccounts} />
                    </Switch>
                    <GlobalModals />
                  </MembershipContext.Provider>
                </MockQueryNodeProviders>
              </ModalContext.Provider>
            </BalancesContextProvider>
          </ApiContext.Provider>
        </AccountsContext.Provider>
      </Router>
    )
  }
})
