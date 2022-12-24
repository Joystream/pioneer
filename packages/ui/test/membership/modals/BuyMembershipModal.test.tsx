import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, configure, fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import { set } from 'lodash'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { of } from 'rxjs'

import { ApiContext } from '@/api/providers/context'
import { GlobalModals } from '@/app/GlobalModals'
import { createType } from '@/common/model/createType'
import { ModalContextProvider } from '@/common/providers/modal/provider'
import { BuyMembershipModal } from '@/memberships/modals/BuyMembershipModal'

import { getButton } from '../../_helpers/getButton'
import { selectFromDropdown } from '../../_helpers/selectFromDropdown'
import { createBalanceOf } from '../../_mocks/chainTypes'
import { alice, bob } from '../../_mocks/keyring'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  stubAccounts,
  stubApi,
  stubBalances,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'
import { mockUseModalCall } from '../../setup'

configure({ testIdAttribute: 'id' })

describe('UI: BuyMembershipModal', () => {
  const api = stubApi()
  let transaction: any
  const showModal = jest.fn()

  setupMockServer()

  beforeAll(async () => {
    await cryptoWaitReady()
    mockUseModalCall({ showModal })
    jest.spyOn(console, 'log').mockImplementation()
    stubAccounts([alice, bob])
  })

  beforeEach(async () => {
    stubDefaultBalances()
    set(api, 'api.query.members.membershipPrice', () => of(createBalanceOf(100)))
    set(api, 'api.query.members.memberIdByHandleHash.size', () => of(new BN(0)))
    transaction = stubTransaction(api, 'api.tx.members.buyMembership')
  })

  it('Renders a modal', async () => {
    await renderModal()

    expect(await screen.findByText('Add membership')).toBeDefined()
    expect((await screen.findByText('Creation fee:'))?.parentNode?.textContent).toMatch(/^Creation fee:100/i)
  })

  it('Disables button on incorrect email address', async () => {
    await renderModal()
    const submitButton = await findSubmitButton()
    await fillForm()
    await act(() => {
      fireEvent.click(screen.getByTestId('email-tile'))
      fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'invalid email' } })
    })
    expect(submitButton).toBeDisabled()
  })

  it('Enables button when valid form', async () => {
    await renderModal()
    const submitButton = await findSubmitButton()

    expect(submitButton).toBeDisabled()
    await fillForm()
    expect(submitButton).not.toBeDisabled()
  })

  // Skip because avatar is not mandatory ATM (this test shouldn't have been passing)
  it.skip('Disables button when invalid avatar URL', async () => {
    await renderModal()
    const submitButton = await findSubmitButton()
    expect(submitButton).toBeDisabled()

    await fillForm()
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/member avatar/i), { target: { value: 'avatar' } })
    })
    expect(submitButton).toBeDisabled()

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/member avatar/i), { target: { value: 'http://example.com/example.jpg' } })
    })
    expect(submitButton).not.toBeDisabled()
  })

  describe('Authorize step', () => {
    const renderAuthorizeStep = async () => {
      await renderModal()
      await fillForm()

      fireEvent.click(await findSubmitButton())
    }

    it('Renders authorize transaction', async () => {
      await renderAuthorizeStep()

      expect(screen.getByText('modals.authorizeTransaction.title')).toBeDefined()
      expect(screen.getByText(/^Creation fee:/i)?.nextSibling?.textContent).toBe('100')
      expect(screen.getByText(/^modals.transactionFee.label/i)?.nextSibling?.textContent).toBe('25')
      expect(screen.getByRole('heading', { name: /alice/i })).toBeDefined()
    })

    it('Without required balance', async () => {
      stubBalances({ available: 0, locked: 0 })

      await renderAuthorizeStep()

      expect(await getButton(/^sign and/i)).toBeDisabled()
    })

    describe('Success', () => {
      it('Renders transaction success', async () => {
        stubTransactionSuccess(transaction, 'members', 'MembershipBought', [createType('MemberId', 1)])
        await renderAuthorizeStep()

        await act(async () => {
          fireEvent.click(await getButton(/^sign and create a member$/i))
        })

        expect(await screen.findByText('Success')).toBeDefined()
        expect(screen.getByText(/^realbobbybob/i)).toBeDefined()
      })

      it('Enables the View My Profile button', async () => {
        stubTransactionSuccess(transaction, 'members', 'MembershipBought', [createType('MemberId', 12)])
        await renderAuthorizeStep()

        await act(async () => {
          fireEvent.click(await getButton(/^sign and create a member$/i))
        })

        expect(await screen.findByText('Success')).toBeDefined()
        const button = await getButton('View my profile')
        expect(button).toBeEnabled()
        await act(async () => {
          fireEvent.click(button)
        })
        expect(showModal.mock.calls[0][0]).toEqual({ modal: 'Member', data: { id: '12' } })
      })
    })

    describe('Failure', () => {
      it('Renders transaction failure', async () => {
        stubTransactionFailure(transaction)
        await renderAuthorizeStep()

        await act(async () => {
          fireEvent.click(await getButton(/^sign and create a member$/i))
        })

        expect(await screen.findByText('Failure')).toBeDefined()
      })
    })
  })

  async function fillForm() {
    await selectFromDropdown('Root account', 'bob')
    await selectFromDropdown('Controller account', 'alice')
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: 'BobbyBob' } })
      fireEvent.change(screen.getByLabelText(/Membership handle/i), { target: { value: 'realbobbybob' } })
      fireEvent.click(screen.getByLabelText(/I agree to the terms/i))
    })
  }

  async function findSubmitButton() {
    return await getButton(/^Create a membership$/i)
  }

  async function renderModal() {
    await act(async () => {
      render(
        <MemoryRouter>
          <MockQueryNodeProviders>
            <MockKeyringProvider>
              <ApiContext.Provider value={api}>
                <ModalContextProvider>
                  <GlobalModals />
                  <BuyMembershipModal />
                </ModalContextProvider>
              </ApiContext.Provider>
            </MockKeyringProvider>
          </MockQueryNodeProviders>
        </MemoryRouter>
      )
    })
  }
})
