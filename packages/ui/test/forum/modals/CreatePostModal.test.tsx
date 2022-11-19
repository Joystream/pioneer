import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { ApiContext } from '@/api/providers/context'
import { GlobalModals } from '@/app/GlobalModals'
import { ModalContextProvider } from '@/common/providers/modal/provider'
import { ModalCallData } from '@/common/providers/modal/types'
import { CreatePostModal, CreatePostModalCall } from '@/forum/modals/PostActionModal/CreatePostModal'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMember } from '@/mocks/data'
import rawMembers from '@/mocks/data/raw/members.json'
import { seedForumCategory, seedForumPost, seedForumThread } from '@/mocks/data/seedForum'

import { getButton } from '../../_helpers/getButton'
import { createBalanceOf } from '../../_mocks/chainTypes'
import { mockCategories, mockPosts, mockThreads } from '../../_mocks/forum'
import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  currentStubErrorMessage,
  stubAccounts,
  stubApi,
  stubConst,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'
import { mockTransactionFee, mockUseModalCall } from '../../setup'

describe('UI: CreatePostModal', () => {
  const api = stubApi()
  const txPath = 'api.tx.forum.addPost'
  let tx: any
  stubTransaction(api, txPath)
  const modalData: ModalCallData<CreatePostModalCall> = {
    transaction: api.api.tx.forum.addPost(1, 1, 1, '', false),
    postText: 'I disagree',
    isEditable: false,
    onSuccess: () => true,
  }

  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }

  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(async () => {
    await cryptoWaitReady()
    mockUseModalCall({ modalData })
    rawMembers.slice(0, 2).map((member) => seedMember(member, server.server))
    seedForumCategory(mockCategories[0], server.server)
    seedForumThread(mockThreads[0], server.server)
    mockPosts.map((post) => seedForumPost(post, server.server))
    useMyMemberships.members = [getMember('alice'), getMember('bob')]
    useMyMemberships.setActive(getMember('alice'))
    stubAccounts([alice, bob])
  })

  beforeEach(async () => {
    mockTransactionFee({ feeInfo: { transactionFee: new BN(100), canAfford: true } })

    stubDefaultBalances()
    tx = stubTransaction(api, txPath, 25)
    stubConst(api, 'forum.postDeposit', createBalanceOf(10))
    modalData.isEditable = false
    modalData.transaction = api.api.tx.forum.addPost(1, 1, 1, '', false)
  })

  describe('Requirements failed', () => {
    it('Cannot afford transaction fee', async () => {
      mockTransactionFee({ feeInfo: { transactionFee: new BN(100), canAfford: false } })

      modalData.transaction = api.api.tx.forum.addPost(1, 1, 1, '', false)
      renderModal()
      expect(await screen.findByText('modals.insufficientFunds.title')).toBeDefined()
    })

    it('Cannot afford post deposit', async () => {
      stubConst(api, 'forum.postDeposit', createBalanceOf(10000))
      modalData.isEditable = true
      renderModal()
      expect(await screen.findByText('modals.insufficientFunds.title')).toBeDefined()
    })
  })

  it('Transaction failed', async () => {
    stubTransactionFailure(tx)
    renderModal()

    await act(async () => {
      fireEvent.click(await getButton(/Sign and post/i))
    })

    expect(await screen.findByText(currentStubErrorMessage)).toBeDefined()
  })

  it('Transaction success', async () => {
    stubTransactionSuccess(tx, 'forum', 'PostTextUpdated')
    renderModal()

    await act(async () => {
      fireEvent.click(await getButton(/Sign and post/i))
    })

    expect(await screen.findByText('Your post has been submitted.')).toBeDefined()
  })

  it('Displays post deposit', () => {
    stubConst(api, 'forum.postDeposit', createBalanceOf(101))
    modalData.isEditable = true
    renderModal()
    expect(screen.getByText(/^Post deposit:/i)?.nextSibling?.textContent).toBe('101')
    expect(screen.getByText(/^modals.transactionFee.label/i)?.nextSibling?.textContent).toBe('25')
  })

  const renderModal = () =>
    render(
      <ModalContextProvider>
        <MockQueryNodeProviders>
          <MockKeyringProvider>
            <MembershipContext.Provider value={useMyMemberships}>
              <ApiContext.Provider value={api}>
                <GlobalModals />
                <CreatePostModal />
              </ApiContext.Provider>
            </MembershipContext.Provider>
          </MockKeyringProvider>
        </MockQueryNodeProviders>
      </ModalContextProvider>
    )
})
