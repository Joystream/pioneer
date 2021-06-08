import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import { set } from 'lodash'
import React from 'react'
import { of } from 'rxjs'

import { UseAccounts } from '../../../src/accounts/providers/accounts/provider'
import { ApiContext } from '../../../src/common/providers/api/context'
import { UpdateMembershipModal } from '../../../src/memberships/modals/UpdateMembershipModal'
import { Member } from '../../../src/memberships/types'
import { selectAccount } from '../../_helpers/selectAccount'
import { toBalanceOf } from '../../_mocks/chainTypes'
import { alice, aliceStash, bob, bobStash } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  stubApi,
  stubBatchTransactionFailure,
  stubBatchTransactionSuccess,
  stubDefaultBalances,
  stubTransaction,
} from '../../_mocks/transactions'

const useMyAccounts: UseAccounts = {
  hasAccounts: true,
  allAccounts: [],
}

jest.mock('../../../src/accounts/hooks/useMyAccounts', () => {
  return {
    useMyAccounts: () => useMyAccounts,
  }
})

describe('UI: UpdatedMembershipModal', () => {
  beforeAll(async () => {
    await cryptoWaitReady()
    jest.spyOn(console, 'log').mockImplementation()
    useMyAccounts.allAccounts.push(alice, aliceStash, bob, bobStash)
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  setupMockServer()

  const api = stubApi()
  let batchTx: any
  let member: Member

  beforeEach(() => {
    stubDefaultBalances(api)
    set(api, 'api.query.members.membershipPrice', () => of(toBalanceOf(100)))
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

    expect(await screen.findByRole('button', { name: /^Save changes$/i })).toBeDisabled()

    fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })

    expect(await screen.findByRole('button', { name: /^Save changes$/i })).toBeEnabled()
  })

  it('Enables save button on account change', async () => {
    renderModal(member)

    await selectAccount('root account', 'bob')

    expect(await screen.findByRole('button', { name: /^Save changes$/i })).toBeEnabled()
  })

  it('Disables button when invalid avatar URL', async () => {
    renderModal(member)

    fireEvent.change(await screen.findByLabelText(/member avatar/i), { target: { value: 'avatar' } })
    expect(await screen.findByRole('button', { name: /^Save changes$/i })).toBeDisabled()

    fireEvent.change(await screen.findByLabelText(/member avatar/i), {
      target: { value: 'http://example.com/example.jpg' },
    })
    expect(await screen.findByRole('button', { name: /^Save changes$/i })).toBeEnabled()
  })

  describe('Authorize - member field', () => {
    async function changeNameAndSave() {
      renderModal(member)
      fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
      fireEvent.click(await screen.findByText(/^Save changes$/i))
    }

    it('Authorize step', async () => {
      await changeNameAndSave()

      expect(await screen.findByText('Authorize transaction')).toBeDefined()
      expect((await screen.findByText(/^Transaction fee:/i))?.nextSibling?.textContent).toBe('25')
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
            <UpdateMembershipModal onClose={() => undefined} member={member} />
          </ApiContext.Provider>
        </MockKeyringProvider>
      </MockQueryNodeProviders>
    )
  }
})
