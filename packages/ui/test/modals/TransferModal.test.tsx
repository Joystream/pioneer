import React from 'react'
import { render } from '@testing-library/react'
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

  const from: Account = {
    address: aliceSigner().address,
    name: 'alice',
  }
  const to: Account = {
    address: bobSigner().address,
    name: 'bob',
  }
  const api: UseApi = {
    api: ({} as unknown) as ApiPromise,
    state: 'CONNECTED',
    isConnected: true,
  }

  beforeEach(() => {
    set(api, 'api.query.system.account.multi', (accounts: any, callback: any) => {
      callback(accounts.map(() => set({}, 'data.free.toBn', () => new BN(100))))
      return Promise.resolve()
    })
  })

  it('Renders a modal', async () => {
    const { getByText } = render(
      <ApiContext.Provider value={api}>
        <TransferModal onClose={sinon.spy()} from={from} to={to} />
      </ApiContext.Provider>
    )

    expect(await getByText('Send tokens')).to.exist
  })
})
