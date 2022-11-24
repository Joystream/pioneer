import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { ApiContext } from '@/api/providers/context'
import { CKEditorProps } from '@/common/components/CKEditor'
import { isModalWithData, ModalContextProvider } from '@/common/providers/modal/provider'
import { NewPostProps, NewThreadPost } from '@/forum/components/Thread/NewThreadPost'
import { ForumPost } from '@/forum/types'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'

import { getButton } from '../../_helpers/getButton'
import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider } from '../../_mocks/providers'
import { stubApi, stubTransaction } from '../../_mocks/transactions'
import { mockUseModalCall } from '../../setup'

jest.mock('@/common/components/CKEditor', () => ({
  BaseCKEditor: (props: CKEditorProps) => mockCKEditor(props),
}))

describe('UI: Add new post', () => {
  const ref = React.createRef<HTMLDivElement>()
  let replyTo: ForumPost | undefined

  const useModal = {
    modal: null,
    modalData: {} as any,
    hideModal: () => null,
    showModal: (call: any) => {
      useModal.modal = call.modal
      if (isModalWithData(call)) {
        useModal.modalData = call.data
      }
    },
  }

  const api = stubApi()
  stubTransaction(api, 'api.tx.forum.addPost')
  stubTransaction(api, 'api.tx.proposalsDiscussion.addPost')

  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [getMember('alice')],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }

  beforeEach(() => {
    useMyMemberships.active = undefined
    mockUseModalCall(useModal)
  })

  const props: NewPostProps = {
    getTransaction: (text, isEditable) => api.api.tx.forum.addPost(1, 1, 1, text, isEditable),
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
      expect(useModal.modalData.isEditable).toEqual(true)
      expect(useModal.modalData.replyTo).toEqual(replyTo)
    })
  })

  const renderEditor = (props: NewPostProps) => {
    render(
      <MemoryRouter>
        <ModalContextProvider>
          <MockKeyringProvider>
            <MembershipContext.Provider value={useMyMemberships}>
              <ApiContext.Provider value={api}>
                <NewThreadPost ref={ref} {...props} />
              </ApiContext.Provider>
            </MembershipContext.Provider>
          </MockKeyringProvider>
        </ModalContextProvider>
      </MemoryRouter>
    )
  }
})
