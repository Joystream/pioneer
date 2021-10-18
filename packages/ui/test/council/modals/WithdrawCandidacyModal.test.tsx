import { cryptoWaitReady } from '@polkadot/util-crypto'
import { configure, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { BalancesContextProvider } from '@/accounts/providers/balances/provider'
import { CKEditorProps } from '@/common/components/CKEditor'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContextProvider } from '@/common/providers/modal/provider'
import { WithdrawCandidacyModal } from '@/council/modals/WithdrawCandidacyModal'
import { Member } from '@/memberships/types'
import { seedMembers } from '@/mocks/data'

import { getButton } from '../../_helpers/getButton'
import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  stubApi,
  stubCouncilConstants,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'

configure({ testIdAttribute: 'id' })

jest.mock('@/common/components/CKEditor', () => ({
  CKEditor: (props: CKEditorProps) => mockCKEditor(props),
}))

describe('UI: Withdraw Candidacy Modal', () => {
  const api = stubApi()

  let useAccounts: UseAccounts
  let tx: any

  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(async () => {
    await cryptoWaitReady()
    seedMembers(server.server, 2)

    useAccounts = {
      hasAccounts: true,
      allAccounts: [alice, bob],
    }
  })

  beforeEach(async () => {
    stubDefaultBalances(api)
    stubCouncilConstants(api)
    tx = stubTransaction(api, 'api.tx.council.withdrawCandidacy', 25)
  })

  it('Warning', async () => {
    renderModal(getMember('alice'))

    expect(await screen.findByText(/^Please remember that this action is irreversible/i)).toBeDefined()
  })

  it('Transaction sign', async () => {
    renderModal(getMember('alice'))

    fireEvent.click(await getButton('Withdraw Candidacy'))

    expect(await screen.findByText(/^You intend to withdraw your candidacy/i)).toBeDefined()
    expect(await getButton('Sign and send')).toBeDefined()
    expect(screen.getByText(/^Transaction fee:/i)?.nextSibling?.textContent).toBe('25')
  })

  it('Transaction success', async () => {
    stubTransactionSuccess(tx, 'council', 'CandidacyWithdraw')
    renderModal(getMember('alice'))

    fireEvent.click(await getButton('Withdraw Candidacy'))
    fireEvent.click(await getButton('Sign and send'))

    expect(await screen.findByText(/^You have successfully withdrawn your candidacy/i)).toBeDefined()
  })

  it('Transaction error', async () => {
    stubTransactionFailure(tx)
    renderModal(getMember('alice'))

    fireEvent.click(await getButton('Withdraw Candidacy'))
    fireEvent.click(await getButton('Sign and send'))

    expect(await screen.findByText(/^There was a problem with withdrawing your candidacy/i)).toBeDefined()
  })

  function renderModal(member: Member) {
    return render(
      <MemoryRouter>
        <ModalContextProvider>
          <MockQueryNodeProviders>
            <MockKeyringProvider>
              <AccountsContext.Provider value={useAccounts}>
                <ApiContext.Provider value={api}>
                  <BalancesContextProvider>
                    <WithdrawCandidacyModal member={member} onClose={() => undefined} />
                  </BalancesContextProvider>
                </ApiContext.Provider>
              </AccountsContext.Provider>
            </MockKeyringProvider>
          </MockQueryNodeProviders>
        </ModalContextProvider>
      </MemoryRouter>
    )
  }
})
