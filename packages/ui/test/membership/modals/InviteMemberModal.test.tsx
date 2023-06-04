import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, configure, fireEvent, render, screen, waitFor } from '@testing-library/react'
import BN from 'bn.js'
import { set } from 'lodash'
import React from 'react'
import { of } from 'rxjs'

import { ApiContext } from '@/api/providers/context'
import { GlobalModals } from '@/app/GlobalModals'
import { createType } from '@/common/model/createType'
import { ModalContextProvider } from '@/common/providers/modal/provider'
import { InviteMemberModal } from '@/memberships/modals/InviteMemberModal'
import { seedMembers } from '@/mocks/data'

import { getButton } from '../../_helpers/getButton'
import { selectFromDropdown } from '../../_helpers/selectFromDropdown'
import { createBalanceOf } from '../../_mocks/chainTypes'
import { alice, aliceStash, bobStash } from '../../_mocks/keyring'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  stubAccounts,
  stubApi,
  stubBalances,
  stubDefaultBalances,
  stubQuery,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'

configure({ testIdAttribute: 'id' })

describe('UI: InviteMemberModal', () => {
  beforeAll(async () => {
    await cryptoWaitReady()
    jest.spyOn(console, 'log').mockImplementation()
    stubAccounts([alice, aliceStash])
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  const controllerAddress = '5CrJ2ZegUykhPP9h2YkwDQUBi7AcmafFiu8m5DFU2Qh8XuPR'
  const server = setupMockServer()
  const api = stubApi()
  let inviteMemberTx: any

  beforeEach(async () => {
    stubDefaultBalances()
    stubQuery(api, 'membershipWorkingGroup.budget', createBalanceOf(1000))
    stubQuery(api, 'members.membershipPrice', createBalanceOf(100))
    set(api, 'api.query.members.memberIdByHandleHash.size', () => of(new BN(0)))
    inviteMemberTx = stubTransaction(api, 'api.tx.members.inviteMember')
    seedMembers(server.server)
  })

  it('Validate Working Group Budget', async () => {
    stubQuery(api, 'membershipWorkingGroup.budget', createBalanceOf(0))

    renderModal()

    expect(await screen.findByText('Insufficient Working Group budget')).toBeDefined()
  })

  it('Renders a modal', async () => {
    renderModal()

    expect(await screen.findByText('Invite a member')).toBeDefined()
  })

  it('Validates handle', async () => {
    renderModal()
    const submitButton = await getButton(/^Invite a member$/i)
    expect(submitButton).toBeDisabled()
    await fillForm()

    fireEvent.change(screen.getByLabelText(/membership handle/i), { target: { value: 'alice' } })
    await waitFor(() => expect(submitButton).not.toBeEnabled())
  })

  it('Enables button', async () => {
    renderModal()
    const submitButton = await getButton(/^Invite a member$/i)
    expect(submitButton).toBeDisabled()
    await fillForm()

    await waitFor(() => expect(submitButton).toBeEnabled())
  })

  it('Disables button when one of addresses is invalid', async () => {
    seedMembers(server.server, 2)
    renderModal()
    expect(await getButton(/^Invite a member$/i)).toBeDisabled()
    await fillForm()

    fireEvent.change(getInput(/Controller account/i), {
      target: { value: 'AAa' },
    })
    expect(await getButton(/^Invite a member$/i)).toBeDisabled()
  })

  describe('Authorize', () => {
    async function fillFormAndProceed(invitor = 'alice') {
      seedMembers(server.server, 2)
      renderModal()
      await fillForm(invitor)
      expect(await screen.findByRole('button', { name: /^Invite a member$/i })).toBeEnabled()
      fireEvent.click(await getButton(/^Invite a member$/i))
    }

    it('Authorize step', async () => {
      await fillFormAndProceed()

      expect(await screen.findByText('modals.authorizeTransaction.title')).toBeDefined()
      expect(await screen.findByText('You are inviting this member. You have 5 invites left.')).toBeDefined()
      expect((await screen.findByText(/^modals.transactionFee.label/i))?.nextSibling?.textContent).toBe('25')
      expect(await getButton(/^Sign and create/i)).toBeEnabled()
    })

    it('Validate funds', async () => {
      stubBalances({ available: 0 })
      await fillFormAndProceed()

      expect(await getButton(/^Sign and create/i)).toBeDisabled()
      expect(await screen.findByText(/^Insufficient funds to cover/i)).toBeDefined()
    })

    it('Success step', async () => {
      stubTransactionSuccess(inviteMemberTx, 'members', 'MemberInvited', [createType('MemberId', 1)])
      await fillFormAndProceed()

      fireEvent.click(screen.getByText(/^sign and create a member$/i))

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

  async function fillForm(invitor = 'alice') {
    await getButton(/^Invite a member$/i)
    await selectFromDropdown('Inviting member', invitor)
    await act(async () => {
      fireEvent.change(getInput(/Root account/i), {
        target: { value: bobStash.address },
      })
      fireEvent.change(getInput(/Controller account/i), {
        target: { value: controllerAddress },
      })
      fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })
      fireEvent.change(screen.getByLabelText(/membership handle/i), { target: { value: 'bobby1' } })
    })
  }

  function getInput(labelText: string | RegExp) {
    return screen.getByLabelText(labelText, { selector: 'input' })
  }

  function renderModal() {
    render(
      <MockQueryNodeProviders>
        <MockKeyringProvider>
          <ApiContext.Provider value={api}>
            <ModalContextProvider>
              <GlobalModals />
              <InviteMemberModal />
            </ModalContextProvider>
          </ApiContext.Provider>
        </MockKeyringProvider>
      </MockQueryNodeProviders>
    )
  }
})
