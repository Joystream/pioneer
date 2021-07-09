import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import { ApiContext } from '@/common/providers/api/context'
import { TransferInviteModal } from '@/memberships/modals/TransferInviteModal'
import { seedMembers } from '@/mocks/data'

import { selectMember } from '../../_helpers/selectMember'
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
    stubDefaultBalances(api)
    stubTransaction(api, 'api.tx.members.transferInvites')
  })

  it('Renders a modal', async () => {
    const { findByRole } = renderModal()

    expect(await findByRole('button', { name: /transfer invites/i })).toBeDefined()
  })

  it('Validates form', async () => {
    const { findByLabelText, findByRole } = renderModal()

    expect(await findByRole('button', { name: /transfer invites/i })).toBeDisabled()

    const input = await findByLabelText(/number of invites/i)
    expect(input).toBeDefined()
    fireEvent.change(input, { target: { value: '1' } })

    await selectMember('^to', 'bob')

    expect(await findByRole('button', { name: /transfer invites/i })).toBeEnabled()
  })

  function renderModal() {
    return render(
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
