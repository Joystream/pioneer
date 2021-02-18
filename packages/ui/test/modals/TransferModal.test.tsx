import { ApiRx } from '@polkadot/api'
import { Keyring } from '@polkadot/ui-keyring/Keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render } from '@testing-library/react'
import BN from 'bn.js'
import { expect } from 'chai'
import { set } from 'lodash'
import React from 'react'
import { from, of } from 'rxjs'
import sinon from 'sinon'
import { ArrowInsideIcon } from '../../src/components/icons'
import { Account } from '../../src/common/types'
import * as useAccountsModule from '../../src/hooks/useAccounts'
import { TransferModal } from '../../src/modals/TransferModal/TransferModal'
import { ApiContext } from '../../src/providers/api/context'
import { UseApi } from '../../src/providers/api/provider'
import { KeyringContext } from '../../src/providers/keyring/context'
import { selectAccount } from '../helpers/selectAccount'

import { aliceSigner, bobSigner, mockKeyring } from '../mocks/keyring'

describe('UI: TransferModal', () => {
  before(cryptoWaitReady)

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

  beforeEach(() => {
    keyring = mockKeyring()
    sender = {
      address: aliceSigner().address,
      name: 'alice',
    }
    to = {
      address: bobSigner().address,
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

    expect(getByText('Send tokens')).to.exist
  })

  it('Enables value input', () => {
    const { getByLabelText, getByText, getByRole } = renderModal({})

    const input = getByLabelText(/number of tokens/i) as HTMLInputElement
    const useHalfButton = getByRole('button', { name: /use half/i }) as HTMLButtonElement
    const useMaxButton = getByRole('button', { name: /use max/i }) as HTMLButtonElement

    expect(input.disabled).to.be.true
    expect(useHalfButton.disabled).to.be.true
    expect(useMaxButton.disabled).to.be.true

    selectAccount('From', 'alice', getByText)
    selectAccount('Destination account', 'bob', getByText)

    expect(input.disabled).to.be.false
    expect(useHalfButton.disabled).to.be.false
    expect(useMaxButton.disabled).to.be.false
  })

  it('Renders an Authorize transaction step', () => {
    const { getByLabelText, getByText } = renderModal({ sender, to })

    const input = getByLabelText('Number of tokens')
    expect((getByText('Transfer tokens') as HTMLButtonElement).disabled).to.be.true

    fireEvent.change(input, { target: { value: '50' } })

    const button = getByText('Transfer tokens') as HTMLButtonElement
    expect(button.disabled).to.be.false

    fireEvent.click(button)

    expect(getByText('Authorize transaction')).to.exist
    expect(getByText(/Transaction fee:/i)?.parentNode?.textContent).to.match(/^Transaction fee:25/)
  })

  context('Signed transaction', () => {
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

      expect(getByText('Wait for the transaction')).to.exist
    })

    context('Success', () => {
      beforeEach(() => {
        set(transfer, 'signAndSend', () =>
          from([
            set({}, 'status.isReady', true),
            {
              status: {
                isInBlock: true,
                asInBlock: {
                  toString: () => '0x93XXX',
                },
              },
            },
          ])
        )
      })

      it('Renders transaction success', async () => {
        const { getByText } = renderAndSign()

        expect(getByText('Success')).to.exist
      })

      it('Calculates balances before & after', async () => {
        const { getAllByText } = renderAndSign()

        const [alice, bob] = getAllByText('Transferable balance before:')

        expect(alice?.parentNode?.textContent).to.match(/Transferable balance before:1,075/)
        expect(bob?.parentNode?.textContent).to.match(/Transferable balance before:950/)
        expect(alice?.parentNode?.textContent).to.match(/Transferable balance after:1,000/)
        expect(bob?.parentNode?.textContent).to.match(/Transferable balance after:1,000/)
      })
    })
  })

  function renderModal({ sender, to }: { sender?: Account; to?: Account }) {
    return render(
      <KeyringContext.Provider value={keyring}>
        <ApiContext.Provider value={api}>
          <TransferModal onClose={sinon.spy()} from={sender} to={to} icon={<ArrowInsideIcon />} />
        </ApiContext.Provider>
      </KeyringContext.Provider>
    )
  }
})
