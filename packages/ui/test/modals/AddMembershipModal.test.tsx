import { beforeAll, expect } from '@jest/globals'
import { ApiRx } from '@polkadot/api'
import { Keyring } from '@polkadot/ui-keyring/Keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render } from '@testing-library/react'
import BN from 'bn.js'
import { set } from 'lodash'
import React from 'react'
import { from, of } from 'rxjs'
import sinon from 'sinon'
import { Account } from '../../src/common/types'
import * as useAccountsModule from '../../src/hooks/useAccounts'
import { AddMembershipModal } from '../../src/modals/AddMembershipModal'
import { ApiContext } from '../../src/providers/api/context'
import { UseApi } from '../../src/providers/api/provider'
import { KeyringContext } from '../../src/providers/keyring/context'
import { MockQueryNodeProviders } from '../helpers/providers'
import { selectAccount } from '../helpers/selectAccount'
import { aliceSigner, bobSigner, mockKeyring } from '../mocks/keyring'
import { setupMockServer } from '../mocks/server'
import { stubTransactionResult } from '../mocks/stubTransactionResult'

describe('UI: AddMembershipModal', () => {
  beforeAll(cryptoWaitReady)

  setupMockServer()

  const api: UseApi = {
    api: ({} as unknown) as ApiRx,
    isConnected: true,
  }
  let fromAccount: Account
  let to: Account
  let accounts: {
    hasAccounts: boolean
    allAccounts: Account[]
  }
  let transaction: any
  let query: any
  let keyring: Keyring

  beforeEach(async () => {
    keyring = mockKeyring()
    fromAccount = {
      address: (await aliceSigner()).address,
      name: 'alice',
    }
    to = {
      address: (await bobSigner()).address,
      name: 'bob',
    }
    set(api, 'api.derive.balances.all', () =>
      from([
        {
          availableBalance: new BN(1000),
          lockedBalance: new BN(0),
        },
      ])
    )
    query = {}

    set(query, 'members.membershipPrice', () => of(set({}, 'toBn', () => new BN(100))))
    set(api, 'api.query', query)
    transaction = {}
    set(transaction, 'paymentInfo', () => of(set({}, 'partialFee.toBn', () => new BN(25))))
    set(api, 'api.tx.members.buyMembership', () => transaction)

    accounts = {
      hasAccounts: true,
      allAccounts: [fromAccount, to],
    }
    sinon.stub(useAccountsModule, 'useAccounts').returns(accounts)
  })

  afterEach(() => {
    sinon.restore()
  })

  it('Renders a modal', () => {
    const { getByText } = renderModal()

    expect(getByText('Add membership')).toBeDefined()
    expect(getByText('Creation fee:')?.parentNode?.textContent).toMatch(/^Creation fee:100/i)
  })

  it('Enables button when valid form', async () => {
    const { findByText, getByText, getByLabelText } = renderModal()

    const button = getByText(/^Create a membership$/i) as HTMLButtonElement
    expect(button.disabled).toBe(true)

    selectAccount('Root account', 'bob', getByText)
    selectAccount('Controller account', 'alice', getByText)
    fireEvent.change(getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
    fireEvent.change(getByLabelText(/membership handle/i), { target: { value: 'realbobbybob' } })
    fireEvent.click(getByLabelText(/I agree to our terms/i))

    expect(((await findByText(/^Create a membership$/i)) as HTMLButtonElement).disabled).toBe(false)
  })

  it('Disables button when invalid avatar URL', async () => {
    const { findByText, getByText, getByLabelText } = renderModal()

    const button = getByText(/^Create a membership$/i) as HTMLButtonElement
    expect(button.disabled).toBe(true)

    selectAccount('Root account', 'bob', getByText)
    selectAccount('Controller account', 'alice', getByText)
    fireEvent.change(getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
    fireEvent.change(getByLabelText(/membership handle/i), { target: { value: 'realbobbybob' } })
    fireEvent.click(getByLabelText(/I agree to our terms/i))

    fireEvent.change(getByLabelText(/member avatar/i), { target: { value: 'avatar' } })
    expect(((await findByText(/^Create a membership$/i)) as HTMLButtonElement).disabled).toBe(true)

    fireEvent.change(getByLabelText(/member avatar/i), { target: { value: 'http://example.com/example.jpg' } })
    expect(((await findByText(/^Create a membership$/i)) as HTMLButtonElement).disabled).toBe(false)
  })

  describe('Authorize step', () => {
    const renderAuthorizeStep = async () => {
      const rendered = renderModal()
      const { findByText, getByText, getByLabelText } = rendered

      selectAccount('Root account', 'bob', getByText)
      selectAccount('Controller account', 'alice', getByText)
      fireEvent.change(getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
      fireEvent.change(getByLabelText(/membership handle/i), { target: { value: 'realbobbybob' } })
      fireEvent.change(getByLabelText(/about member/i), { target: { value: "I'm Bob" } })
      fireEvent.change(getByLabelText(/member avatar/i), { target: { value: 'http://example.com/example.jpg' } })
      fireEvent.click(getByLabelText(/I agree to our terms/i))

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
      const events = [
        {
          phase: { ApplyExtrinsic: 2 },
          event: { index: '0x0502', data: [1] },
        },
        {
          phase: { ApplyExtrinsic: 2 },
          event: { index: '0x0000', data: [{ weight: 190949000, class: 'Normal', paysFee: 'Yes' }] },
        },
      ]

      beforeEach(() => {
        set(transaction, 'signAndSend', () => stubTransactionResult(events))
      })

      it('Renders transaction success', async () => {
        const { getByText, findByText } = await renderAuthorizeStep()
        fireEvent.click(getByText(/^sign and create a member$/i))

        expect(await findByText('Success')).toBeDefined()
        expect(getByText(/^realbobbybob/i)).toBeDefined()
      })
    })

    describe('Failure', () => {
      const events = [
        {
          phase: { ApplyExtrinsic: 2 },
          event: {
            index: '0x0001',
            data: [{ Module: { index: 5, error: 3 } }, { weight: 190949000, class: 'Normal', paysFee: 'Yes' }],
            section: 'system',
            method: 'ExtrinsicFailed',
          },
        },
      ]

      beforeEach(() => {
        set(transaction, 'signAndSend', () => stubTransactionResult(events))
      })

      it('Renders transaction failure', async () => {
        const { getByText, findByText } = await renderAuthorizeStep()
        fireEvent.click(getByText(/^sign and create a member$/i))

        expect(await findByText('Failure')).toBeDefined()
      })
    })
  })

  function renderModal() {
    return render(
      <MockQueryNodeProviders>
        <KeyringContext.Provider value={keyring}>
          <ApiContext.Provider value={api}>
            <AddMembershipModal onClose={sinon.spy()} />
          </ApiContext.Provider>
        </KeyringContext.Provider>
      </MockQueryNodeProviders>
    )
  }
})
