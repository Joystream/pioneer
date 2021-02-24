import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import { render, waitForElementToBeRemoved } from '@testing-library/react'
import { Server } from 'miragejs/server'
import React from 'react'
import { CurrentMember } from '../../src/components/page/Sidebar/CurrentMember'
import { makeServer } from '../../src/mocks/server'
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
    it('Displays memberships count', async () => {
      createMember(server, aliceMember)
      createMember(server, bobMember)

      const { getByRole, getByText } = renderComponent()

      await waitForElementToBeRemoved(() => getByRole('button', { name: /create a membership/i }))

      expect(getByText(/memberships/i)?.parentElement?.textContent).toMatch(/^memberships 2/i)
    })
  })

  function renderComponent() {
    const link = new HttpLink({
      uri: '/query-node',
      fetch: (uri, options) => fetch(uri, options),
    })

    return render(
      <ApolloProvider client={new ApolloClient({ link, cache: new InMemoryCache() })}>
        <CurrentMember />
      </ApolloProvider>
    )
  }
})
