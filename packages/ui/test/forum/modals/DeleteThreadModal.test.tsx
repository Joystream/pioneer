import { act, fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { ApiContext } from '@/api/providers/context'
import { GlobalModals } from '@/app/GlobalModals'
import { BN_ZERO } from '@/common/constants'
import { ModalContextProvider } from '@/common/providers/modal/provider'
import { ModalCallData } from '@/common/providers/modal/types'
import { UseTransaction } from '@/common/providers/transactionFees/context'
import { last } from '@/common/utils'
import { DeleteThreadModalCall } from '@/forum/modals/DeleteThreadModal'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { randomBlock } from '@/mocks/helpers/randomBlock'

import { getButton } from '../../_helpers/getButton'
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
import { mockUseModalCall } from '../../setup'

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

export const mockedTransactionFee: UseTransaction = {
  transaction: undefined,
  setTransaction: () => undefined,
  setSigner: () => undefined,
  feeInfo: { transactionFee: BN_ZERO, canAfford: true },
}

jest.mock('@/accounts/hooks/useTransactionFee', () => ({
  useTransactionFee: jest.fn(() => mockedTransactionFee),
}))

describe('UI: DeleteThreadModal', () => {
  const api = stubApi()
  const txPath = 'api.tx.forum.deleteThread'

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

  let transaction: any
  let txMock: jest.Mock

  setupMockServer({ noCleanupAfterEach: true })

  beforeAll(async () => {
    mockUseModalCall({ modalData, modal: 'DeleteThreadModal' })
    useMyMemberships.members = [getMember('alice'), getMember('bob')]
    useMyMemberships.setActive(getMember('alice'))
    stubAccounts([alice, bob])
  })

  beforeEach(async () => {
    mockedTransactionFee.feeInfo = { transactionFee: new BN(100), canAfford: true }
    stubDefaultBalances()
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
    mockedTransactionFee.feeInfo = { transactionFee: new BN(100), canAfford: false }

    renderModal()
    expect(await screen.findByText('modals.insufficientFunds.title')).toBeDefined()
  })

  it('Transaction failed', async () => {
    stubTransactionFailure(transaction)
    renderModal()
    await act(async () => {
      fireEvent.click(await getButton('Sign and delete'))
    })
    expect(await screen.findByText(currentStubErrorMessage)).toBeDefined()
  })

  it('Transaction success', async () => {
    stubTransactionSuccess(transaction, 'forum', 'ThreadDeleted')
    renderModal()
    await act(async () => {
      fireEvent.click(await getButton('Sign and delete'))
    })

    expect(await screen.findByText('Your thread has been deleted.')).toBeDefined()
  })

  const renderModal = () =>
    render(
      <ModalContextProvider>
        <MockQueryNodeProviders>
          <MockKeyringProvider>
            <MembershipContext.Provider value={useMyMemberships}>
              <ApiContext.Provider value={api}>
                <GlobalModals />
              </ApiContext.Provider>
            </MembershipContext.Provider>
          </MockKeyringProvider>
        </MockQueryNodeProviders>
      </ModalContextProvider>
    )
})
