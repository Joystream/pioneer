import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { UnknownAccountInfo } from '../../../src/accounts/components/UnknownAccountInfo'
import { AccountsContext } from '../../../src/accounts/providers/accounts/context'
import { alice, bob } from '../../_mocks/keyring'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

describe('UI: UnknownAccountInfo component', () => {
  const useAccounts = {
    hasAccounts: false,
    allAccounts: [alice, bob],
  }

  setupMockServer()

  jest.useFakeTimers()

  beforeAll(cryptoWaitReady)

  it('User account', () => {
    renderComponent(alice.address)

    expect(screen.getByText('alice')).toBeDefined()
  })

  it('Unknown account', () => {
    renderComponent('0xUnknown')

    expect(screen.getByText('Root account')).toBeDefined()
  })

  function renderComponent(address: string) {
    return render(
      <MockQueryNodeProviders>
        <AccountsContext.Provider value={useAccounts}>
          <UnknownAccountInfo address={address} placeholderName="Root account" />
        </AccountsContext.Provider>
      </MockQueryNodeProviders>
    )
  }
})
