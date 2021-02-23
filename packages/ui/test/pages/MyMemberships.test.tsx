import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, waitForElementToBeRemoved } from '@testing-library/react'
import { Server } from 'miragejs/server'
import React from 'react'
import { HashRouter } from 'react-router-dom'
import sinon from 'sinon'
import { Account } from '../../src/common/types'
import * as useAccountsModule from '../../src/hooks/useAccounts'
import { makeServer } from '../../src/mocks/server'
import { Memberships } from '../../src/pages/Profile/MyMemberships/Memberships'
import { aliceSigner, bobSigner } from '../mocks/keyring'
import { aliceMember, bobMember, createMember } from '../mocks/members'

describe('UI: Memberships list', () => {
  let accounts: {
    hasAccounts: boolean
    allAccounts: Account[]
  }
  let alice: string
  let bob: string
  let server: Server

  beforeAll(cryptoWaitReady)

  beforeAll(() => {
    alice = aliceSigner().address
    bob = bobSigner().address

    accounts = {
      hasAccounts: true,
      allAccounts: [
        { address: alice, name: 'alice' },
        { address: bob, name: 'bob' },
      ],
    }
    sinon.stub(useAccountsModule, 'useAccounts').returns(accounts)
  })

  beforeEach(() => {
    server = makeServer('test')
  })

  afterEach(() => {
    server.shutdown()
  })

  describe('with no memberships', () => {
    it('Shows Create Membership button', async () => {
      const { findByRole } = renderMemberships()

      expect(await findByRole('button', { name: /create a membership/i })).toBeDefined()
    })
  })

  describe('with memberships', () => {
    it('Shows list of memberships', async () => {
      createMember(server, aliceMember)
      createMember(server, bobMember)
      const { getByText } = renderMemberships()

      await waitForElementToBeRemoved(() => getByText('Loading...'))

      expect(getByText(/alice_handle/i)).toBeDefined()
      expect(getByText(/bob_handle/i)).toBeDefined()
    })
  })

  function renderMemberships() {
    return render(
      <HashRouter>
        <ApolloProvider client={new ApolloClient({ uri: '/query-node', cache: new InMemoryCache() })}>
          <Memberships />
        </ApolloProvider>
      </HashRouter>
    )
  }
})
