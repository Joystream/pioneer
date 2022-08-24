import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import { set } from 'lodash'
import React from 'react'
import { of } from 'rxjs'

import { ApiContext } from '@/api/providers/context'
import { GlobalModals } from '@/app/GlobalModals'
import { ModalContextProvider } from '@/common/providers/modal/provider'
import { UpdateMembershipModal } from '@/memberships/modals/UpdateMembershipModal'
import { Member } from '@/memberships/types'

import { getButton } from '../../_helpers/getButton'
import { selectFromDropdown } from '../../_helpers/selectFromDropdown'
import { createBalanceOf } from '../../_mocks/chainTypes'
import { alice, aliceStash, bob, bobStash } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  stubAccounts,
  stubApi,
  stubBatchTransactionFailure,
  stubBatchTransactionSuccess,
  stubDefaultBalances,
  stubTransaction,
} from '../../_mocks/transactions'

jest.mock('@/common/hooks/useQueryNodeTransactionStatus', () => ({
  useQueryNodeTransactionStatus: () => 'confirmed',
}))

describe('UI: UpdatedMembershipModal', () => {
  beforeAll(async () => {
    await cryptoWaitReady()
    jest.spyOn(console, 'log').mockImplementation()
    stubAccounts([alice, aliceStash, bob, bobStash])
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  setupMockServer()

  const api = stubApi()
  let batchTx: any
  let member: Member

  beforeEach(() => {
    stubDefaultBalances()
    set(api, 'api.query.members.membershipPrice', () => of(createBalanceOf(100)))
    set(api, 'api.query.members.memberIdByHandleHash.size', () => of(new BN(0)))
    stubTransaction(api, 'api.tx.members.updateProfile')
    stubTransaction(api, 'api.tx.members.updateAccounts')
    batchTx = stubTransaction(api, 'api.tx.utility.batch')
    member = getMember('alice')
  })

  it('Renders a modal', async () => {
    renderModal(member)

    expect(await screen.findByText('Edit membership')).toBeDefined()
  })

  it('Enables button on member field change', async () => {
    renderModal(member)

    expect(await getButton(/^Save changes$/i)).toBeDisabled()

    fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })

    expect(await getButton(/^Save changes$/i)).toBeEnabled()
  })

  it('Enables save button on account change', async () => {
    renderModal(member)

    await selectFromDropdown('root account', 'bob')

    expect(await getButton(/^Save changes$/i)).toBeEnabled()
  })

  it('Disables button when invalid avatar URL', async () => {
    renderModal(member)

    fireEvent.change(await screen.findByLabelText(/member avatar/i), { target: { value: 'avatar' } })
    expect(await getButton(/^Save changes$/i)).toBeDisabled()

    fireEvent.change(await screen.findByLabelText(/member avatar/i), {
      target: { value: 'http://example.com/example.jpg' },
    })
    expect(await getButton(/^Save changes$/i)).toBeEnabled()
  })

  describe('Authorize - member field', () => {
    async function changeNameAndSave() {
      renderModal(member)
      fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
      fireEvent.click(await screen.findByText(/^Save changes$/i))
    }

    it('Authorize step', async () => {
      await changeNameAndSave()

      expect(await screen.findByText('modals.authorizeTransaction.title')).toBeDefined()
      expect((await screen.findByText(/^modals.transactionFee.label/i))?.nextSibling?.textContent).toBe('25')
    })

    it('Success step', async () => {
      stubBatchTransactionSuccess(batchTx)
      await changeNameAndSave()

      fireEvent.click(screen.getByText(/^sign and update a member$/i))

      expect(await screen.findByText('Success')).toBeDefined()
    })

    it('Failure step', async () => {
      stubBatchTransactionFailure(batchTx)
      await changeNameAndSave()

      fireEvent.click(screen.getByText(/^sign and update a member$/i))

      expect(await screen.findByText('Failure')).toBeDefined()
    })
  })

  function renderModal(member: Member) {
    render(
      <MockQueryNodeProviders>
        <MockKeyringProvider>
          <ApiContext.Provider value={api}>
            <ModalContextProvider>
              <GlobalModals />
              <UpdateMembershipModal onClose={() => undefined} member={member} />
            </ModalContextProvider>
          </ApiContext.Provider>
        </MockKeyringProvider>
      </MockQueryNodeProviders>
    )
  }
})
