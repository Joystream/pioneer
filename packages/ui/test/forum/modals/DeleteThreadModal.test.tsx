import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { BalancesContextProvider } from '@/accounts/providers/balances/provider'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { ModalCallData, UseModal } from '@/common/providers/modal/types'
import { last } from '@/common/utils'
import { DeleteThreadModal, DeleteThreadModalCall } from '@/forum/modals/DeleteThreadModal'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMember } from '@/mocks/data'
import rawMembers from '@/mocks/data/raw/members.json'
import { seedForumCategory, seedForumThread } from '@/mocks/data/seedForum'
import { randomBlock } from '@/mocks/helpers/randomBlock'

import { getButton } from '../../_helpers/getButton'
import { mockCategories, mockThreads } from '../../_mocks/forum'
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

jest.mock('@/common/hooks/useQueryNodeTransactionStatus', () => ({
  useQueryNodeTransactionStatus: () => 'confirmed',
}))

describe('UI: DeleteThreadModal', () => {
  const api = stubApi()
  const txPath = 'api.tx.forum.deleteThread'
  const modalData: ModalCallData<DeleteThreadModalCall> = {
    thread: {
      id: '1',
      title: 'Example Thread',
      categoryId: '1',
      authorId: '0',
      isSticky: false,
      createdInBlock: randomBlock(),
      tags: [],
      visiblePostsCount: 5,
      status: { __typename: 'ThreadStatusActive' },
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
  let transaction: any
  let txMock: jest.Mock

  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(async () => {
    await cryptoWaitReady()
    rawMembers.slice(0, 2).map((member) => seedMember(member, server.server))
    seedForumCategory(mockCategories[0], server.server)
    seedForumThread(mockThreads[0], server.server)
    useMyMemberships.members = [getMember('alice'), getMember('bob')]
    useMyMemberships.setActive(getMember('alice'))
    useAccounts = {
      isLoading: false,
      hasAccounts: true,
      allAccounts: [alice, bob],
    }
  })

  beforeEach(async () => {
    stubDefaultBalances(api)
    transaction = stubTransaction(api, txPath, 100)
    txMock = api.api.tx.forum.deleteThread as unknown as jest.Mock
  })

  it('Requirements passed', async () => {
    renderModal()
    expect(screen.findByText('modals.deleteThread.description')).toBeDefined()
    expect(screen.findByText('modals.deleteThread.buttonLabel')).toBeDefined()

    const [userId, categoryId, threadId, hide] = last(txMock.mock.calls)

    expect(userId.toJSON()).toBe(Number(modalData.thread.authorId))
    expect(categoryId.toJSON()).toBe(Number(modalData.thread.categoryId))
    expect(threadId.toJSON()).toBe(Number(modalData.thread.id))
    expect(hide).toBe(true)
  })

  it('Requirements failed', async () => {
    stubTransaction(api, txPath, 10000)
    renderModal()
    expect(await screen.findByText('modals.insufficientFunds.title')).toBeDefined()
  })

  it('Transaction failed', async () => {
    stubTransactionFailure(transaction)
    renderModal()
    await act(async () => {
      fireEvent.click(await getButton('modals.deleteThread.buttonLabel'))
    })
    expect(await screen.findByText('modals.deleteThread.error')).toBeDefined()
  })

  it('Transaction success', async () => {
    stubTransactionSuccess(transaction, 'forum', 'ThreadDeleted')
    renderModal()
    await act(async () => {
      fireEvent.click(await getButton('modals.deleteThread.buttonLabel'))
    })

    expect(await screen.findByText('modals.deleteThread.success')).toBeDefined()
  })

  const renderModal = () =>
    render(
      <ModalContext.Provider value={useModal}>
        <MockQueryNodeProviders>
          <MockKeyringProvider>
            <AccountsContext.Provider value={useAccounts}>
              <MembershipContext.Provider value={useMyMemberships}>
                <ApiContext.Provider value={api}>
                  <BalancesContextProvider>
                    <DeleteThreadModal />
                  </BalancesContextProvider>
                </ApiContext.Provider>
              </MembershipContext.Provider>
            </AccountsContext.Provider>
          </MockKeyringProvider>
        </MockQueryNodeProviders>
      </ModalContext.Provider>
    )
})
