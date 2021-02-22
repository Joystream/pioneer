import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render } from '@testing-library/react'
import { expect } from 'chai'
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

  before(cryptoWaitReady)

  before(() => {
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

  context('with no memberships', () => {
    it('Shows Create Membership button', () => {
      const server = makeServer('test')

      const { getByRole } = renderMemberships()

      expect(getByRole('button', { name: /create a membership/i })).to.exist
    })
  })

  context('with memberships', () => {
    it('Shows list of memberships', () => {
      const server = makeServer('test')

      const { getByRole } = renderMemberships()

      expect(getByRole('button', { name: /create a membership/i })).to.not.exist

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
