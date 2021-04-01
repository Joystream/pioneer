import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render } from '@testing-library/react'
import BN from 'bn.js'
import { set } from 'lodash'
import React from 'react'
import { of } from 'rxjs'
import { Account } from '../../src/common/types'
import { AddMembershipModal } from '../../src/modals/AddMembershipModal'
import { ApiContext } from '../../src/providers/api/context'
import { selectAccount } from '../helpers/selectAccount'
import { alice, bob } from '../mocks/keyring'
import { MockKeyringProvider, MockQueryNodeProviders } from '../mocks/providers'
import { setupMockServer } from '../mocks/server'
import {
  stubApi,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../mocks/transactions'

const useAccounts: { hasAccounts: boolean; allAccounts: Account[] } = {
  hasAccounts: false,
  allAccounts: [],
}

jest.mock('../../src/hooks/useAccounts', () => {
  return {
    useAccounts: () => useAccounts,
  }
})

const mockCallback = jest.fn()

jest.mock('../../src/hooks/useModal', () => {
  return {
    useModal: () => ({
      showModal: mockCallback,
      hideModal: () => null,
    }),
  }
})

describe('UI: AddMembershipModal', () => {
  beforeAll(async () => {
    await cryptoWaitReady()
    jest.spyOn(console, 'log').mockImplementation()
    useAccounts.allAccounts.push(alice, bob)
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  setupMockServer()

  const api = stubApi()

  let transaction: any

  beforeEach(async () => {
    stubDefaultBalances(api)
    set(api, 'api.query.members.membershipPrice', () => of({ toBn: () => new BN(100) }))
    set(api, 'api.query.members.memberIdByHandleHash.size', () => of(new BN(0)))
    transaction = stubTransaction(api, 'api.tx.members.buyMembership')
  })

  it('Renders a modal', async () => {
    const { findByText } = renderModal()

    expect(await findByText('Add membership')).toBeDefined()
    expect((await findByText('Creation fee:'))?.parentNode?.textContent).toMatch(/^Creation fee:100/i)
  })

  it('Enables button when valid form', async () => {
    const { findByText, getByText, getByLabelText } = renderModal()

    expect(getByText(/^Create a membership$/i)).toBeDisabled()

    await selectAccount('Root account', 'bob')
    await selectAccount('Controller account', 'alice')
    fireEvent.change(getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
    fireEvent.change(getByLabelText(/membership handle/i), { target: { value: 'realbobbybob' } })
    fireEvent.click(getByLabelText(/I agree to the terms/i))

    expect(await findByText(/^Create a membership$/i)).not.toBeDisabled()
  })

  it('Disables button when invalid avatar URL', async () => {
    const { findByText, getByText, getByLabelText } = renderModal()

    expect(getByText(/^Create a membership$/i)).toBeDisabled()

    await selectAccount('Root account', 'bob')
    await selectAccount('Controller account', 'alice')
    fireEvent.change(getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
    fireEvent.change(getByLabelText(/membership handle/i), { target: { value: 'realbobbybob' } })
    fireEvent.click(getByLabelText(/I agree to the terms/i))

    fireEvent.change(getByLabelText(/member avatar/i), { target: { value: 'avatar' } })
    expect(await findByText(/^Create a membership$/i)).toBeDisabled()

    fireEvent.change(getByLabelText(/member avatar/i), { target: { value: 'http://example.com/example.jpg' } })
    expect(await findByText(/^Create a membership$/i)).not.toBeDisabled()
  })

  describe('Authorize step', () => {
    const renderAuthorizeStep = async () => {
      const rendered = renderModal()
      const { findByText, getByLabelText } = rendered

      await selectAccount('Root account', 'bob')
      await selectAccount('Controller account', 'alice')
      fireEvent.change(getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
      fireEvent.change(getByLabelText(/membership handle/i), { target: { value: 'realbobbybob' } })
      fireEvent.change(getByLabelText(/about member/i), { target: { value: "I'm Bob" } })
      fireEvent.change(getByLabelText(/member avatar/i), { target: { value: 'http://example.com/example.jpg' } })
      fireEvent.click(getByLabelText(/I agree to the terms/i))

      fireEvent.click(await findByText(/^Create a membership$/i))

      return rendered
    }

    it('Renders authorize transaction', async () => {
      const { getByText, getByRole } = await renderAuthorizeStep()

      expect(getByText('Authorize transaction')).toBeDefined()
      expect(getByText(/^Creation fee:/i)?.nextSibling?.textContent).toBe('100')
      expect(getByText(/^Transaction fee:/i)?.nextSibling?.textContent).toBe('25')
      expect(getByRole('heading', { name: /alice/i })).toBeDefined()
    })

    describe('Success', () => {
      it('Renders transaction success', async () => {
        stubTransactionSuccess(transaction, [1], 'members', 'MemberRegistered')
        const { getByText, findByText } = await renderAuthorizeStep()

        fireEvent.click(getByText(/^sign and create a member$/i))

        expect(await findByText('Success')).toBeDefined()
        expect(getByText(/^realbobbybob/i)).toBeDefined()
      })

      it('Enables the View My Profile button', async () => {
        stubTransactionSuccess(transaction, [12], 'members', 'MemberRegistered')
        const { getByText, findByText, findByRole } = await renderAuthorizeStep()

        fireEvent.click(getByText(/^sign and create a member$/i))

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
        const { getByText, findByText } = await renderAuthorizeStep()

        fireEvent.click(getByText(/^sign and create a member$/i))

        expect(await findByText('Failure')).toBeDefined()
      })
    })
  })

  function renderModal() {
    return render(
      <MockQueryNodeProviders>
        <MockKeyringProvider>
          <ApiContext.Provider value={api}>
            <AddMembershipModal />
          </ApiContext.Provider>
        </MockKeyringProvider>
      </MockQueryNodeProviders>
    )
  }
})
