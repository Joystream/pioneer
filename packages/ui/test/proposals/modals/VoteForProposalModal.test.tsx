import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, configure, fireEvent, render, screen, waitFor } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { ApiContext } from '@/api/providers/context'
import { CKEditorProps } from '@/common/components/CKEditor'
import { ModalContextProvider } from '@/common/providers/modal/provider'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers, seedProposal } from '@/mocks/data'
import { getMember } from '@/mocks/helpers'
import { VoteForProposalModal } from '@/proposals/modals/VoteForProposal'

import { getButton } from '../../_helpers/getButton'
import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { alice, bob } from '../../_mocks/keyring'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { PROPOSAL_DATA } from '../../_mocks/server/seeds'
import {
  currentStubErrorMessage,
  stubAccounts,
  stubApi,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'
import { mockTransactionFee, mockUseModalCall } from '../../setup'

configure({ testIdAttribute: 'id' })

jest.mock('@/common/components/CKEditor', () => ({
  CKEditor: (props: CKEditorProps) => mockCKEditor(props),
}))

describe('UI: Vote for Proposal Modal', () => {
  const api = stubApi()
  const useMyMemberships: MyMemberships = {
    active: getMember('alice'),
    members: [getMember('alice')],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }

  const server = setupMockServer({ noCleanupAfterEach: true })

  let tx: any

  beforeAll(async () => {
    mockUseModalCall({ modalData: { id: '0' } })
    await cryptoWaitReady()
    seedMembers(server.server, 2)
    seedProposal(PROPOSAL_DATA, server.server)
    stubAccounts([alice, bob])
  })

  beforeEach(() => {
    tx = stubTransaction(api, 'api.tx.proposalsEngine.vote', 100)
    mockTransactionFee({ feeInfo: { transactionFee: new BN(100), canAfford: true } })
    stubDefaultBalances()
  })

  it('Requirements verification', async () => {
    tx = stubTransaction(api, 'api.tx.proposalsEngine.vote', 10_000)
    mockTransactionFee({ feeInfo: { transactionFee: new BN(100), canAfford: false } })

    await renderModal(true)

    expect(await screen.findByText('modals.insufficientFunds.title')).toBeDefined()
  })

  it('Renders a modal', async () => {
    await renderModal()

    expect(screen.queryByText(/Vote for proposal/i)).not.toBeNull()
    expect(screen.queryByText(PROPOSAL_DATA.title)).not.toBeNull()
  })

  describe('Form', () => {
    it('Empty', async () => {
      await renderModal()

      expect(await getButton(/^sign transaction and vote/i)).toBeDisabled()
      expect(await getButton(/^Reject/i)).toBeDefined()
      expect(await getButton(/^Approve/i)).toBeDefined()
      expect(await getButton(/^Abstain/i)).toBeDefined()
    })

    it('No rationale', async () => {
      await renderModal()

      await act(async () => {
        fireEvent.click(await getButton(/^Approve/i))
      })

      expect(await getButton(/^sign transaction and vote/i)).toBeDisabled()
    })

    it('No vote type selected', async () => {
      await renderModal()

      await fillRationale()

      expect(await getButton(/^sign transaction and vote/i)).toBeDisabled()
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
      await renderModal()

      await act(async () => {
        fireEvent.click(await getButton(/^Reject/i))
      })
      expect(screen.queryByText(/Slash proposal/i)).not.toBeNull()
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
        expect(screen.queryByText(/^(.*?)You need at least \d+ tJOY(.*)/i)).toBeNull()
      })
    })

    it('Success', async () => {
      await beforeEach(true)
      stubTransactionSuccess(tx, 'proposalsEngine', 'Voted')

      await act(async () => {
        fireEvent.click(await getButton(/^sign transaction and vote/i))
      })

      expect(await screen.findByText('Success')).toBeDefined()
      expect(await getButton(/Back to proposals/i)).toBeDefined()
    })

    it('Error', async () => {
      await beforeEach(true)
      stubTransactionFailure(tx)

      await act(async () => {
        fireEvent.click(await getButton(/^sign transaction and vote/i))
      })

      expect(await screen.findByText('Failure')).toBeDefined()
      expect(await screen.findByText(currentStubErrorMessage)).toBeDefined()
    })
  })

  const fillRationale = async () => {
    const rationaleInput = await screen.findByLabelText(/Rationale/i)
    act(() => {
      fireEvent.change(rationaleInput, { target: { value: 'Some rationale' } })
    })
  }

  async function renderModal(skipWait?: boolean) {
    await render(
      <MemoryRouter>
        <ModalContextProvider>
          <MockQueryNodeProviders>
            <MockKeyringProvider>
              <ApiContext.Provider value={api}>
                <MembershipContext.Provider value={useMyMemberships}>
                  <VoteForProposalModal />
                </MembershipContext.Provider>
              </ApiContext.Provider>
            </MockKeyringProvider>
          </MockQueryNodeProviders>
        </ModalContextProvider>
      </MemoryRouter>
    )

    if (!skipWait) {
      await waitFor(async () => expect(await screen.findByText('Vote for proposal')).toBeDefined())
    }
  }
})
