import { ApiRx } from '@polkadot/api'
import { Keyring } from '@polkadot/ui-keyring/Keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import { set } from 'lodash'
import React from 'react'
import { from, of } from 'rxjs'
import { Account, BaseMember } from '../../src/common/types'
import { UpdateMembershipModal } from '../../src/modals/UpdateMembershipModal'
import {
  changedOrNull,
  getChangedFields,
  hasAnyEdits,
} from '../../src/modals/UpdateMembershipModal/UpdateMembershipFormModal'
import { ApiContext } from '../../src/providers/api/context'
import { UseApi } from '../../src/providers/api/provider'
import { KeyringContext } from '../../src/providers/keyring/context'
import { MockQueryNodeProviders } from '../helpers/providers'
import { selectAccount } from '../helpers/selectAccount'
import { stubBatchTransactionFailure, stubBatchTransactionSuccess, stubTransaction } from '../helpers/transactions'
import { alice, aliceStash, bob, bobStash, mockKeyring } from '../mocks/keyring'
import { getMember, MockMember } from '../mocks/members'
import { setupMockServer } from '../mocks/server'

const allAccounts: Account[] = []

jest.mock('../../src/hooks/useAccounts', () => {
  return {
    useAccounts: () => ({
      hasAccounts: true,
      allAccounts: allAccounts,
    }),
  }
})

describe('UI: UpdatedMembershipModal', () => {
  beforeAll(async () => {
    await cryptoWaitReady()
    jest.spyOn(console, 'log').mockImplementation()
    allAccounts.push(alice, aliceStash, bob, bobStash)
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  setupMockServer()

  const api: UseApi = {
    api: ({} as unknown) as ApiRx,
    isConnected: true,
  }

  let batchTx: any
  let keyring: Keyring

  let member: MockMember

  beforeEach(async () => {
    keyring = mockKeyring()
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
    stubTransaction(api, 'api.tx.members.updateProfile')
    stubTransaction(api, 'api.tx.members.updateAccounts')
    batchTx = stubTransaction(api, 'api.tx.utility.batch')
    member = await getMember('Alice')
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
  })

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
      stubBatchTransactionSuccess(batchTx)
      await changeNameAndSave()

      fireEvent.click(screen.getByText(/^sign and update a member$/i))

      expect(await screen.findByText('Success')).toBeDefined()
    })

    it('Failure step', async () => {
      stubBatchTransactionFailure(batchTx)
      await changeNameAndSave()

      fireEvent.click(screen.getByText(/^sign and update a member$/i))

      expect(await screen.findByText('Failure')).toBeDefined()
    })
  })

  describe('helpers', () => {
    const member = {
      id: '0',
      name: 'Alice Member',
      handle: 'alice_handle',
      about: '',
      avatarURI: '',
      rootAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
      controllerAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
      isFoundingMember: true,
      isVerified: true,
      inviteCount: 5,
    }
    const form = {
      id: '0',
      name: 'Alice Member',
      handle: 'alice_handle',
      about: '',
      avatarURI: '',
      rootAccount: {
        address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        name: '',
      },
      controllerAccount: {
        address: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
        name: '',
      },
    }
    const changedAccount = {
      ...form,
      ...{
        rootAccount: { name: '', address: 'foo-bar' },
      },
    }
    const changedName = {
      ...form,
      ...{
        name: 'Foo Bar',
      },
    }
    const changedMultiple = {
      ...form,
      ...{
        controllerAccount: { name: '', account: 'foo-bar' },
        handle: 'bax',
        name: 'Foo Bar',
      },
    }

    describe('getChangedFields', () => {
      it('nothing changed', () => {
        expect(getChangedFields(form, member)).toEqual([])
      })

      it('account changed', () => {
        expect(getChangedFields(changedAccount, member)).toEqual(['rootAccount'])
      })

      it('name changed', () => {
        expect(getChangedFields(changedName, member)).toEqual(['name'])
      })

      it('multiple fields changed', () => {
        expect(getChangedFields(changedMultiple, member)).toEqual(['name', 'handle', 'controllerAccount'])
      })
    })

    describe('hasAnyEdits', () => {
      it('nothing changed', () => {
        expect(hasAnyEdits(form, member)).toBeFalsy()
      })

      it('account changed', () => {
        expect(hasAnyEdits(changedAccount, member)).toBeTruthy()
      })

      it('name changed', () => {
        expect(hasAnyEdits(changedName, member)).toBeTruthy()
      })

      it('multiple fields changed', () => {
        expect(hasAnyEdits(changedMultiple, member)).toBeTruthy()
      })
    })

    describe('changedOrNull', () => {
      it('name changed', () => {
        expect(changedOrNull(changedName, member)).toEqual({
          name: 'Foo Bar',
          id: null,
          handle: null,
          about: null,
          avatarURI: null,
          rootAccount: null,
          controllerAccount: null,
        })
      })

      it('account changed', () => {
        expect(changedOrNull(changedAccount, member)).toEqual({
          id: null,
          handle: null,
          name: null,
          about: null,
          avatarURI: null,
          rootAccount: { name: '', address: 'foo-bar' },
          controllerAccount: null,
        })
      })

      it('multiple changed', () => {
        expect(changedOrNull(changedMultiple, member)).toEqual({
          id: null,
          handle: 'bax',
          name: 'Foo Bar',
          about: null,
          avatarURI: null,
          rootAccount: null,
          controllerAccount: { name: '', account: 'foo-bar' },
        })
      })
    })
  })

  function renderModal(member: MockMember) {
    render(
      <MockQueryNodeProviders>
        <KeyringContext.Provider value={keyring}>
          <ApiContext.Provider value={api}>
            <UpdateMembershipModal onClose={() => undefined} member={member as BaseMember} />
          </ApiContext.Provider>
        </KeyringContext.Provider>
      </MockQueryNodeProviders>
    )
  }
})
