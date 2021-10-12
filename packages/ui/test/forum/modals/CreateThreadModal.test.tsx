import { createType } from '@joystream/types'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { generatePath, MemoryRouter, Route } from 'react-router-dom'

import { CKEditorProps } from '@/common/components/CKEditor'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { ForumRoutes } from '@/forum/constant'
import { CreateThreadModal } from '@/forum/modals/CreateThreadModal'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'

import { getButton } from '../../_helpers/getButton'
import { createBalanceOf } from '../../_mocks/chainTypes'
import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { getMember } from '../../_mocks/members'
import { MockApolloProvider, MockKeyringProvider } from '../../_mocks/providers'
import {
  stubApi,
  stubConst,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'

jest.mock('@/common/components/CKEditor', () => ({
  CKEditor: (props: CKEditorProps) => mockCKEditor(props),
}))

describe('CreateThreadModal', () => {
  const api = stubApi()
  stubDefaultBalances(api)
  const txPath = 'api.tx.forum.createThread'
  let tx = {}
  let pathname: string
  const stubDeposits = (values?: { post?: number; thread?: number }) => {
    stubConst(api, 'forum.postDeposit', createBalanceOf(values?.post ?? 10))
    stubConst(api, 'forum.threadDeposit', createBalanceOf(values?.thread ?? 10))
  }

  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: null,
    modalData: { categoryId: '0' },
  }
  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
  }

  beforeEach(async () => {
    useMyMemberships.members = [getMember('alice'), getMember('bob')]
    useMyMemberships.setActive(getMember('alice'))
    tx = stubTransaction(api, txPath)
    stubDeposits()
  })

  describe('Requirements failed', () => {
    it('No active member', () => {
      useMyMemberships.active = undefined
      renderModal()
      expect(useModal.showModal).toBeCalledWith({ modal: 'SwitchMember' })
    })

    it('Insufficient funds for minimum fee', async () => {
      tx = stubTransaction(api, txPath, 10_000)
      renderModal()
      expect(await screen.findByText(/insufficient funds/i)).toBeDefined()
    })

    it('Insufficient funds for thread deposit', async () => {
      stubDeposits({ thread: 10_000 })
      renderModal()
      expect(await screen.findByText(/insufficient funds/i)).toBeDefined()
    })

    it('Insufficient funds for post deposit', async () => {
      stubDeposits({ post: 10_000 })
      renderModal()
      expect(await screen.findByText(/insufficient funds/i)).toBeDefined()
    })
  })

  describe('General details', () => {
    it('No details entered', async () => {
      renderModal()
      expect(await getButton(/next step/i)).toBeDisabled()
    })

    it('Both fields filled', async () => {
      renderModal()
      await fillDetails()
      expect(await getButton(/next step/i)).not.toBeDisabled()
    })
  })

  describe('Sign modal', () => {
    it('Displays after filling in details', async () => {
      await fillAndProceed()
      expect(await screen.findByText(/authorize transaction/i)).toBeDefined()
    })

    it("Displays the member's controller account", async () => {
      await fillAndProceed()
      expect(await screen.findByText(/5GrwvaEF5.*NoHGKutQY/i)).toBeDefined()
    })

    it('Insufficient funds for actual fee', async () => {
      stubDeposits({ post: 0, thread: 0 })
      renderModal()
      await fillDetails()
      tx = stubTransaction(api, txPath, 10000)
      const next = await getButton(/next step/i)
      fireEvent.click(next)

      expect(await getButton(/sign and send/i)).toBeDisabled()
      expect(
        await screen.findByText(
          'Insufficient funds to cover the thread creation. You need at least 10000 JOY on your account for this action.'
        )
      ).toBeDefined()
    })

    it('Insufficient funds for fee + deposits', async () => {
      stubDeposits({ post: 400, thread: 400 })
      renderModal()
      await fillDetails()
      tx = stubTransaction(api, txPath, 400)
      const next = await getButton(/next step/i)
      fireEvent.click(next)

      expect(await getButton(/sign and send/i)).toBeDisabled()
      expect(
        await screen.findByText(
          'Insufficient funds to cover the thread creation. You need at least 1200 JOY on your account for this action.'
        )
      ).toBeDefined()
    })

    it('Displays deposit amount', async () => {
      stubDeposits({ post: 102, thread: 103 })
      renderModal()
      await fillDetails()
      tx = stubTransaction(api, txPath, 101)
      const next = await getButton(/next step/i)
      fireEvent.click(next)

      expect(screen.getByText(/^Thread creation and initial post deposit:/i)?.nextSibling?.textContent).toBe('205')
      expect(screen.getByText(/^Transaction fee:/i)?.nextSibling?.textContent).toBe('101')
    })

    it('Transaction failure', async () => {
      stubTransactionFailure(tx)
      await fillAndProceed()
      fireEvent.click(await getButton(/sign and send/i))

      expect(await screen.findByText(/failure/i)).toBeDefined()
    })

    it('Transaction success', async () => {
      stubTransactionSuccess(tx, 'forum', 'ThreadCreated', [createType('CategoryId', 0), createType('ThreadId', 1337)])
      await fillAndProceed()
      fireEvent.click(await getButton(/sign and send/i))

      expect(await screen.findByText(/success!/i)).toBeDefined()
    })

    it('Proceed to thread on success', async () => {
      stubTransactionSuccess(tx, 'forum', 'ThreadCreated', [createType('CategoryId', 0), createType('ThreadId', 1337)])
      await fillAndProceed()
      fireEvent.click(await getButton(/sign and send/i))
      fireEvent.click(await getButton(/see my thread/i))

      expect(pathname).toEqual(generatePath(ForumRoutes.thread, { id: '1337' }))
    })
  })

  async function fillDetails() {
    const topicInput = await screen.findByLabelText(/topic of the thread/i)
    fireEvent.change(topicInput, { target: { value: 'topic' } })

    const descriptionInput = await screen.findByLabelText(/description/i)
    fireEvent.change(descriptionInput, { target: { value: 'lorem' } })
  }

  async function fillAndProceed() {
    renderModal()
    await fillDetails()
    const next = await getButton(/next step/i)
    fireEvent.click(next)
  }

  function renderModal() {
    return render(
      <MemoryRouter initialEntries={['/forum']}>
        <ApiContext.Provider value={api}>
          <ModalContext.Provider value={useModal}>
            <MockKeyringProvider>
              <MembershipContext.Provider value={useMyMemberships}>
                <MockApolloProvider>
                  <CreateThreadModal />
                  <Route
                    path="*"
                    render={({ location }) => {
                      pathname = location.pathname
                      return null
                    }}
                  />
                </MockApolloProvider>
              </MembershipContext.Provider>
            </MockKeyringProvider>
          </ModalContext.Provider>
        </ApiContext.Provider>
      </MemoryRouter>
    )
  }
})
