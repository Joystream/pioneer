import { ApiRx } from '@polkadot/api'
import { Keyring } from '@polkadot/ui-keyring/Keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import { set } from 'lodash'
import React from 'react'
import { from, of } from 'rxjs'
import { MemberFieldsFragment } from '../../src/api/queries'
import { Account } from '../../src/common/types'
import { InviteMemberModal } from '../../src/modals/InviteMemberModal'
import { ApiContext } from '../../src/providers/api/context'
import { UseApi } from '../../src/providers/api/provider'
import { KeyringContext } from '../../src/providers/keyring/context'
import { MockQueryNodeProviders } from '../helpers/providers'
import { selectMember } from '../helpers/selectMember'
import { stubTransaction, stubTransactionFailure, stubTransactionSuccess } from '../mocks/transactions'
import { alice, aliceStash, mockKeyring } from '../mocks/keyring'
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

const useAccounts: { hasAccounts: boolean; allAccounts: Account[] } = {
  hasAccounts: false,
  allAccounts: [],
}

jest.mock('../../src/hooks/useAccounts', () => {
  return {
    useAccounts: () => useAccounts,
  }
})

describe('UI: InviteMemberModal', () => {
  beforeAll(async () => {
    await cryptoWaitReady()
    jest.spyOn(console, 'log').mockImplementation()
    useAccounts.allAccounts.push(alice, aliceStash)
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
  let inviteMemberTx: any
  let keyring: Keyring
  let transaction: any

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
    transaction = {}
    set(transaction, 'paymentInfo', () => of(set({}, 'partialFee.toBn', () => new BN(25))))
    set(api, 'api.tx.members.inviteMember', () => transaction)
    inviteMemberTx = stubTransaction(api, 'api.tx.members.inviteMember')
  })

  it('Renders a modal', async () => {
    renderModal()

    expect(await screen.findByText('Invite a member')).toBeDefined()
  })

  const rootAddress = '5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc'
  const controllerAddress = '5CrJ2ZegUykhPP9h2YkwDQUBi7AcmafFiu8m5DFU2Qh8XuPR'

  it('Enables button', async () => {
    const aliceMember = await getMember('Alice')
    const bobMember = await getMember('Bob')
    members.push((aliceMember as unknown) as MemberFieldsFragment)
    members.push((bobMember as unknown) as MemberFieldsFragment)

    renderModal()

    expect(await screen.findByRole('button', { name: /^Invite a member$/i })).toBeDisabled()

    await selectMember('Inviting member', 'alice')
    await fireEvent.change(screen.getByRole('textbox', { name: /Root account/i }), {
      target: { value: rootAddress },
    })
    await fireEvent.change(screen.getByRole('textbox', { name: /Controller account/i }), {
      target: { value: controllerAddress },
    })
    await fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
    await fireEvent.change(screen.getByLabelText(/membership handle/i), { target: { value: 'bobby1' } })

    expect(await screen.findByRole('button', { name: /^Invite a member$/i })).toBeEnabled()
  })

  it('Disables button when one of addresses is invalid', async () => {
    const aliceMember = await getMember('Alice')
    const bobMember = await getMember('Bob')
    members.push((aliceMember as unknown) as MemberFieldsFragment)
    members.push((bobMember as unknown) as MemberFieldsFragment)

    renderModal()

    await selectMember('Inviting member', 'alice')
    await fireEvent.change(screen.getByRole('textbox', { name: /Root account/i }), {
      target: { value: rootAddress },
    })
    await fireEvent.change(screen.getByRole('textbox', { name: /Controller account/i }), {
      target: { value: 'AAa' },
    })
    await fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
    await fireEvent.change(screen.getByLabelText(/membership handle/i), { target: { value: 'bobby1' } })

    expect(await screen.findByRole('button', { name: /^Invite a member$/i })).toBeDisabled()
  })

  describe('Authorize', () => {
    async function fillFormAndProceed() {
      const aliceMember = await getMember('Alice')
      const bobMember = await getMember('Bob')
      members.push((aliceMember as unknown) as MemberFieldsFragment)
      members.push((bobMember as unknown) as MemberFieldsFragment)
      renderModal()
      await selectMember('Inviting member', 'alice')
      await fireEvent.change(screen.getByRole('textbox', { name: /Root account/i }), {
        target: { value: rootAddress },
      })
      await fireEvent.change(screen.getByRole('textbox', { name: /Controller account/i }), {
        target: { value: controllerAddress },
      })
      await fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
      await fireEvent.change(screen.getByLabelText(/membership handle/i), { target: { value: 'bobby1' } })
      fireEvent.click(await screen.findByRole('button', { name: /^Invite a member$/i }))
    }

    it('Authorize step', async () => {
      await fillFormAndProceed()

      expect(await screen.findByText('Authorize transaction')).toBeDefined()
      expect(await screen.findByText('You are inviting this member. You have 5 invites left.')).toBeDefined()
      expect((await screen.findByText(/^Transaction fee:/i))?.nextSibling?.textContent).toBe('25')
    })

    it('Success step', async () => {
      stubTransactionSuccess(inviteMemberTx, [1])
      await fillFormAndProceed()

      fireEvent.click(screen.getByText(/^sign and create a member$/i))

      expect(await screen.findByText('Success')).toBeDefined()
    })

    it('Failure step', async () => {
      stubTransactionFailure(inviteMemberTx)
      await fillFormAndProceed()

      fireEvent.click(screen.getByText(/^sign and create a member$/i))

      expect(await screen.findByText('Failure')).toBeDefined()
    })
  })

  function renderModal() {
    render(
      <MockQueryNodeProviders>
        <KeyringContext.Provider value={keyring}>
          <ApiContext.Provider value={api}>
            <InviteMemberModal onClose={() => undefined} />
          </ApiContext.Provider>
        </KeyringContext.Provider>
      </MockQueryNodeProviders>
    )
  }
})
