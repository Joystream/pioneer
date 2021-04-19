import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render } from '@testing-library/react'
import React from 'react'

import { Account } from '../../../src/accounts/types'
import { ApiContext } from '../../../src/common/providers/api/context'
import { ApplyForRoleModal } from '../../../src/working-groups/modals/ApplyForRoleModal'
import { alice, bob } from '../../_mocks/keyring'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { stubApi, stubDefaultBalances } from '../../_mocks/transactions'

const useAccounts: { hasAccounts: boolean; allAccounts: Account[] } = {
  hasAccounts: false,
  allAccounts: [],
}

jest.mock('../../../src/accounts/hooks/useAccounts', () => {
  return {
    useAccounts: () => useAccounts,
  }
})

const mockCallback = jest.fn()

jest.mock('../../../src/common/hooks/useModal', () => {
  return {
    useModal: () => ({
      showModal: mockCallback,
      hideModal: () => null,
    }),
  }
})

describe('UI: ApplyForRoleModal', () => {
  const api = stubApi()

  setupMockServer()

  beforeAll(async () => {
    await cryptoWaitReady()
    jest.spyOn(console, 'log').mockImplementation()
    useAccounts.allAccounts.push(alice, bob)
  })

  beforeEach(async () => {
    stubDefaultBalances(api)
  })

  it('Renders a modal', async () => {
    const { findByText } = renderModal()

    expect(await findByText('Apply for role')).toBeDefined()
  })

  function renderModal() {
    return render(
      <MockQueryNodeProviders>
        <MockKeyringProvider>
          <ApiContext.Provider value={api}>
            <ApplyForRoleModal />
          </ApiContext.Provider>
        </MockKeyringProvider>
      </MockQueryNodeProviders>
    )
  }
})
