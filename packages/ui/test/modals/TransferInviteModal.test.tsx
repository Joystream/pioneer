import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import { seedMembers } from '../../src/mocks/data'
import { TransferInviteModal } from '../../src/modals/TransferInviteModal'
import { ApiContext } from '../../src/providers/api/context'
import { selectMember } from '../helpers/selectMember'
import { MockKeyringProvider, MockQueryNodeProviders } from '../mocks/providers'
import { setupMockServer } from '../mocks/server'
import { stubApi, stubDefaultBalances, stubTransaction } from '../mocks/transactions'

jest.mock('../../src/hooks/useModal', () => {
  return {
    useModal: () => ({
      modalData: { memberId: '0' },
    }),
  }
})

describe('UI: TransferInviteModal', () => {
  beforeAll(cryptoWaitReady)

  const mockServer = setupMockServer()
  const api = stubApi()

  beforeEach(async () => {
    stubDefaultBalances(api)
    stubTransaction(api, 'api.tx.members.transferInvites')
  })

  it('Renders a modal', async () => {
    seedMembers(mockServer.server)

    const { findByRole } = renderModal()

    expect(await findByRole('button', { name: /transfer invites/i })).toBeDefined()
  })

  it('Validates form', async () => {
    seedMembers(mockServer.server)

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
