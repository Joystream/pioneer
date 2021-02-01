import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { expect } from 'chai'
import sinon from 'sinon'
import BN from 'bn.js'
import { ApiRx } from '@polkadot/api'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { set } from 'lodash'
import { TransferModal } from '../../src/modals/TransferModal/TransferModal'
import { Account } from '../../src/hooks/types'
import { aliceSigner, bobSigner } from '../mocks/keyring'
import { ApiContext } from '../../src/providers/api/context'
import { UseApi } from '../../src/providers/api/provider'
import * as useAccountsModule from '../../src/hooks/useAccounts'
import { from } from 'rxjs'

describe('UI: TransferModal', () => {
  before(cryptoWaitReady)

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

  it('Renders a modal', async () => {
    const { getByText } = renderModal()

    expect(await getByText('Send tokens')).to.exist
  })

  it.skip('Renders an Authorize transaction step', async () => {
    const { getByLabelText, getByText } = renderModal()

    const input = await getByLabelText('Number of tokens')
    expect(((await getByText('Transfer tokens')) as HTMLButtonElement).disabled).to.be.true

    fireEvent.change(input, { target: { value: '50' } })

    const button = (await getByText('Transfer tokens')) as HTMLButtonElement
    expect(button.disabled).to.be.false

    fireEvent.click(button)

    expect(await getByText('Authorize transaction')).to.exist
  })

  function renderModal() {
    return render(
      <ApiContext.Provider value={api}>
        <TransferModal onClose={sinon.spy()} from={fromAccount} to={to} />
      </ApiContext.Provider>
    )
  }
})
