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
import { Account } from '../../src/hooks/types'
import * as useAccountsModule from '../../src/hooks/useAccounts'
import { TransferModal } from '../../src/modals/TransferModal/TransferModal'
import { ApiContext } from '../../src/providers/api/context'
import { UseApi } from '../../src/providers/api/provider'
import { KeyringContext } from '../../src/providers/keyring/context'

import { aliceSigner, bobSigner } from '../mocks/keyring'

describe.skip('UI: TransferModal', () => {
  const keyring = new Keyring()

  before(async () => {
    await cryptoWaitReady()
    keyring.loadAll({ isDevelopment: true })
  })

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

  beforeEach(() => {
    fromAccount = {
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

    expect(getByText('Send tokens')).to.exist
  })

  it('Renders an Authorize transaction step', () => {
    const { getByLabelText, getByText } = renderModal()

    const input = getByLabelText('Number of tokens')
    expect((getByText('Transfer tokens') as HTMLButtonElement).disabled).to.be.true

    fireEvent.change(input, { target: { value: '50' } })

    const button = getByText('Transfer tokens') as HTMLButtonElement
    expect(button.disabled).to.be.false

    fireEvent.click(button)

    expect(getByText('Authorize transaction')).to.exist
  })

  context('Signed transaction', () => {
    let transfer: any

    beforeEach(() => {
      transfer = {}
      set(transfer, 'paymentInfo', () => of(set({}, 'partialFee.toBn', () => new BN(0))))
      set(api, 'api.tx.balances.transfer', () => transfer)
    })

    function renderAndSign() {
      const rendered = renderModal()
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

    it('Renders transaction success', async () => {
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

      const { getByText } = renderAndSign()

      expect(getByText('Success')).to.exist
    })
  })

  function renderModal() {
    return render(
      <KeyringContext.Provider value={keyring}>
        <ApiContext.Provider value={api}>
          <TransferModal onClose={sinon.spy()} from={fromAccount} to={to} />
        </ApiContext.Provider>
      </KeyringContext.Provider>
    )
  }
})
