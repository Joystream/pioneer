import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import { set } from 'lodash'
import React from 'react'
import { of } from 'rxjs'

import { ApiContext } from '../../../src/app/providers/api/context'
import { Account } from '../../../src/common/types'
import { InviteMemberModal } from '../../../src/membership/modals/InviteMemberModal'
import { seedMembers } from '../../../src/mocks/data'
import { selectMember } from '../../_helpers/selectMember'
import { toBalanceOf } from '../../_mocks/chainTypes'
import { alice, aliceStash, bobStash } from '../../_mocks/keyring'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  stubApi,
  stubBalances,
  stubDefaultBalances,
  stubQuery,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'

const useAccounts: { hasAccounts: boolean; allAccounts: Account[] } = {
  hasAccounts: false,
  allAccounts: [],
}

jest.mock('../../../src/accounts/hooks/useAccounts', () => {
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

  const controllerAddress = '5CrJ2ZegUykhPP9h2YkwDQUBi7AcmafFiu8m5DFU2Qh8XuPR'
  const server = setupMockServer()
  const api = stubApi()
  let inviteMemberTx: any

  beforeEach(async () => {
    stubDefaultBalances(api)
    stubQuery(api, 'membershipWorkingGroup.budget', toBalanceOf(1000))
    stubQuery(api, 'members.membershipPrice', toBalanceOf(100))
    set(api, 'api.query.members.memberIdByHandleHash.size', () => of(new BN(0)))
    inviteMemberTx = stubTransaction(api, 'api.tx.members.inviteMember')
  })

  it('Validate Working Group Budget', async () => {
    stubQuery(api, 'membershipWorkingGroup.budget', toBalanceOf(0))

    renderModal()

    expect(await screen.findByText('Insufficient Working Group budget')).toBeDefined()
  })

  it('Renders a modal', async () => {
    renderModal()

    expect(await screen.findByText('Invite a member')).toBeDefined()
  })

  it('Enables button', async () => {
    server.createMember('Alice')
    server.createMember('Bob')

    renderModal()

    expect(await screen.findByRole('button', { name: /^Invite a member$/i })).toBeDisabled()

    await selectMember('Inviting member', 'alice')
    await fireEvent.change(screen.getByRole('textbox', { name: /Root account/i }), {
      target: { value: bobStash.address },
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
      target: { value: bobStash.address },
    })
    await fireEvent.change(screen.getByRole('textbox', { name: /Controller account/i }), {
      target: { value: 'AAa' },
    })
    await fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
    await fireEvent.change(screen.getByLabelText(/membership handle/i), { target: { value: 'bobby1' } })

    expect(await screen.findByRole('button', { name: /^Invite a member$/i })).toBeDisabled()
  })

  describe('Authorize', () => {
    async function fillFormAndProceed(invitor = 'alice') {
      seedMembers(server.server)
      renderModal()
      await screen.findAllByRole('button')
      await selectMember('Inviting member', invitor)
      fireEvent.change(screen.getByRole('textbox', { name: /Root account/i }), {
        target: { value: bobStash.address },
      })
      fireEvent.change(screen.getByRole('textbox', { name: /Controller account/i }), {
        target: { value: controllerAddress },
      })
      fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
      fireEvent.change(screen.getByLabelText(/membership handle/i), { target: { value: 'bobby1' } })
      fireEvent.click(await screen.findByRole('button', { name: /^Invite a member$/i }))
    }

    it('Authorize step', async () => {
      await fillFormAndProceed()

      expect(await screen.findByText('Authorize transaction')).toBeDefined()
      expect(await screen.findByText('You are inviting this member. You have 3 invites left.')).toBeDefined()
      expect((await screen.findByText(/^Transaction fee:/i))?.nextSibling?.textContent).toBe('25')
      expect(await screen.findByRole('button', { name: /^Sign and create/i })).toBeEnabled()
    })

    it('Validate funds', async () => {
      stubBalances(api, { available: 0 })
      await fillFormAndProceed()

      expect(await screen.findByRole('button', { name: /^Sign and create/i })).toBeDisabled()
      expect(await screen.findByText(/^Insufficient funds to cover/i)).toBeDefined()
    })

    it('Success step', async () => {
      stubTransactionSuccess(inviteMemberTx, [1])
      await fillFormAndProceed()

      await fireEvent.click(screen.getByText(/^sign and create a member$/i))

      expect(await screen.findByText('Success')).toBeDefined()
      expect(await screen.findByText(/3 invitations left on the "/i)).toBeDefined()
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
