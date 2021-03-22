import { ApiRx } from '@polkadot/api'
import { Keyring } from '@polkadot/ui-keyring/Keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import { set } from 'lodash'
import React from 'react'
import { from, of } from 'rxjs'
import sinon from 'sinon'
import { Account, BaseMember } from '../../src/common/types'
import * as useAccountsModule from '../../src/hooks/useAccounts'
import { UpdateMembershipModal } from '../../src/modals/UpdateMembershipModal'
import { hasAnyEdits } from '../../src/modals/UpdateMembershipModal/UpdateMembershipFormModal';
import { ApiContext } from '../../src/providers/api/context'
import { UseApi } from '../../src/providers/api/provider'
import { KeyringContext } from '../../src/providers/keyring/context'
import { MockQueryNodeProviders } from '../helpers/providers'
import { selectAccount } from '../helpers/selectAccount';
import { stubTransaction, stubTransactionFailure, stubTransactionSuccess } from '../helpers/transactions'
import { aliceSigner, bobSigner, mockKeyring } from '../mocks/keyring'
import { getMember, MockMember } from '../mocks/members'
import { setupMockServer } from '../mocks/server'

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
  let updateProfileTx: any
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
    updateProfileTx = stubTransaction(api, 'api.tx.members.updateProfile')

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
    renderModal(member)

    expect(await screen.findByText('Edit membership')).toBeDefined()
  })

  it('Enables button on member field change', async () => {
    renderModal(member)

    expect(await screen.findByRole('button', { name: /^Save changes$/i })).toBeDisabled()

    fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })

    expect(await screen.findByRole('button', { name: /^Save changes$/i })).toBeEnabled()
  })

  it('Enables save button on account change', async () => {
    renderModal(member)

    await selectAccount('root account', 'bob')

    expect(await screen.findByRole('button', { name: /^Save changes$/i })).toBeEnabled()
  });

  it('Disables button when invalid avatar URL', async () => {
    renderModal(member)

    fireEvent.change(await screen.findByLabelText(/member avatar/i), { target: { value: 'avatar' } })
    expect(await screen.findByRole('button', { name: /^Save changes$/i })).toBeDisabled()

    fireEvent.change(await screen.findByLabelText(/member avatar/i), {
      target: { value: 'http://example.com/example.jpg' },
    })
    expect(await screen.findByRole('button', { name: /^Save changes$/i })).toBeEnabled()
  })

  describe('Authorize - member field', () => {
    async function changeNameAndSave() {
      renderModal(member)
      fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
      fireEvent.click(await screen.findByText(/^Save changes$/i))
    }

    it('Authorize step', async () => {
      await changeNameAndSave()

      expect(await screen.findByText('Authorize transaction')).toBeDefined()
      expect((await screen.findByText(/^Transaction fee:/i))?.nextSibling?.textContent).toBe('25')
    })

    it('Success step', async () => {
      stubTransactionSuccess(updateProfileTx, [1])
      await changeNameAndSave()

      fireEvent.click(screen.getByText(/^sign and update a member$/i))

      expect(await screen.findByText('Success')).toBeDefined()
    })

    it('Failure step', async () => {
      stubTransactionFailure(updateProfileTx)
      await changeNameAndSave()

      fireEvent.click(screen.getByText(/^sign and update a member$/i))

      expect(await screen.findByText('Failure')).toBeDefined()
    })
  })

  describe('checkEdits', () => {
    it('nothing changed for accounts', () => {
      const result = hasAnyEdits({
        "id": "0",
        "name": "Alice Member",
        "handle": "alice_handle",
        "about": "",
        "avatarURI": "",
        "rootAccount": {
          "address": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
          "name": ""
        },
        "controllerAccount": {
          "address": "5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY",
          "name": ""
        }
      }, {
        "id": "0",
        "name": "Alice Member",
        "handle": "alice_handle",
        "about": "",
        "avatarURI": "",
        "rootAccount": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
        "controllerAccount": "5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY",
        "isFoundingMember": true,
        "isVerified": true,
        "inviteCount": 5
      })
      expect(result).toBeFalsy()
    });
  });

  function renderModal(member: MockMember) {
    render(
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
