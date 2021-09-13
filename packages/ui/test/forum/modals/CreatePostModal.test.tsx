import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { ModalCallData, UseModal } from '@/common/providers/modal/types'
import { CreatePostModal, CreatePostModalCall } from '@/forum/modals/PostActionModal/CreatePostModal'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMember } from '@/mocks/data'
import rawMembers from '@/mocks/data/raw/members.json'
import { seedForumCategory, seedForumPost, seedForumThread } from '@/mocks/data/seedForum'

import { getButton } from '../../_helpers/getButton'
import { toBalanceOf } from '../../_mocks/chainTypes'
import { mockCategories, mockPosts, mockThreads } from '../../_mocks/forum'
import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  stubApi,
  stubConst,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'

describe('UI: CreatePostModal', () => {
  const api = stubApi()
  const txPath = 'api.tx.forum.addPost'
  let tx: any
  stubTransaction(api, txPath)
  const modalData: ModalCallData<CreatePostModalCall> = {
    transaction: api.api.tx.forum.addPost(1, 1, 1, '', false),
    postText: 'I disagree',
    isEditable: false,
  }

  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: null,
    modalData,
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

  beforeAll(async () => {
    await cryptoWaitReady()
    rawMembers.slice(0, 2).map((member) => seedMember(member, server.server))
    seedForumCategory(mockCategories[0], server.server)
    seedForumThread(mockThreads[0], server.server)
    mockPosts.map((post) => seedForumPost(post, server.server))
    useMyMemberships.members = [getMember('alice'), getMember('bob')]
    useMyMemberships.setActive(getMember('alice'))
    useAccounts = {
      hasAccounts: true,
      allAccounts: [alice, bob],
    }
  })

  beforeEach(async () => {
    stubDefaultBalances(api)
    tx = stubTransaction(api, txPath, 25)
    stubConst(api, 'forum.postDeposit', toBalanceOf(10))
    modalData.isEditable = false
    modalData.transaction = api.api.tx.forum.addPost(1, 1, 1, '', false)
  })

  describe('Requirements failed', () => {
    it('Cannot afford transaction fee', async () => {
      tx = stubTransaction(api, txPath, 10000)
      modalData.transaction = api.api.tx.forum.addPost(1, 1, 1, '', false)
      renderModal()
      expect(await screen.findByText('Insufficient Funds')).toBeDefined()
    })

    it('Cannot afford post deposit', async () => {
      stubConst(api, 'forum.postDeposit', toBalanceOf(10000))
      modalData.isEditable = true
      renderModal()
      expect(await screen.findByText('Insufficient Funds')).toBeDefined()
    })
  })

  it('Transaction failed', async () => {
    stubTransactionFailure(tx)
    renderModal()
    await fireEvent.click(await getButton(/Sign and post/i))
    expect(await screen.getByText('There was a problem posting your message.')).toBeDefined()
  })

  it('Transaction success', async () => {
    stubTransactionSuccess(tx, [], 'forum', 'editPostText')
    renderModal()
    await fireEvent.click(await getButton(/Sign and post/i))
    expect(await screen.getByText('Your post has been submitted.')).toBeDefined()
  })

  it('Displays post deposit', () => {
    stubConst(api, 'forum.postDeposit', toBalanceOf(101))
    modalData.isEditable = true
    renderModal()
    expect(screen.getByText(/^Post deposit:/i)?.nextSibling?.textContent).toBe('101')
    expect(screen.getByText(/^Transaction fee:/i)?.nextSibling?.textContent).toBe('25')
  })

  const renderModal = () =>
    render(
      <ModalContext.Provider value={useModal}>
        <MockQueryNodeProviders>
          <MockKeyringProvider>
            <AccountsContext.Provider value={useAccounts}>
              <MembershipContext.Provider value={useMyMemberships}>
                <ApiContext.Provider value={api}>
                  <CreatePostModal />
                </ApiContext.Provider>
              </MembershipContext.Provider>
            </AccountsContext.Provider>
          </MockKeyringProvider>
        </MockQueryNodeProviders>
      </ModalContext.Provider>
    )
})
