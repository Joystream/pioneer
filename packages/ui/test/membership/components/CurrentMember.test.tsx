import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, waitForElementToBeRemoved, within } from '@testing-library/react'
import React from 'react'

import { AccountsContextProvider } from '../../../src/app/providers/accounts/provider'
import { CurrentMember } from '../../../src/common/components/page/Sidebar/CurrentMember'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

describe('UI: CurrentMember component', () => {
  const mockServer = setupMockServer()

  beforeAll(async () => {
    await cryptoWaitReady()
  })

  describe('with no memberships', () => {
    it('Displays create button', () => {
      const { getByRole } = renderComponent()

      expect(getByRole('button', { name: /create membership/i })).toBeDefined()
    })
  })

  describe('with multiple memberships', () => {
    beforeEach(() => {
      mockServer.createMember('Alice')
      mockServer.createMember('Bob')
    })

    it('Displays memberships count', async () => {
      const { getAllByText } = await renderAndWait()

      expect(getAllByText(/memberships/i)[0]?.parentElement?.textContent).toMatch(/^memberships 2/i)
    })

    it('Renders select member button', async () => {
      const { getByText } = await renderAndWait()

      expect(getByText(/select membership/i)).toBeDefined()
    })

    it('Sets active member', async () => {
      const { getByText, getByRole } = await renderAndWait()

      fireEvent.click(getByText(/select membership/i))

      fireEvent.click(within(getByRole('modal')).getByText(/alice_handle/i))

      expect(getByText(/alice_handle/i)).toBeDefined()
    })
  })

  describe('with one membership', () => {
    beforeEach(() => {
      mockServer.createMember('Alice')
    })

    it('Renders select member button', async () => {
      const { getByText } = await renderAndWait()

      expect(getByText(/select membership/i)).toBeDefined()
    })
  })

  function renderComponent() {
    return render(
      <MockKeyringProvider>
        <AccountsContextProvider>
          <MockQueryNodeProviders>
            <CurrentMember />
          </MockQueryNodeProviders>
        </AccountsContextProvider>
      </MockKeyringProvider>
    )
  }

  async function renderAndWait() {
    const renderResult = renderComponent()
    const { getByRole } = renderResult

    await waitForElementToBeRemoved(() => getByRole('button', { name: /create membership/i }))

    return renderResult
  }
})
