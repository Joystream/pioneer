import { cryptoWaitReady } from '@polkadot/util-crypto'
import { configure, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { ApiContext } from '@/api/providers/context'
import { CKEditorProps } from '@/common/components/CKEditor'
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
  currentStubErrorMessage,
  stubAccounts,
  stubApi,
  stubCouncilConstants,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'
import { mockUseModalCall } from '../../setup'

configure({ testIdAttribute: 'id' })

jest.mock('@/common/components/CKEditor', () => ({
  CKEditor: (props: CKEditorProps) => mockCKEditor(props),
}))

describe('UI: Withdraw Candidacy Modal', () => {
  const api = stubApi()

  let tx: any

  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(async () => {
    await cryptoWaitReady()
    seedMembers(server.server, 2)
    stubAccounts([alice, bob])
  })

  beforeEach(async () => {
    stubDefaultBalances()
    stubCouncilConstants(api)
    tx = stubTransaction(api, 'api.tx.council.withdrawCandidacy', 25)
  })

  it('Warning', async () => {
    renderModal(getMember('alice'))

    expect(await screen.findByText(/^Withdrawing a candidacy is irreversible/i)).toBeDefined()
  })

  it('Transaction sign', async () => {
    renderModal(getMember('alice'))

    fireEvent.click(await getButton('Withdraw Candidacy'))

    expect(await screen.findByText(/^You intend to withdraw your candidacy/i)).toBeDefined()
    expect(await getButton('Sign and Send')).toBeDefined()
    expect(screen.getByText(/^modals.transactionFee.label/i)?.nextSibling?.textContent).toBe('25')
  })

  it('Transaction success', async () => {
    stubTransactionSuccess(tx, 'council', 'CandidacyWithdraw')
    renderModal(getMember('alice'))

    fireEvent.click(await getButton('Withdraw Candidacy'))
    fireEvent.click(await getButton('Sign and Send'))

    expect(await screen.findByText(/^You have successfully withdrawn your candidacy/i)).toBeDefined()
  })

  it('Transaction error', async () => {
    stubTransactionFailure(tx)
    renderModal(getMember('alice'))

    fireEvent.click(await getButton('Withdraw Candidacy'))
    fireEvent.click(await getButton('Sign and Send'))

    expect(await screen.findByText(currentStubErrorMessage)).toBeDefined()
  })

  function renderModal(member: Member) {
    mockUseModalCall({ modalData: { member } })
    return render(
      <MemoryRouter>
        <ModalContextProvider>
          <MockQueryNodeProviders>
            <MockKeyringProvider>
              <ApiContext.Provider value={api}>
                <WithdrawCandidacyModal />
              </ApiContext.Provider>
            </MockKeyringProvider>
          </MockQueryNodeProviders>
        </ModalContextProvider>
      </MemoryRouter>
    )
  }
})
