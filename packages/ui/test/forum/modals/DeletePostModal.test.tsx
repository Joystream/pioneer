import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { ApiContext } from '@/api/providers/context'
import { GlobalModals } from '@/app/GlobalModals'
import { createType } from '@/common/model/createType'
import { ModalContextProvider } from '@/common/providers/modal/provider'
import { ModalCallData } from '@/common/providers/modal/types'
import { DeletePostModal, DeletePostModalCall } from '@/forum/modals/PostActionModal/DeletePostModal'
import { postsToDeleteMap } from '@/forum/model/postsToDeleteMap'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMember } from '@/mocks/data'
import { forumPostMock } from '@/mocks/data/commonMocks'
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
  stubAccounts,
  stubApi,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'
import { mockTransactionFee, mockUseModalCall } from '../../setup'

describe('UI: DeletePostModal', () => {
  const api = stubApi()
  const txPath = 'api.tx.forum.deletePosts'
  const postId = 1
  const deleteMap = postsToDeleteMap(
    createType('PostId', postId),
    createType('ThreadId', 2),
    createType('CategoryId', 3)
  )

  let tx: any
  stubTransaction(api, txPath)

  const modalData: ModalCallData<DeletePostModalCall> = {
    post: {
      ...forumPostMock,
      id: '0',
      author: getMember('alice'),
      createdAt: '2021-07-02T04:22:13.523Z',
      text: 'Sample post text',
      status: 'PostStatusActive',
    },
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
    mockTransactionFee({ feeInfo: { transactionFee: new BN(100), canAfford: false } })
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
      <ModalContextProvider>
        <MockQueryNodeProviders>
          <MockKeyringProvider>
            <MembershipContext.Provider value={useMyMemberships}>
              <ApiContext.Provider value={api}>
                <GlobalModals />
                <DeletePostModal />
              </ApiContext.Provider>
            </MembershipContext.Provider>
          </MockKeyringProvider>
        </MockQueryNodeProviders>
      </ModalContextProvider>
    )
})
