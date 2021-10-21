import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, configure, fireEvent, render, screen, waitFor } from '@testing-library/react'
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
import { getMember } from '@/mocks/helpers'
import { VoteForProposalModal, VoteForProposalModalCall } from '@/proposals/modals/VoteForProposal'

import { getButton } from '../../_helpers/getButton'
import { includesTextWithMarkup } from '../../_helpers/includesTextWithMarkup'
import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { alice, bob } from '../../_mocks/keyring'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { PROPOSAL_DATA } from '../../_mocks/server/seeds'
import {
  stubApi,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'

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
    active: getMember('alice'),
    members: [getMember('alice')],
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
    tx = stubTransaction(api, 'api.tx.proposalsEngine.vote', 100)
    stubDefaultBalances(api)
  })

  it('Renders a modal', async () => {
    const { queryByText } = await renderModal()

    expect(queryByText(/Vote for proposal/i)).not.toBeNull()
    expect(queryByText(PROPOSAL_DATA.title)).not.toBeNull()
  })

  describe('Form', () => {
    it('Empty', async () => {
      await renderModal()

      expect(await getButton(/^sign transaction and vote/i)).toBeDisabled()
      expect(await getButton(/^Reject/i)).toBeDefined()
      expect(await getButton(/^Approve/i)).toBeDefined()
      expect(await getButton(/^Abstain/i)).toBeDefined()
    })

    it('Filled', async () => {
      await renderModal()

      await act(async () => {
        fireEvent.click(await getButton(/^Approve/i))
      })
      await fillRationale()

      expect(await getButton(/^sign transaction and vote/i)).not.toBeDisabled()
    })

    it('Vote Status: Reject', async () => {
      const { queryByText } = await renderModal()

      await act(async () => {
        fireEvent.click(await getButton(/^Reject/i))
      })
      expect(queryByText(/Slash proposal/i)).not.toBeNull()
    })
  })

  describe('Transaction', () => {
    async function beforeEach(enoughFunds: boolean) {
      if (!enoughFunds) {
        tx = stubTransaction(api, 'api.tx.proposalsEngine.vote', 1500)
      }

      await renderModal()
      await act(async () => {
        fireEvent.click(await getButton(/^Approve/i))
      })
      await fillRationale()
      await act(async () => {
        fireEvent.click(await getButton(/^sign transaction and vote/i))
      })
    }

    describe('Renders', () => {
      it('Enough funds', async () => {
        await beforeEach(true)

        expect(await getButton(/^sign transaction and vote/i)).not.toBeDisabled()
        expect(screen.queryByText(/^(.*?)You need at least \d+ JOY(.*)/i)).toBeNull()
      })
      it('Not enough funds', async () => {
        await beforeEach(false)

        expect(await getButton(/^sign transaction and vote/i)).toBeDisabled()
        expect(screen.queryByText(/^(.*?)You need at least 1500 JOY(.*)/i)).not.toBeNull()
      })
    })

    it('Success', async () => {
      await beforeEach(true)
      stubTransactionSuccess(tx, 'proposalsEngine', 'Voted')

      await act(async () => {
        fireEvent.click(await getButton(/^sign transaction and vote/i))
      })

      expect(screen.queryByText('Success')).not.toBeNull()
      expect(await getButton(/See my proposal/i)).toBeDefined()
    })

    it('Error', async () => {
      await beforeEach(true)
      stubTransactionFailure(tx)

      await act(async () => {
        fireEvent.click(await getButton(/^sign transaction and vote/i))
      })

      expect(screen.queryByText('Failure')).not.toBeNull()
      expect(
        includesTextWithMarkup(screen.getByText, `There was a problem while Approve proposal "${PROPOSAL_DATA.title}".`)
      ).toBeInTheDocument()
    })
  })

  const fillRationale = async () => {
    const rationaleInput = await screen.findByLabelText(/Rationale/i)
    act(() => {
      fireEvent.change(rationaleInput, { target: { value: 'Some rationale' } })
    })
  }

  async function renderModal() {
    const renderedModal = await render(
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

    await waitFor(async () => expect(await screen.findByText('Vote for proposal')).toBeDefined())

    return renderedModal
  }
})
