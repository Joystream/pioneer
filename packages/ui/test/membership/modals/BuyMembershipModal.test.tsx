import { registry } from '@joystream/types'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import { set } from 'lodash'
import React from 'react'
import { of } from 'rxjs'

import { Account } from '@/accounts/types'
import { ApiContext } from '@/common/providers/api/context'
import { BuyMembershipModal } from '@/memberships/modals/BuyMembershipModal'

import { selectAccount } from '../../_helpers/selectAccount'
import { toBalanceOf } from '../../_mocks/chainTypes'
import { alice, bob } from '../../_mocks/keyring'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  stubApi,
  stubBalances,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'

const useAccounts: { hasAccounts: boolean; allAccounts: Account[] } = {
  hasAccounts: false,
  allAccounts: [],
}

jest.mock('@/accounts/hooks/useAccounts', () => {
  return {
    useAccounts: () => useAccounts,
  }
})

const mockCallback = jest.fn()

jest.mock('@/common/hooks/useModal', () => {
  return {
    useModal: () => ({
      showModal: mockCallback,
      hideModal: () => null,
    }),
  }
})

describe('UI: BuyMembershipModal', () => {
  const api = stubApi()
  let transaction: any

  setupMockServer()

  beforeAll(async () => {
    await cryptoWaitReady()
    jest.spyOn(console, 'log').mockImplementation()
    useAccounts.allAccounts.push(alice, bob)
  })

  beforeEach(async () => {
    stubDefaultBalances(api)
    set(api, 'api.query.members.membershipPrice', () => of(toBalanceOf(100)))
    set(api, 'api.query.members.memberIdByHandleHash.size', () => of(new BN(0)))
    transaction = stubTransaction(api, 'api.tx.members.buyMembership')
  })

  it('Renders a modal', async () => {
    const { findByText } = renderModal()

    expect(await findByText('Add membership')).toBeDefined()
    expect((await findByText('Creation fee:'))?.parentNode?.textContent).toMatch(/^Creation fee:100/i)
  })

  it('Enables button when valid form', async () => {
    const { getByLabelText } = renderModal()

    expect(await findSubmitButton()).toBeDisabled()

    await selectAccount('Root account', 'bob')
    await selectAccount('Controller account', 'alice')
    fireEvent.change(getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
    fireEvent.change(getByLabelText(/membership handle/i), { target: { value: 'realbobbybob' } })
    fireEvent.click(getByLabelText(/I agree to the terms/i))

    expect(await findSubmitButton()).not.toBeDisabled()
  })

  it('Disables button when invalid avatar URL', async () => {
    const { getByLabelText } = renderModal()

    expect(await findSubmitButton()).toBeDisabled()

    await selectAccount('Root account', 'bob')
    await selectAccount('Controller account', 'alice')
    fireEvent.change(getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
    fireEvent.change(getByLabelText(/membership handle/i), { target: { value: 'realbobbybob' } })
    fireEvent.click(getByLabelText(/I agree to the terms/i))

    fireEvent.change(getByLabelText(/member avatar/i), { target: { value: 'avatar' } })
    expect(await findSubmitButton()).toBeDisabled()

    fireEvent.change(getByLabelText(/member avatar/i), { target: { value: 'http://example.com/example.jpg' } })
    expect(await findSubmitButton()).not.toBeDisabled()
  })

  describe('Authorize step', () => {
    const renderAuthorizeStep = async () => {
      const rendered = renderModal()
      const { getByLabelText } = rendered

      await selectAccount('Root account', 'bob')
      await selectAccount('Controller account', 'alice')
      fireEvent.change(getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
      fireEvent.change(getByLabelText(/membership handle/i), { target: { value: 'realbobbybob' } })
      fireEvent.change(getByLabelText(/about member/i), { target: { value: "I'm Bob" } })
      fireEvent.change(getByLabelText(/member avatar/i), { target: { value: 'http://example.com/example.jpg' } })
      fireEvent.click(getByLabelText(/I agree to the terms/i))

      fireEvent.click(await findSubmitButton())

      return rendered
    }

    it('Renders authorize transaction', async () => {
      const { getByText, getByRole } = await renderAuthorizeStep()

      expect(getByText('Authorize transaction')).toBeDefined()
      expect(getByText(/^Creation fee:/i)?.nextSibling?.textContent).toBe('100')
      expect(getByText(/^Transaction fee:/i)?.nextSibling?.textContent).toBe('25')
      expect(getByRole('heading', { name: /alice/i })).toBeDefined()
    })

    it('Without required balance', async () => {
      stubBalances(api, { available: 0, locked: 0 })

      const { findByRole } = await renderAuthorizeStep()

      expect(await findByRole('button', { name: /^sign and/i })).toBeDisabled()
    })

    describe('Success', () => {
      it('Renders transaction success', async () => {
        stubTransactionSuccess(transaction, [1], 'members', 'MemberRegistered')
        const { getByText, findByText } = await renderAuthorizeStep()

        fireEvent.click(await screen.findByRole('button', { name: /^sign and create a member$/i }))

        expect(await findByText('Success')).toBeDefined()
        expect(getByText(/^realbobbybob/i)).toBeDefined()
      })

      it('Enables the View My Profile button', async () => {
        stubTransactionSuccess(transaction, [registry.createType('MemberId', 12)], 'members', 'MemberRegistered')
        const { findByText, findByRole } = await renderAuthorizeStep()

        fireEvent.click(await screen.findByRole('button', { name: /^sign and create a member$/i }))

        expect(await findByText('Success')).toBeDefined()
        const button = await findByRole('button', { name: 'View my profile' })
        expect(button).toBeEnabled()
        fireEvent.click(button)
        expect(mockCallback.mock.calls[0][0]).toEqual({ modal: 'Member', data: { id: '12' } })
      })
    })

    describe('Failure', () => {
      it('Renders transaction failure', async () => {
        stubTransactionFailure(transaction)
        const { findByText } = await renderAuthorizeStep()

        fireEvent.click(await screen.findByRole('button', { name: /^sign and create a member$/i }))

        expect(await findByText('Failure')).toBeDefined()
      })
    })
  })

  async function findSubmitButton() {
    return await screen.findByRole('button', { name: /^Create a membership$/i })
  }

  function renderModal() {
    return render(
      <MockQueryNodeProviders>
        <MockKeyringProvider>
          <ApiContext.Provider value={api}>
            <BuyMembershipModal />
          </ApiContext.Provider>
        </MockKeyringProvider>
      </MockQueryNodeProviders>
    )
  }
})
