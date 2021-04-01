import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import { set } from 'lodash'
import React from 'react'
import { of } from 'rxjs'
import { Account } from '../../src/common/types'
import { InviteMemberModal } from '../../src/modals/InviteMemberModal'
import { ApiContext } from '../../src/providers/api/context'
import { selectMember } from '../helpers/selectMember'
import { alice, aliceStash } from '../mocks/keyring'
import { MockKeyringProvider, MockQueryNodeProviders } from '../mocks/providers'
import { setupMockServer } from '../mocks/server'
import {
  stubApi,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../mocks/transactions'

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

  const server = setupMockServer()

  const api = stubApi()
  let inviteMemberTx: any

  beforeEach(async () => {
    stubDefaultBalances(api)
    set(api, 'api.query.membershipWorkingGroup.budget', () => of({ toBn: () => new BN(1000) }))
    set(api, 'api.query.members.membershipPrice', () => of({ toBn: () => new BN(100) }))
    set(api, 'api.query.members.memberIdByHandleHash.size', () => of(new BN(0)))
    inviteMemberTx = stubTransaction(api, 'api.tx.members.inviteMember')
  })

  it('Renders a modal', async () => {
    renderModal()

    expect(await screen.findByText('Invite a member')).toBeDefined()
  })

  const rootAddress = '5HpG9w8EBLe5XCrbczpwq5TSXvedjrBGCwqxK1iQ7qUsSWFc'
  const controllerAddress = '5CrJ2ZegUykhPP9h2YkwDQUBi7AcmafFiu8m5DFU2Qh8XuPR'

  it('Enables button', async () => {
    server.createMember('Alice')
    server.createMember('Bob')

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
    server.createMember('Alice')
    server.createMember('Bob')

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
      server.createMember('Alice')
      server.createMember('Bob')
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
        <MockKeyringProvider>
          <ApiContext.Provider value={api}>
            <InviteMemberModal onClose={() => undefined} />
          </ApiContext.Provider>
        </MockKeyringProvider>
      </MockQueryNodeProviders>
    )
  }
})
