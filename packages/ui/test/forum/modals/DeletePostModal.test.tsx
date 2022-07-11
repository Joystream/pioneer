import { createType } from '@joystream/types'
import { PostId, ThreadId } from '@joystream/types/common'
import { CategoryId } from '@joystream/types/forum'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { ModalCallData, UseModal } from '@/common/providers/modal/types'
import { DeletePostModal, DeletePostModalCall } from '@/forum/modals/PostActionModal/DeletePostModal'
import { postsToDeleteMap } from '@/forum/model/postsToDeleteMap'
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
  currentStubErrorMessage,
  stubApi,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'
import { mockedTransactionFee } from '../../setup'

jest.mock('@/common/hooks/useQueryNodeTransactionStatus', () => ({
  useQueryNodeTransactionStatus: () => 'confirmed',
}))

describe('UI: DeletePostModal', () => {
  const api = stubApi()
  const txPath = 'api.tx.forum.deletePosts'
  const postId = 1
  const deleteMap = postsToDeleteMap(
    createType<PostId, 'PostId'>('PostId', postId),
    createType<ThreadId, 'ThreadId'>('ThreadId', 2),
    createType<CategoryId, 'CategoryId'>('CategoryId', 3)
  )

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
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
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
      isLoading: false,
      hasAccounts: true,
      allAccounts: [alice, bob],
    }
  })

  beforeEach(async () => {
    mockedTransactionFee.feeInfo = { transactionFee: new BN(100), canAfford: true }

    stubDefaultBalances(api)
    tx = stubTransaction(api, txPath)
    modalData.transaction = api.api.tx.forum.deletePosts(useMyMemberships.active?.id ?? 1, deleteMap, '')
  })

  it('Requirements passed', async () => {
    renderModal()
    expect(screen.queryByText(/You intend to delete your post./i)).not.toBeNull()
    expect(screen.queryByText(/Sign and delete/i)).not.toBeNull()
    expect(screen.queryByText(/Post preview/i)).toBeNull()
  })

  it('Requirements failed', async () => {
    mockedTransactionFee.feeInfo = { transactionFee: new BN(100), canAfford: false }
    modalData.transaction = api.api.tx.forum.deletePosts(useMyMemberships.active?.id ?? 1, deleteMap, '')
    renderModal()
    expect(await screen.findByText('modals.insufficientFunds.title')).toBeDefined()
  })

  it('Transaction failed', async () => {
    stubTransactionFailure(tx)
    renderModal()
    await act(async () => {
      fireEvent.click(await getButton(/Sign and delete/i))
    })

    expect(await screen.findByText(currentStubErrorMessage)).toBeDefined()
  })

  it('Transaction success', async () => {
    stubTransactionSuccess(tx, 'forum', 'PostDeleted')
    renderModal()
    await act(async () => {
      fireEvent.click(await getButton(/Sign and delete/i))
    })

    expect(await screen.findByText('Your post has been deleted.')).toBeDefined()
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
