import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { UnknownAccountInfo } from '../../../src/accounts/components/UnknownAccountInfo'
import { alice, bob } from '../../_mocks/keyring'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { stubAccounts } from '../../_mocks/transactions'

describe('UI: UnknownAccountInfo component', () => {
  setupMockServer()

  jest.useFakeTimers()

  beforeAll(async () => {
    stubAccounts([alice, bob])
    await cryptoWaitReady()
  })

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
        <UnknownAccountInfo address={address} placeholderName="Root account" />
      </MockQueryNodeProviders>
    )
  }
})
