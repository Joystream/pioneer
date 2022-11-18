import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { ApiContext } from '@/api/providers/context'
import { GlobalModals } from '@/app/GlobalModals'
import { ModalContextProvider } from '@/common/providers/modal/provider'
import { ModalCallData } from '@/common/providers/modal/types'
import { EditPostModal, EditPostModalCall } from '@/forum/modals/PostActionModal/EditPostModal'
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
  stubAccounts,
  stubApi,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'
import { mockTransactionFee, mockUseModalCall } from '../../setup'

describe('UI: EditPostModal', () => {
  const api = stubApi()
  const txPath = 'api.tx.forum.editPostText'
  let tx: any
  stubTransaction(api, txPath)
  const modalData: ModalCallData<EditPostModalCall> = {
    postAuthor: getMember('alice'),
    postText: 'Lorem ipsum',
    transaction: api.api.tx.forum.editPostText(1, 1, 1, 1, ''),
    onSuccess: () => true,
    onFail: () => true,
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
  })

  it('Requirements passed', async () => {
    renderModal()
    expect(screen.queryByText(/You intend to edit your post./i)).not.toBeNull()
    expect(screen.queryByText(/Sign and edit/i)).not.toBeNull()
    expect(screen.queryByText(/Display preview/i)).not.toBeNull()
  })

  it('Requirements failed', async () => {
    mockTransactionFee({ feeInfo: { transactionFee: new BN(100), canAfford: false } })

    renderModal()
    expect(screen.queryByText('modals.insufficientFunds.title')).not.toBeNull()
  })

  it('Transaction failed', async () => {
    stubTransactionFailure(tx)
    mockUseModalCall({ modalData: { ...modalData, transaction: api.api.tx.forum.editPostText(1, 1, 1, 1, '') } })

    renderModal()
    await act(async () => {
      fireEvent.click(await getButton(/Sign and edit/i))
    })
    expect(await screen.findByText(currentStubErrorMessage)).toBeDefined()
  })

  it('Transaction success', async () => {
    stubTransactionSuccess(tx, 'forum', 'PostTextUpdated')
    mockUseModalCall({ modalData: { ...modalData, transaction: api.api.tx.forum.editPostText(1, 1, 1, 1, '') } })

    renderModal()
    await act(async () => {
      fireEvent.click(await getButton(/Sign and edit/i))
    })
    expect(await screen.findByText('Your edit has been submitted.')).toBeDefined()
  })

  const renderModal = () =>
    render(
      <ModalContextProvider>
        <MockQueryNodeProviders>
          <MockKeyringProvider>
            <MembershipContext.Provider value={useMyMemberships}>
              <ApiContext.Provider value={api}>
                <GlobalModals />
                <EditPostModal />
              </ApiContext.Provider>
            </MembershipContext.Provider>
          </MockKeyringProvider>
        </MockQueryNodeProviders>
      </ModalContextProvider>
    )
})
