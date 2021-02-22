import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render } from '@testing-library/react'
import { expect } from 'chai'
import React from 'react'
import { HashRouter } from 'react-router-dom'
import sinon from 'sinon'
import { Account } from '../../src/common/types'
import * as useAccountsModule from '../../src/hooks/useAccounts'
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

  beforeEach(() => {
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
      const { getByRole } = render(
        <HashRouter>
          <Memberships />
        </HashRouter>
      )

      expect(getByRole('button', { name: /create a membership/i })).to.exist
    })
  })
})
