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

import { getButton } from '../../_helpers/getButton'
import { selectFromDropdown } from '../../_helpers/selectFromDropdown'
import { createBalanceOf } from '../../_mocks/chainTypes'
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

const useMyAccounts: { hasAccounts: boolean; allAccounts: Account[] } = {
  hasAccounts: false,
  allAccounts: [],
}

jest.mock('@/accounts/hooks/useMyAccounts', () => {
  return {
    useMyAccounts: () => useMyAccounts,
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
    useMyAccounts.allAccounts.push(alice, bob)
  })

  beforeEach(async () => {
    stubDefaultBalances(api)
    set(api, 'api.query.members.membershipPrice', () => of(createBalanceOf(100)))
    set(api, 'api.query.members.memberIdByHandleHash.size', () => of(new BN(0)))
    transaction = stubTransaction(api, 'api.tx.members.buyMembership')
  })

  it('Renders a modal', async () => {
    renderModal()

    expect(await screen.findByText('Add membership')).toBeDefined()
    expect((await screen.findByText('Creation fee:'))?.parentNode?.textContent).toMatch(/^Creation fee:100/i)
  })

  it('Enables button when valid form', async () => {
    renderModal()

    expect(await findSubmitButton()).toBeDisabled()

    await selectFromDropdown('Root account', 'bob')
    await selectFromDropdown('Controller account', 'alice')
    fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
    fireEvent.change(screen.getByLabelText(/membership handle/i), { target: { value: 'realbobbybob' } })
    fireEvent.click(screen.getByLabelText(/I agree to the terms/i))

    expect(await findSubmitButton()).not.toBeDisabled()
  })

  it('Disables button when invalid avatar URL', async () => {
    renderModal()

    expect(await findSubmitButton()).toBeDisabled()

    await selectFromDropdown('Root account', 'bob')
    await selectFromDropdown('Controller account', 'alice')
    fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
    fireEvent.change(screen.getByLabelText(/membership handle/i), { target: { value: 'realbobbybob' } })
    fireEvent.click(screen.getByLabelText(/I agree to the terms/i))

    fireEvent.change(screen.getByLabelText(/member avatar/i), { target: { value: 'avatar' } })
    expect(await findSubmitButton()).toBeDisabled()

    fireEvent.change(screen.getByLabelText(/member avatar/i), { target: { value: 'http://example.com/example.jpg' } })
    expect(await findSubmitButton()).not.toBeDisabled()
  })

  describe('Authorize step', () => {
    const renderAuthorizeStep = async () => {
      renderModal()

      await selectFromDropdown('Root account', 'bob')
      await selectFromDropdown('Controller account', 'alice')
      fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
      fireEvent.change(screen.getByLabelText(/membership handle/i), { target: { value: 'realbobbybob' } })
      fireEvent.change(screen.getByLabelText(/about member/i), { target: { value: "I'm Bob" } })
      fireEvent.change(screen.getByLabelText(/member avatar/i), { target: { value: 'http://example.com/example.jpg' } })
      fireEvent.click(screen.getByLabelText(/I agree to the terms/i))

      fireEvent.click(await findSubmitButton())
    }

    it('Renders authorize transaction', async () => {
      await renderAuthorizeStep()

      expect(screen.getByText('Authorize transaction')).toBeDefined()
      expect(screen.getByText(/^Creation fee:/i)?.nextSibling?.textContent).toBe('100')
      expect(screen.getByText(/^Transaction fee:/i)?.nextSibling?.textContent).toBe('25')
      expect(screen.getByRole('heading', { name: /alice/i })).toBeDefined()
    })

    it('Without required balance', async () => {
      stubBalances(api, { available: 0, locked: 0 })

      await renderAuthorizeStep()

      expect(await getButton(/^sign and/i)).toBeDisabled()
    })

    describe('Success', () => {
      it('Renders transaction success', async () => {
        stubTransactionSuccess(transaction, [1], 'members', 'MemberRegistered')
        await renderAuthorizeStep()

        fireEvent.click(await getButton(/^sign and create a member$/i))

        expect(await screen.findByText('Success')).toBeDefined()
        expect(screen.getByText(/^realbobbybob/i)).toBeDefined()
      })

      it('Enables the View My Profile button', async () => {
        stubTransactionSuccess(transaction, [registry.createType('MemberId', 12)], 'members', 'MemberRegistered')
        await renderAuthorizeStep()

        fireEvent.click(await getButton(/^sign and create a member$/i))

        expect(await screen.findByText('Success')).toBeDefined()
        const button = await getButton('View my profile')
        expect(button).toBeEnabled()
        fireEvent.click(button)
        expect(mockCallback.mock.calls[0][0]).toEqual({ modal: 'Member', data: { id: '12' } })
      })
    })

    describe('Failure', () => {
      it('Renders transaction failure', async () => {
        stubTransactionFailure(transaction)
        await renderAuthorizeStep()

        fireEvent.click(await getButton(/^sign and create a member$/i))

        expect(await screen.findByText('Failure')).toBeDefined()
      })
    })
  })

  async function findSubmitButton() {
    return await getButton(/^Create a membership$/i)
  }

  function renderModal() {
    render(
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
