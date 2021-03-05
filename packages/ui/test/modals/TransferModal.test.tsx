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
import { ArrowInsideIcon } from '../../src/components/icons'
import * as useAccountsModule from '../../src/hooks/useAccounts'
import { TransferModal } from '../../src/modals/TransferModal/TransferModal'
import { ApiContext } from '../../src/providers/api/context'
import { UseApi } from '../../src/providers/api/provider'
import { KeyringContext } from '../../src/providers/keyring/context'
import { MockQueryNodeProviders } from '../helpers/providers'
import { selectAccount } from '../helpers/selectAccount'

import { aliceSigner, bobSigner, mockKeyring } from '../mocks/keyring'
import { setupMockServer } from '../mocks/server'
import { stubTransactionResult } from '../mocks/stubTransactionResult'

describe('UI: TransferModal', () => {
  beforeAll(cryptoWaitReady)
  setupMockServer()

  const api: UseApi = {
    api: ({} as unknown) as ApiRx,
    isConnected: true,
  }
  let sender: Account
  let to: Account
  let accounts: {
    hasAccounts: boolean
    allAccounts: Account[]
  }
  let transfer: any
  let keyring: Keyring

  beforeEach(async () => {
    keyring = mockKeyring()
    sender = {
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
    transfer = {}
    set(transfer, 'paymentInfo', () => of(set({}, 'partialFee.toBn', () => new BN(25))))
    set(api, 'api.tx.balances.transfer', () => transfer)

    accounts = {
      hasAccounts: true,
      allAccounts: [sender, to],
    }
    sinon.stub(useAccountsModule, 'useAccounts').returns(accounts)
  })

  afterEach(() => {
    sinon.restore()
  })

  it('Renders a modal', () => {
    const { getByText } = renderModal({ sender, to })

    expect(getByText('Send tokens')).toBeDefined()
  })

  it('Enables value input', () => {
    const { getByLabelText, getByText, getByRole } = renderModal({})

    const input = getByLabelText(/number of tokens/i) as HTMLInputElement
    const useHalfButton = getByRole('button', { name: /use half/i }) as HTMLButtonElement
    const useMaxButton = getByRole('button', { name: /use max/i }) as HTMLButtonElement

    expect(input.disabled).toBe(true)
    expect(useHalfButton.disabled).toBe(true)
    expect(useMaxButton.disabled).toBe(true)

    selectAccount('From', 'alice', getByText)

    expect(input.disabled).toBe(false)
    expect(useHalfButton.disabled).toBe(false)
    expect(useMaxButton.disabled).toBe(false)
  })

  it('Renders an Authorize transaction step', () => {
    const { getByLabelText, getByText } = renderModal({ sender, to })

    const input = getByLabelText('Number of tokens')
    expect((getByText('Transfer tokens') as HTMLButtonElement).disabled).toBe(true)

    fireEvent.change(input, { target: { value: '50' } })

    const button = getByText('Transfer tokens') as HTMLButtonElement
    expect(button.disabled).toBe(false)

    fireEvent.click(button)

    expect(getByText('Authorize Transaction')).toBeDefined()
    expect(getByText(/Transaction fee:/i)?.parentNode?.textContent).toMatch(/^Transaction fee:25/)
  })

  describe('Signed transaction', () => {
    function renderAndSign() {
      const rendered = renderModal({ sender, to })
      const { getByLabelText, getByText } = rendered

      fireEvent.change(getByLabelText('Number of tokens'), { target: { value: '50' } })
      fireEvent.click(getByText('Transfer tokens') as HTMLButtonElement)
      fireEvent.click(getByText(/^sign transaction and transfer$/i))

      return rendered
    }

    it('Renders wait for transaction step', async () => {
      set(transfer, 'signAndSend', () => of(set({}, 'status.isReady', true)))

      const { getByText } = renderAndSign()

      expect(getByText('Pending transaction')).toBeDefined()
    })

    describe('Success', () => {
      beforeEach(() => {
        const events = [
          {
            phase: { ApplyExtrinsic: 2 },
            event: { index: '0x0502', data: [sender.address, to.address, 50] },
          },
          {
            phase: { ApplyExtrinsic: 2 },
            event: { index: '0x0000', data: [{ weight: 190949000, class: 'Normal', paysFee: 'Yes' }] },
          },
        ]

        set(transfer, 'signAndSend', () => stubTransactionResult(events))
      })

      it('Renders transaction success', async () => {
        const { findByText } = renderAndSign()

        expect(await findByText('Success')).toBeDefined()
      })

      it('Calculates balances before & after', async () => {
        const { getAllByText } = renderAndSign()

        const [alice, bob] = getAllByText('Transferable balance before:')

        expect(alice?.parentNode?.textContent).toMatch(/Transferable balance before:1,075/)
        expect(bob?.parentNode?.textContent).toMatch(/Transferable balance before:950/)
        expect(alice?.parentNode?.textContent).toMatch(/Transferable balance after:1,000/)
        expect(bob?.parentNode?.textContent).toMatch(/Transferable balance after:1,000/)
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
        set(transfer, 'signAndSend', () => stubTransactionResult(events))
      })

      it('Renders transaction failure', async () => {
        const { findByText } = renderAndSign()

        expect(await findByText('Failure')).toBeDefined()
      })
    })
  })

  function renderModal({ sender, to }: { sender?: Account; to?: Account }) {
    return render(
      <KeyringContext.Provider value={keyring}>
        <ApiContext.Provider value={api}>
          <MockQueryNodeProviders>
            <TransferModal onClose={sinon.spy()} from={sender} to={to} icon={<ArrowInsideIcon />} />
          </MockQueryNodeProviders>
        </ApiContext.Provider>
      </KeyringContext.Provider>
    )
  }
})
