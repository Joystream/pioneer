import { ApiRx } from '@polkadot/api'
import { Keyring } from '@polkadot/ui-keyring/Keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import BN from 'bn.js'
import { set } from 'lodash'
import React from 'react'
import { from, of } from 'rxjs'
import sinon from 'sinon'
import { Account, BaseMember } from '../../src/common/types'
import * as useAccountsModule from '../../src/hooks/useAccounts'
import { UpdateMembershipModal } from '../../src/modals/UpdateMembershipModal'
import { ApiContext } from '../../src/providers/api/context'
import { UseApi } from '../../src/providers/api/provider'
import { KeyringContext } from '../../src/providers/keyring/context'
import { MockQueryNodeProviders } from '../helpers/providers'
import { selectAccount } from '../helpers/selectAccount'
import { aliceSigner, bobSigner, mockKeyring } from '../mocks/keyring'
import { getMember, MockMember } from '../mocks/members'
import { setupMockServer } from '../mocks/server'
import { stubTransactionResult } from '../mocks/stubTransactionResult'

describe('UI: UpdatedMembershipModal', () => {
  beforeAll(async () => {
    await cryptoWaitReady()
    jest.spyOn(console, 'log').mockImplementation()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

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
  let keyring: Keyring

  let member: MockMember

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
    set(api, 'api.query.members.membershipPrice', () => of(set({}, 'toBn', () => new BN(100))))
    set(api, 'api.query.members.memberIdByHandleHash.size', () => of(new BN(0)))
    transaction = {}
    set(transaction, 'paymentInfo', () => of(set({}, 'partialFee.toBn', () => new BN(25))))
    set(api, 'api.tx.members.updateProfile', () => transaction)

    member = await getMember('Alice')

    accounts = {
      hasAccounts: true,
      allAccounts: [fromAccount, to],
    }
    sinon.stub(useAccountsModule, 'useAccounts').returns(accounts)
  })

  afterEach(() => {
    sinon.restore()
  })

  it('Renders a modal', async () => {
    const { findByText } = renderModal(member)

    expect(await findByText('Edit membership')).toBeDefined()
  })

  it('Enables button on fields changes', async () => {
    const { getByLabelText, findByRole } = renderModal(member)

    const button = await findByRole('button', { name: /^Save changes$/i })
    expect(button).toBeDisabled()

    fireEvent.change(getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })

    expect(await findByRole('button', { name: /^Save changes$/i })).toBeEnabled()
  })

  it('Enables button on accounts changes', async () => {
    const { getByText, findByRole } = renderModal(member)

    const button = await findByRole('button', { name: /^Save changes$/i })
    expect(button).toBeDisabled()

    selectAccount('Root account', 'bob', getByText)

    expect(await findByRole('button', { name: /^Save changes$/i })).toBeEnabled()
  })

  it('Disables button when invalid avatar URL', async () => {
    const { findByRole, findByLabelText } = renderModal(member)

    fireEvent.change(await findByLabelText(/member avatar/i), { target: { value: 'avatar' } })
    expect(await findByRole('button', { name: /^Save changes$/i })).toBeDisabled()

    fireEvent.change(await findByLabelText(/member avatar/i), { target: { value: 'http://example.com/example.jpg' } })
    expect(await findByRole('button', { name: /^Save changes$/i })).toBeEnabled()
  })

  describe('Authorize step', () => {
    const renderAuthorizeStep = async () => {
      const rendered = renderModal(member)
      const { findByText, getByLabelText } = rendered

      fireEvent.change(getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })

      fireEvent.click(await findByText(/^Save changes$/i))

      return rendered
    }

    it('Renders authorize transaction', async () => {
      const { findByText } = await renderAuthorizeStep()

      expect(await findByText('Authorize transaction')).toBeDefined()
      expect((await findByText(/^Transaction fee:/i))?.nextSibling?.textContent).toBe('25')
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
        fireEvent.click(getByText(/^sign and update a member$/i))

        expect(await findByText('Success')).toBeDefined()
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
        fireEvent.click(getByText(/^sign and update a member$/i))

        expect(await findByText('Failure')).toBeDefined()
      })
    })
  })

  function renderModal(member: MockMember) {
    return render(
      <MockQueryNodeProviders>
        <KeyringContext.Provider value={keyring}>
          <ApiContext.Provider value={api}>
            <UpdateMembershipModal onClose={sinon.spy()} member={member as BaseMember} />
          </ApiContext.Provider>
        </KeyringContext.Provider>
      </MockQueryNodeProviders>
    )
  }
})
