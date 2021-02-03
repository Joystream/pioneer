import { Keyring } from '@polkadot/ui-keyring/Keyring'
import React from 'react'
import { from, of } from 'rxjs'
import { ApiRx } from '@polkadot/api'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { set } from 'lodash'
import { fireEvent, render } from '@testing-library/react'
import { expect } from 'chai'
import sinon from 'sinon'
import BN from 'bn.js'
import { KeyringContext } from '../../src/providers/keyring/context'

import { aliceSigner, bobSigner } from '../mocks/keyring'
import { Account } from '../../src/hooks/types'
import { ApiContext } from '../../src/providers/api/context'
import { UseApi } from '../../src/providers/api/provider'
import { TransferModal } from '../../src/modals/TransferModal/TransferModal'
import * as useAccountsModule from '../../src/hooks/useAccounts'

describe('UI: TransferModal', () => {
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
          freeBalance: new BN(1000),
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

  it('Renders wait for transaction step', async () => {
    set(api, 'api.tx.balances.transfer', () => ({
      paymentInfo: () => {
        return of({
          partialFee: {
            toBn: () => new BN(0),
          },
        })
      },
      signAndSend: () => {
        return of({
          status: {
            isReady: true,
          },
        })
      },
    }))

    const { getByLabelText, getByText, findByText } = renderModal()

    fireEvent.change(getByLabelText('Number of tokens'), { target: { value: '50' } })
    fireEvent.click(getByText('Transfer tokens') as HTMLButtonElement)
    const byText = getByText(/^sign transaction and transfer$/i)
    expect(byText).to.exist
    fireEvent.click(byText)

    expect(await findByText('Wait for the transaction')).to.exist
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
