import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import { set } from 'lodash'
import React from 'react'
import { of } from 'rxjs'

import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { ApiContext } from '@/common/providers/api/context'
import { InviteMemberModal } from '@/memberships/modals/InviteMemberModal'
import { seedMembers } from '@/mocks/data'

import { getButton } from '../../_helpers/getButton'
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

const useMyAccounts: UseAccounts = {
  hasAccounts: false,
  allAccounts: [],
}

jest.mock('../../../src/accounts/hooks/useMyAccounts', () => {
  return {
    useMyAccounts: () => useMyAccounts,
  }
})

describe('UI: InviteMemberModal', () => {
  beforeAll(async () => {
    await cryptoWaitReady()
    jest.spyOn(console, 'log').mockImplementation()
    useMyAccounts.allAccounts.push(alice, aliceStash)
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
    seedMembers(server.server)

    renderModal()

    expect(await getButton(/^Invite a member$/i)).toBeDisabled()

    await selectMember('Inviting member', 'alice')
    await fireEvent.change(getInput(/Root account/i), {
      target: { value: bobStash.address },
    })
    await fireEvent.change(getInput(/Controller account/i), {
      target: { value: controllerAddress },
    })
    await fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
    await fireEvent.change(screen.getByLabelText(/membership handle/i), { target: { value: 'bobby1' } })

    expect(await getButton(/^Invite a member$/i)).toBeEnabled()
  })

  it('Disables button when one of addresses is invalid', async () => {
    seedMembers(server.server, 2)

    renderModal()

    expect(await getButton(/^Invite a member$/i)).toBeDisabled()

    await selectMember('Inviting member', 'alice')
    await fireEvent.change(getInput(/Root account/i), {
      target: { value: bobStash.address },
    })
    await fireEvent.change(getInput(/Controller account/i), {
      target: { value: 'AAa' },
    })
    await fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
    await fireEvent.change(screen.getByLabelText(/membership handle/i), { target: { value: 'bobby1' } })

    expect(await getButton(/^Invite a member$/i)).toBeDisabled()
  })

  describe('Authorize', () => {
    async function fillFormAndProceed(invitor = 'alice') {
      seedMembers(server.server, 2)
      renderModal()
      await getButton(/^Invite a member$/i)
      await selectMember('Inviting member', invitor)
      fireEvent.change(getInput(/Root account/i), {
        target: { value: bobStash.address },
      })
      fireEvent.change(getInput(/Controller account/i), {
        target: { value: controllerAddress },
      })
      fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
      fireEvent.change(screen.getByLabelText(/membership handle/i), { target: { value: 'bobby1' } })
      fireEvent.click(await getButton(/^Invite a member$/i))
    }

    it('Authorize step', async () => {
      await fillFormAndProceed()

      expect(await screen.findByText('Authorize transaction')).toBeDefined()
      expect(await screen.findByText('You are inviting this member. You have 5 invites left.')).toBeDefined()
      expect((await screen.findByText(/^Transaction fee:/i))?.nextSibling?.textContent).toBe('25')
      expect(await getButton(/^Sign and create/i)).toBeEnabled()
    })

    it('Validate funds', async () => {
      stubBalances(api, { available: 0 })
      await fillFormAndProceed()

      expect(await getButton(/^Sign and create/i)).toBeDisabled()
      expect(await screen.findByText(/^Insufficient funds to cover/i)).toBeDefined()
    })

    it('Success step', async () => {
      stubTransactionSuccess(inviteMemberTx, [1])
      await fillFormAndProceed()

      await fireEvent.click(screen.getByText(/^sign and create a member$/i))

      expect(await screen.findByText('Success')).toBeDefined()
      expect(await screen.findByText(/5 invitations left on the "/i)).toBeDefined()
    })

    it('Failure step', async () => {
      stubTransactionFailure(inviteMemberTx)
      await fillFormAndProceed()

      fireEvent.click(screen.getByText(/^sign and create a member$/i))

      expect(await screen.findByText('Failure')).toBeDefined()
    })
  })

  function getInput(labelText: string | RegExp) {
    return screen.getByLabelText(labelText, { selector: 'input' })
  }

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
