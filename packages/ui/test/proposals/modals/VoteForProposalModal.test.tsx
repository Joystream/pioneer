import { cryptoWaitReady } from '@polkadot/util-crypto'
import { configure, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { BalancesContextProvider } from '@/accounts/providers/balances/provider'
import { CKEditorProps } from '@/common/components/CKEditor'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { ModalCallData, UseModal } from '@/common/providers/modal/types'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers, seedProposal } from '@/mocks/data'
import { VoteForProposalModal, VoteForProposalModalCall } from '@/proposals/modals/VoteForProposal'

import { getButton } from '../../_helpers/getButton'
import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { alice, bob } from '../../_mocks/keyring'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { PROPOSAL_DATA } from '../../_mocks/server/seeds'
import { stubApi, stubTransaction, stubTransactionFailure, stubTransactionSuccess } from '../../_mocks/transactions'

configure({ testIdAttribute: 'id' })

jest.mock('@/common/components/CKEditor', () => ({
  CKEditor: (props: CKEditorProps) => mockCKEditor(props),
}))

describe('UI: Vote for Proposal Modal', () => {
  const api = stubApi()
  const useModal: UseModal<ModalCallData<VoteForProposalModalCall>> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: null,
    modalData: { id: '0' },
  }
  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
  }

  let useAccounts: UseAccounts

  const server = setupMockServer({ noCleanupAfterEach: true })

  let tx: any

  beforeAll(async () => {
    await cryptoWaitReady()
    seedMembers(server.server, 2)
    seedProposal(PROPOSAL_DATA, server.server)

    useAccounts = {
      hasAccounts: true,
      allAccounts: [alice, bob],
    }
  })

  beforeEach(() => {
    tx = stubTransaction(api, 'api.tx.proposalEngine.vote')
  })

  it('Renders a modal', async () => {
    renderModal()

    expect(await screen.findByText('Vote for proposal')).toBeDefined()
    expect(await screen.findByText(PROPOSAL_DATA.title)).toBeDefined()
  })

  it('Empty form', async () => {
    renderModal()

    expect(await getButton(/^sign transaction and vote/i)).toBeDisabled()
    expect(await getButton(/^Reject/i))
    expect(await getButton(/^Approve/i))
    expect(await getButton(/^Abstain/i))
  })

  describe('Transaction', () => {
    beforeEach(async () => {
      fireEvent.click(await getButton(/^Approve/i))
    })

    it('Success', async () => {
      stubTransactionSuccess(tx, 'proposalsEngine', 'Voted')

      fireEvent.click(await getButton(/^Sign/))

      expect(await screen.findByText('Success')).toBeDefined()
    })

    it('Error', async () => {
      stubTransactionFailure(tx)

      fireEvent.click(await getButton(/^Sign/))

      expect(await screen.findByText('Oh no')).toBeDefined()
    })
  })

  function renderModal() {
    return render(
      <MemoryRouter>
        <ModalContext.Provider value={useModal}>
          <MockQueryNodeProviders>
            <MockKeyringProvider>
              <AccountsContext.Provider value={useAccounts}>
                <ApiContext.Provider value={api}>
                  <BalancesContextProvider>
                    <MembershipContext.Provider value={useMyMemberships}>
                      <VoteForProposalModal />
                    </MembershipContext.Provider>
                  </BalancesContextProvider>
                </ApiContext.Provider>
              </AccountsContext.Provider>
            </MockKeyringProvider>
          </MockQueryNodeProviders>
        </ModalContext.Provider>
      </MemoryRouter>
    )
  }
})
