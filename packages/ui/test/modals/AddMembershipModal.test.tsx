import { ApiRx } from '@polkadot/api'
import { Keyring } from '@polkadot/ui-keyring/Keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render } from '@testing-library/react'
import { Matcher } from '@testing-library/dom/types/matches'
import BN from 'bn.js'
import { expect } from 'chai'
import { set } from 'lodash'
import React from 'react'
import { from, of } from 'rxjs'
import sinon from 'sinon'
import { Account } from '../../src/hooks/types'
import * as useAccountsModule from '../../src/hooks/useAccounts'
import { AddMembershipModal } from '../../src/modals/AddMembershipModal'
import { ApiContext } from '../../src/providers/api/context'
import { UseApi } from '../../src/providers/api/provider'
import { KeyringContext } from '../../src/providers/keyring/context'

import { aliceSigner, bobSigner, mockKeyring } from '../mocks/keyring'

describe('UI: AddMembershipModal', () => {
  before(async () => {
    await cryptoWaitReady()
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
  let query: any
  let keyring: Keyring

  beforeEach(() => {
    keyring = mockKeyring()
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
    query = {}

    set(query, 'members.membershipPrice', () => of(set({}, 'toBn', () => new BN(100))))
    set(api, 'api.query', query)

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

    expect(getByText('Add membership')).to.exist
    expect(getByText('Creation fee:')?.parentNode?.textContent).to.match(/^Creation fee:100/i)
  })

  it('Enables button when valid form', async () => {
    const { findByText, getByText, getAllByRole } = renderModal()

    const button = getByText(/^Create a membership$/i) as HTMLButtonElement
    expect(button.disabled).to.be.true
    const [, termsCheckbox] = getAllByRole('checkbox')
    const [, name, handle, about, avatar] = getAllByRole('textbox')

    selectAccount('Root account', 'bob', getByText)
    selectAccount('Controller account', 'alice', getByText)
    fireEvent.change(name, { target: { value: 'Bobby Bob' } })
    fireEvent.change(handle, { target: { value: 'bob' } })
    fireEvent.change(about, { target: { value: "I'm Bob" } })
    fireEvent.change(avatar, { target: { value: 'http://example.com/example.jpg' } })
    fireEvent.click(termsCheckbox)

    expect(((await findByText(/^Create a membership$/i)) as HTMLButtonElement).disabled).to.be.false
  })

  function selectAccount(label: string, name: string, getByText: (text: Matcher) => HTMLElement) {
    const labelElement = getByText(new RegExp(`${label}`, 'i'))
    const parentNode = labelElement.parentNode
    const button = parentNode?.querySelector('div > button')

    expect(button).to.exist
    button && fireEvent.click(button)

    const accountTitles = parentNode?.querySelectorAll('ul > li')
    const found = accountTitles && Array.from(accountTitles).find((li) => li.textContent?.match(name))

    expect(found).to.exist
    found && fireEvent.click(found)
  }

  function renderModal() {
    return render(
      <KeyringContext.Provider value={keyring}>
        <ApiContext.Provider value={api}>
          <AddMembershipModal onClose={sinon.spy()} />
        </ApiContext.Provider>
      </KeyringContext.Provider>
    )
  }
})
