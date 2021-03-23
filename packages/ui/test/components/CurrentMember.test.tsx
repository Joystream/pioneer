import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, waitForElementToBeRemoved, within } from '@testing-library/react'
import React from 'react'
import { CurrentMember } from '../../src/components/page/Sidebar/CurrentMember'
import { MockKeyringProvider, MockQueryNodeProviders } from '../mocks/providers'
import { setupMockServer } from '../mocks/server'

describe('UI: CurrentMember component', () => {
  const mockServer = setupMockServer()
  jest.useFakeTimers()

  beforeAll(async () => {
    await cryptoWaitReady()
  })

  describe('with no memberships', () => {
    it('Displays create button', () => {
      const { getByRole } = renderComponent()

      expect(getByRole('button', { name: /create a membership/i })).toBeDefined()
    })
  })

  describe('with memberships', () => {
    beforeEach(async () => {
      await mockServer.createMember('Alice')
      await mockServer.createMember('Bob')
    })

    it('Displays memberships count', async () => {
      const { getByText } = await renderAndWait()

      expect(getByText(/memberships/i)?.parentElement?.textContent).toMatch(/^memberships 2/i)
    })

    it('Displays button when no active member', async () => {
      const { getByText } = await renderAndWait()

      expect(getByText(/alice_handle/i)).toBeDefined()
    })

    it('Shows switcher on click', async () => {
      const { findByText, findByRole } = await renderAndWait()

      fireEvent.click(await findByText(/alice_handle/i))

      const modal = await findByRole('modal')
      expect(modal).toBeDefined()

      expect(within(modal).getByText(/alice_handle/i)).toBeDefined()
      expect(within(modal).getByText(/bob_handle/i)).toBeDefined()
    })

    it('Switches active member', async () => {
      const { getByText, queryByText, getByRole } = await renderAndWait()

      const button = getByText(/alice_handle/i)
      fireEvent.click(button)

      fireEvent.click(within(getByRole('modal')).getByText(/bob_handle/i))

      expect(queryByText(/alice_handle/i)).toBeFalsy()
      expect(getByText(/bob_handle/i)).toBeDefined()
    })
  })

  function renderComponent() {
    return render(
      <MockKeyringProvider>
        <MockQueryNodeProviders>
          <CurrentMember />
        </MockQueryNodeProviders>
      </MockKeyringProvider>
    )
  }

  async function renderAndWait() {
    const renderResult = renderComponent()
    const { getByRole } = renderResult

    await waitForElementToBeRemoved(() => getByRole('button', { name: /create a membership/i }))

    return renderResult
  }
})
