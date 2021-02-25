import { fireEvent, render, waitForElementToBeRemoved, within } from '@testing-library/react'
import { Server } from 'miragejs/server'
import React from 'react'
import { CurrentMember } from '../../src/components/page/Sidebar/CurrentMember'
import { makeServer } from '../../src/mocks/server'
import { MembershipContextProvider } from '../../src/providers/membership/provider'
import { MockApolloProvider } from '../helpers/providers'
import { aliceMember, bobMember, createMember } from '../mocks/members'

describe('UI: Memberships component', () => {
  let server: Server

  beforeEach(() => {
    server = makeServer('test')
  })

  afterEach(() => {
    server.shutdown()
  })

  describe('with no memberships', () => {
    it('Displays create button', () => {
      const { getByRole } = renderComponent()

      expect(getByRole('button', { name: /create a membership/i })).toBeDefined()
    })
  })

  describe('with memberships', () => {
    beforeEach(() => {
      createMember(server, aliceMember)
      createMember(server, bobMember)
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
      const { getByText, getByRole } = await renderAndWait()

      const button = getByText(/alice_handle/i)
      fireEvent.click(button)

      const modal = getByRole('modal')
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
      <MockApolloProvider>
        <MembershipContextProvider>
          <CurrentMember />
        </MembershipContextProvider>
      </MockApolloProvider>
    )
  }

  async function renderAndWait() {
    const renderResult = renderComponent()
    const { getByRole } = renderResult

    await waitForElementToBeRemoved(() => getByRole('button', { name: /create a membership/i }))

    return renderResult
  }
})
