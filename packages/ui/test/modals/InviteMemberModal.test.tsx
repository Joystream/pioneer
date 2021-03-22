import { ApiRx } from '@polkadot/api'
import { Keyring } from '@polkadot/ui-keyring/Keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import { set } from 'lodash'
import React from 'react'
import { from, of } from 'rxjs'
import sinon from 'sinon'
import { MemberFieldsFragment } from '../../src/api/queries'
import { Account } from '../../src/common/types'
import * as useAccountsModule from '../../src/hooks/useAccounts'
import { InviteMemberModal } from '../../src/modals/InviteMemberModal'
import { ApiContext } from '../../src/providers/api/context'
import { UseApi } from '../../src/providers/api/provider'
import { KeyringContext } from '../../src/providers/keyring/context'
import { MockQueryNodeProviders } from '../helpers/providers'
import { selectMember } from '../helpers/selectMember'
import { stubTransaction, stubTransactionFailure, stubTransactionSuccess } from '../helpers/transactions'
import { aliceSigner, bobSigner, mockKeyring } from '../mocks/keyring'
import { getMember } from '../mocks/members'
import { setupMockServer } from '../mocks/server'

const members: MemberFieldsFragment[] = []

jest.mock('../../src/hooks/useMyMemberships', () => {
  return {
    useMyMemberships: () => ({
      isLoading: false,
      members: members,
    }),
  }
})

describe('UI: InviteMemberModal', () => {
  beforeAll(async () => {
    await cryptoWaitReady()
    jest.spyOn(console, 'log').mockImplementation()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  afterEach(() => {
    members.splice(0)
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
    renderModal()

    expect(await screen.findByText('Invite a member')).toBeDefined()
  })

  it('Enables button', async () => {
    const aliceMember = await getMember('Alice')
    const bobMember = await getMember('Bob')
    members.push((aliceMember as unknown) as MemberFieldsFragment)
    members.push((bobMember as unknown) as MemberFieldsFragment)

    renderModal()

    expect(await screen.findByRole('button', { name: /^Invite a member$/i })).toBeDisabled()

    await selectMember('Inviting member', 'bob')
    await fireEvent.change(screen.getByRole('textbox', { name: /Root account/i }), {
      target: { value: '5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc' },
    })
    await fireEvent.change(screen.getByRole('textbox', { name: /Controller account/i }), {
      target: { value: '5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc' },
    })
    await fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
    await fireEvent.change(screen.getByLabelText(/membership handle/i), { target: { value: 'bobby1' } })

    expect(await screen.findByRole('button', { name: /^Invite a member$/i })).toBeEnabled()
  })

  it.skip('Disables button when invalid avatar URL', async () => {
    renderModal()

    fireEvent.change(await screen.findByLabelText(/member avatar/i), { target: { value: 'avatar' } })
    expect(await screen.findByRole('button', { name: /^Invite a member$/i })).toBeDisabled()

    fireEvent.change(await screen.findByLabelText(/member avatar/i), {
      target: { value: 'http://example.com/example.jpg' },
    })
    expect(await screen.findByRole('button', { name: /^Invite a member$/i })).toBeEnabled()
  })

  describe.skip('Authorize', () => {
    async function changeNameAndSave() {
      renderModal()
      fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
      fireEvent.click(await screen.findByText(/^Invite a member$/i))
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

  function renderModal() {
    render(
      <MockQueryNodeProviders>
        <KeyringContext.Provider value={keyring}>
          <ApiContext.Provider value={api}>
            <InviteMemberModal onClose={sinon.spy()} />
          </ApiContext.Provider>
        </KeyringContext.Provider>
      </MockQueryNodeProviders>
    )
  }
})
