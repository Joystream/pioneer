import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { ApiContext } from '@/api/providers/context'
import { TransferInviteModal } from '@/memberships/modals/TransferInviteModal'
import { seedMembers } from '@/mocks/data'

import { getButton } from '../../_helpers/getButton'
import { selectFromDropdown } from '../../_helpers/selectFromDropdown'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { stubApi, stubDefaultBalances, stubTransaction } from '../../_mocks/transactions'

jest.mock('@/common/hooks/useModal', () => {
  return {
    useModal: () => ({
      modalData: { memberId: '0' },
    }),
  }
})

describe('UI: TransferInviteModal', () => {
  const mockServer = setupMockServer({ noCleanupAfterEach: true })
  const api = stubApi()

  beforeAll(async () => {
    await cryptoWaitReady()
    seedMembers(mockServer.server, 2)
  })

  beforeEach(async () => {
    stubDefaultBalances()
    stubTransaction(api, 'api.tx.members.transferInvites')
  })

  it('Renders a modal', async () => {
    renderModal()

    expect(await getButton(/transfer invites/i)).toBeDefined()
  })

  it('Validates form', async () => {
    renderModal()

    expect(await getButton(/transfer invites/i)).toBeDisabled()

    const input = await screen.findByLabelText(/number of invites/i)
    expect(input).toBeDefined()
    fireEvent.change(input, { target: { value: 1 } })

    await selectFromDropdown('^to', 'bob')

    expect(await getButton(/transfer invites/i)).toBeEnabled()
  })

  function renderModal() {
    render(
      <MockQueryNodeProviders>
        <MockKeyringProvider>
          <ApiContext.Provider value={api}>
            <TransferInviteModal />
          </ApiContext.Provider>
        </MockKeyringProvider>
      </MockQueryNodeProviders>
    )
  }
})
