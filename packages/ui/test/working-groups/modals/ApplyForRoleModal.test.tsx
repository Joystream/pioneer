import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { Account } from '../../../src/accounts/types'
import { ApiContext } from '../../../src/common/providers/api/context'
import { ModalContext } from '../../../src/common/providers/modal/context'
import { UseModal } from '../../../src/common/providers/modal/types'
import { seedOpenings, seedOpeningStatuses } from '../../../src/mocks/data/mockOpenings'
import { seedWorkingGroups } from '../../../src/mocks/data/mockWorkingGroups'
import { fixAssociations } from '../../../src/mocks/server'
import { ApplyForRoleModal } from '../../../src/working-groups/modals/ApplyForRoleModal'
import { WorkingGroupOpeningFieldsFragment } from '../../../src/working-groups/queries'
import { asWorkingGroupOpening } from '../../../src/working-groups/types'
import { selectAccount } from '../../_helpers/selectAccount'
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

describe('UI: ApplyForRoleModal', () => {
  const api = stubApi()
  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: null,
    modalData: undefined,
  }

  const server = setupMockServer()

  beforeAll(async () => {
    await cryptoWaitReady()
    jest.spyOn(console, 'log').mockImplementation()
    useAccounts.allAccounts.push(alice, bob)
  })

  beforeEach(async () => {
    fixAssociations((server.server as unknown) as any)
    seedWorkingGroups(server.server)
    seedOpeningStatuses(server.server)
    seedOpenings(server.server)

    const fields = (server.server?.schema.first('WorkingGroupOpening') as unknown) as WorkingGroupOpeningFieldsFragment
    const opening = asWorkingGroupOpening(fields)
    useModal.modalData = { opening }

    stubDefaultBalances(api)
  })

  it('Renders a modal', async () => {
    renderModal()

    expect(await screen.findByText('Applying for role')).toBeDefined()
  })

  describe('Stake step', () => {
    it('Validates fields', async () => {
      renderModal()

      const button = await screen.findByRole('button', { name: /Next step/i })
      expect(button).toBeDisabled()

      await selectAccount('Select an account for Staking', 'alice')

      const input = await screen.findByLabelText(/Select amount for staking/i)
      await fireEvent.change(input, { target: { value: '50' } })

      expect(button).toBeDisabled()

      await fireEvent.change(input, { target: { value: '500000' } })

      expect(button).not.toBeDisabled()
    })
  })

  function renderModal() {
    return render(
      <ModalContext.Provider value={useModal}>
        <MockQueryNodeProviders>
          <MockKeyringProvider>
            <ApiContext.Provider value={api}>
              <ApplyForRoleModal />
            </ApiContext.Provider>
          </MockKeyringProvider>
        </MockQueryNodeProviders>
      </ModalContext.Provider>
    )
  }
})
