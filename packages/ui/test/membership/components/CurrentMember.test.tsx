import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, waitForElementToBeRemoved, within } from '@testing-library/react'
import React from 'react'

import { AccountsContextProvider } from '../../../src/accounts/providers/accounts/provider'
import { CurrentMember } from '../../../src/memberships/components/CurrentMember'
import { seedMembers, seedMember, mockMembers } from '../../../src/mocks/data'
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
      seedMembers(mockServer.server)
    })

    it('Displays memberships count', async () => {
      const { getAllByText } = await renderAndWait()

      expect(getAllByText(/memberships/i)[0]?.parentElement?.textContent).toMatch(/^memberships 3/i)
    })

    it('Renders select member button', async () => {
      const { getByText } = await renderAndWait()

      expect(getByText(/select membership/i)).toBeDefined()
    })

    it('Sets active member', async () => {
      const { getByText, getByRole } = await renderAndWait()

      fireEvent.click(getByText(/select membership/i))

      fireEvent.click(within(getByRole('modal')).getByText(/alice/i))

      expect(getByText(/alice/i)).toBeDefined()
    })
  })

  describe('with one membership', () => {
    beforeEach(() => {
      seedMember(mockMembers.find((m) => m.handle == 'alice')!, mockServer.server)
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
