import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { beforeAll, expect } from '@jest/globals'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { HashRouter } from 'react-router-dom'
import sinon from 'sinon'
import { Account } from '../../src/common/types'
import * as useAccountsModule from '../../src/hooks/useAccounts'
import { makeServer } from '../../src/mocks/server'
import { Memberships } from '../../src/pages/Profile/MyMemberships/Memberships'
import { aliceSigner, bobSigner } from '../mocks/keyring'

describe('UI: Memberships list', () => {
  let accounts: {
    hasAccounts: boolean
    allAccounts: Account[]
  }
  let alice: string
  let bob: string

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

  describe('with no memberships', () => {
    it('Shows Create Membership button', async () => {
      const server = makeServer('test')

      const { findByRole } = renderMemberships()

      expect(await findByRole('button', { name: /create a membership/i })).toBeDefined()

      server.shutdown()
    })
  })

  describe('with memberships', () => {
    it('Shows list of  memberships', async () => {
      const server = makeServer('test')
      server.create('Member', ({
        name: 'Alice Member',
        handle: 'alice_handle',
        rootAccount: 'aa',
        controllerAccount: 'bb',
      } as unknown) as any)

      const { getByText } = renderMemberships()

      await waitForElementToBeRemoved(() => getByText('Loading...'))

      expect(getByText(/Alice Member/i)).toBeDefined()

      server.shutdown()
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
