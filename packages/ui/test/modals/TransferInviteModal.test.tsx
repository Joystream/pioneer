import { render } from '@testing-library/react'
import React from 'react'
import { TransferIcon } from '../../src/components/icons'
import { TransferInviteModal } from '../../src/modals/TransferInviteModal'
import { ApiContext } from '../../src/providers/api/context'
import { KeyringContext } from '../../src/providers/keyring/context'
import { MockQueryNodeProviders } from '../helpers/providers'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { setupMockServer } from '../mocks/server'
import { UseApi } from '../../src/providers/api/provider'
import { ApiRx } from '@polkadot/api'
import { Keyring } from '@polkadot/ui-keyring/Keyring'
import { mockKeyring } from '../mocks/keyring'

describe('UI: TransferInviteModal', () => {
  beforeAll(cryptoWaitReady)

  setupMockServer()

  const api: UseApi = {
    api: ({} as unknown) as ApiRx,
    isConnected: true,
  }

  let keyring: Keyring

  beforeEach(async () => {
    keyring = mockKeyring()
  })

  it('Renders a modal', () => {
    const { findByText } = renderModal()
    expect(findByText(/transfer invites/i)).toBeDefined()
  })
  function renderModal() {
    return render(
      <MockQueryNodeProviders>
        <KeyringContext.Provider value={keyring}>
          <ApiContext.Provider value={api}>
            <TransferInviteModal onClose={() => null} icon={<TransferIcon />} member={undefined} />
          </ApiContext.Provider>
        </KeyringContext.Provider>
      </MockQueryNodeProviders>
    )
  }
})
