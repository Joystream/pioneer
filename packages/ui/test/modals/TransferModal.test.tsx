import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { expect } from 'chai'
import sinon from 'sinon'
import BN from 'bn.js'
import { ApiPromise } from '@polkadot/api'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { set } from 'lodash'
import { TransferModal } from '../../src/modals/TransferModal/TransferModal'
import { Account } from '../../src/hooks/types'
import { aliceSigner, bobSigner } from '../mocks/keyring'
import { ApiContext } from '../../src/providers/api/context'
import { UseApi } from '../../src/providers/api/provider'

describe('UI: TransferModal', () => {
  before(cryptoWaitReady)

  const api: UseApi = {
    api: ({} as unknown) as ApiPromise,
    state: 'CONNECTED',
    isConnected: true,
  }
  let from: Account
  let to: Account

  beforeEach(() => {
    from = {
      address: aliceSigner().address,
      name: 'alice',
    }
    to = {
      address: bobSigner().address,
      name: 'bob',
    }
    set(api, 'api.query.system.account.multi', (accounts: any, callback: any) => {
      callback(accounts.map(() => set({}, 'data.free.toBn', () => new BN(10_000))))
      return Promise.resolve()
    })
  })

  it('Renders a modal', () => {
    const { getByText } = render(
      <ApiContext.Provider value={api}>
        <TransferModal onClose={sinon.spy()} from={from} to={to} />
      </ApiContext.Provider>
    )

    expect(getByText('Send tokens')).to.exist
  })

  it('Renders an Authorize transaction step', () => {
    const { getByLabelText, getByText } = render(
      <ApiContext.Provider value={api}>
        <TransferModal onClose={sinon.spy()} from={from} to={to} />
      </ApiContext.Provider>
    )

    const input = getByLabelText('Number of tokens')
    expect((getByText('Transfer tokens') as HTMLButtonElement).disabled).to.be.true

    fireEvent.change(input, { target: { value: '50' } })

    const button = getByText('Transfer tokens') as HTMLButtonElement
    expect(button.disabled).to.be.false

    fireEvent.click(button)

    expect(getByText('Authorize transaction')).to.exist
  })
})
