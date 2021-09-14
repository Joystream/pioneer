import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { CKEditorProps } from '@/common/components/CKEditor'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { isModalWithData } from '@/common/providers/modal/provider'
import { UseModal } from '@/common/providers/modal/types'
import { NewPostProps, NewThreadPost } from '@/forum/components/Thread/NewThreadPost'
import { ForumPost } from '@/forum/types'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'

import { getButton } from '../../_helpers/getButton'
import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider } from '../../_mocks/providers'
import { stubApi, stubTransaction } from '../../_mocks/transactions'

jest.mock('@/common/components/CKEditor', () => ({
  CKEditor: (props: CKEditorProps) => mockCKEditor(props),
}))

describe('UI: Add new post', () => {
  const ref = React.createRef<HTMLDivElement>()
  let replyTo: ForumPost | undefined

  const api = stubApi()
  stubTransaction(api, 'api.tx.forum.addPost')
  stubTransaction(api, 'api.tx.proposalsDiscussion.addPost')

  let useModal: UseModal<any>

  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [getMember('alice')],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
  }

  beforeEach(() => {
    useModal = {
      modal: null,
      modalData: undefined,
      hideModal: () => null,
      showModal: (call) => {
        useModal.modal = call.modal
        if (isModalWithData(call)) {
          useModal.modalData = call.data
        }
      },
    }
    useMyMemberships.active = undefined
  })

  const props: NewPostProps = {
    getTransaction: (text, isEditable) => api.api.tx.forum.addPost(1, 1, 1, text, isEditable),
    removeReply: () => true,
  }

  it('No selected membership', async () => {
    renderEditor(props)
    expect(await screen.findByText('Pick an active membership to post in this thread')).toBeDefined()
  })

  it('Empty post text', async () => {
    useMyMemberships.setActive(getMember('alice'))
    renderEditor(props)
    expect(await getButton('Create post')).toBeDisabled()
  })

  describe('Passes modal data', () => {
    it('Without reply', async () => {
      useMyMemberships.setActive(getMember('alice'))
      renderEditor(props)
      const editor = await screen.findByRole('textbox')
      act(() => {
        fireEvent.change(editor, { target: { value: 'I disagree' } })
      })
      await waitFor(async () => expect(await getButton('Create post')).not.toBeDisabled())
      await act(async () => {
        fireEvent.click(await getButton('Create post'))
      })
      expect(useModal.modal).toEqual('CreatePost')
      expect(useModal.modalData.postText).toEqual('I disagree')
      expect(useModal.modalData.isEditable).toEqual(false)
    })

    it('With reply', async () => {
      useMyMemberships.setActive(getMember('alice'))
      replyTo = {
        id: '1',
        author: getMember('bob'),
        text: 'Some text',
        status: 'PostStatusActive',
        createdAt: new Date().toISOString(),
      }
      renderEditor(props)
      const editor = await screen.findByRole('textbox')
      act(() => {
        fireEvent.change(editor, { target: { value: 'I disagree' } })
      })
      await waitFor(async () => expect(await getButton('Post a reply')).not.toBeDisabled())
      await act(async () => {
        fireEvent.click(await getButton('Post a reply'))
      })
      expect(useModal.modal).toEqual('CreatePost')
      expect(useModal.modalData).toEqual({
        postText: 'I disagree',
        replyTo,
        thread: { id: '1', categoryId: '1', title: 'thread' },
        isEditable: false,
      })
    })
  })

  it('Opens the modal', async () => {
    useMyMemberships.setActive(getMember('alice'))
    renderEditor(props)
    const editor = await screen.findByRole('textbox')
    act(() => {
      fireEvent.change(editor, { target: { value: 'I disagree' } })
    })
    await waitFor(async () => expect(await getButton('Post a reply')).not.toBeDisabled())
    act(async () => {
      fireEvent.click(await getButton('Post a reply'))
    })
    expect(useModal.modal).toEqual('CreatePost')
    expect(useModal.modalData).toEqual({
      postText: 'I disagree',
      thread: { id: '1', categoryId: '1', title: 'thread' },
      isEditable: false,
    })
  })

  const renderEditor = (props: NewPostProps) =>
    render(
      <MemoryRouter>
        <ModalContext.Provider value={useModal}>
          <MockKeyringProvider>
            <MembershipContext.Provider value={useMyMemberships}>
              <ApiContext.Provider value={api}>
                <NewThreadPost ref={ref} {...props} />
              </ApiContext.Provider>
            </MembershipContext.Provider>
          </MockKeyringProvider>
        </ModalContext.Provider>
      </MemoryRouter>
    )
})
