import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { ModalCallData, UseModal } from '@/common/providers/modal/types'
import { DeletePostModal, DeletePostModalCall } from '@/forum/modals/PostActionModal/DeletePostModal'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMember } from '@/mocks/data'
import rawMembers from '@/mocks/data/raw/members.json'
import { seedForumCategory, seedForumPost, seedForumThread } from '@/mocks/data/seedForum'

import { getButton } from '../../_helpers/getButton'
import { mockCategories, mockPosts, mockThreads } from '../../_mocks/forum'
import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  stubApi,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'

describe('UI: DeletePostModal', () => {
  const api = stubApi()
  const txPath = 'api.tx.forum.deletePosts'
  let tx: any
  stubTransaction(api, txPath)
  const modalData: ModalCallData<DeletePostModalCall> = {
    post: {
      id: '0',
      author: getMember('alice'),
      createdAt: '2021-07-02T04:22:13.523Z',
      text: 'Sample post text',
      status: 'PostStatusActive',
    },
    transaction: api.api.tx.forum.deletePosts(1, [[1, 1, 1, true]], ''),
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
    tx = stubTransaction(api, txPath)
    modalData.transaction = api.api.tx.forum.deletePosts(1, [[1, 1, 1, true]], '')
  })

  it('Requirements passed', async () => {
    renderModal()
    expect(screen.findByText(/You intend to delete your post./i)).not.toBeNull()
    expect(screen.queryByText(/Sign and delete/i)).not.toBeNull()
    expect(screen.queryByText(/Post preview/i)).toBeNull()
  })

  it('Requirements failed', async () => {
    tx = stubTransaction(api, txPath, 10000)
    modalData.transaction = api.api.tx.forum.deletePosts(1, [[1, 1, 1, true]], '')
    renderModal()
    expect(await screen.findByText('Insufficient Funds')).toBeDefined()
  })

  it('Transaction failed', async () => {
    stubTransactionFailure(tx)
    renderModal()
    await fireEvent.click(await getButton(/Sign and delete/i))
    expect(await screen.getByText('There was a problem deleting your post.')).toBeDefined()
  })

  it('Transaction success', async () => {
    stubTransactionSuccess(tx, [], 'forum', 'deletePosts')
    renderModal()
    await fireEvent.click(await getButton(/Sign and delete/i))
    expect(await screen.getByText('Your post has been deleted.')).toBeDefined()
  })

  const renderModal = () =>
    render(
      <ModalContext.Provider value={useModal}>
        <MockQueryNodeProviders>
          <MockKeyringProvider>
            <AccountsContext.Provider value={useAccounts}>
              <MembershipContext.Provider value={useMyMemberships}>
                <ApiContext.Provider value={api}>
                  <DeletePostModal />
                </ApiContext.Provider>
              </MembershipContext.Provider>
            </AccountsContext.Provider>
          </MockKeyringProvider>
        </MockQueryNodeProviders>
      </ModalContext.Provider>
    )
})
