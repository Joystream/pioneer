import { act, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { CKEditorProps } from '@/common/components/CKEditor'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { isModalWithData } from '@/common/providers/modal/provider'
import { UseModal } from '@/common/providers/modal/types'
import { NewPostProps, NewThreadPost } from '@/forum/components/Thread/NewThreadPost'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'

import { getButton } from '../../_helpers/getButton'
import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider } from '../../_mocks/providers'
import { stubApi } from '../../_mocks/transactions'

jest.mock('@/common/components/CKEditor', () => ({
  CKEditor: (props: CKEditorProps) => mockCKEditor(props),
}))

describe('UI: Add new post', () => {
  const api = stubApi()

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

  describe('In a forum thread', () => {
    const props: NewPostProps = { type: 'forum', thread: { id: '1', categoryId: '1', title: 'thread' } }

    it('Hides editor if no membership is selected', async () => {
      renderEditor(props)
      expect(await screen.findByText('Pick an active membership to post in this thread')).toBeDefined()
    })

    it('Disables the post button if text is empty', async () => {
      useMyMemberships.setActive(getMember('alice'))
      renderEditor(props)
      expect(await getButton('Post a reply')).toBeDisabled()
    })

    it('Opens the modal', async () => {
      useMyMemberships.setActive(getMember('alice'))
      renderEditor(props)
      const editor = await screen.findByRole('textbox')
      act(() => {
        fireEvent.change(editor, { target: { value: 'I disagree' } })
      })
      const button = await getButton('Post a reply')
      act(() => {
        fireEvent.click(button)
      })
      expect(useModal.modal).toEqual('CreatePost')
      expect(useModal.modalData).toEqual({
        postText: 'I disagree',
        thread: { id: '1', categoryId: '1', title: 'thread' },
        isEditable: false,
      })
    })
  })

  describe('In post discussion', () => {
    it('Inactive for non-whitelisted members', async () => {
      useMyMemberships.setActive(getMember('alice'))
      const props: NewPostProps = {
        type: 'proposalDiscussion',
        thread: {
          id: '1',
          mode: 'closed',
          whitelistIds: ['12'],
        },
      }
      renderEditor(props)
      expect(
        await screen.findByText('The discussion of this proposal is closed; only select members can comment on it.')
      ).toBeDefined()
    })

    it('Active for whitelisted members', async () => {
      useMyMemberships.setActive(getMember('alice'))
      const props: NewPostProps = {
        type: 'proposalDiscussion',
        thread: {
          id: '1',
          mode: 'closed',
          whitelistIds: ['111', '0'],
        },
      }
      renderEditor(props)
      expect(
        screen.queryByText('The discussion of this proposal is closed; only select members can comment on it.')
      ).toBeNull()
      expect(await getButton('Post a reply')).toBeDefined()
    })

    it('Opens the modal', async () => {
      useMyMemberships.setActive(getMember('alice'))
      const props: NewPostProps = {
        type: 'proposalDiscussion',
        thread: {
          id: '1',
          mode: 'open',
        },
      }
      renderEditor(props)
      const editor = await screen.findByRole('textbox')
      act(() => {
        fireEvent.change(editor, { target: { value: 'I disagree' } })
      })
      const button = await getButton('Post a reply')
      act(() => {
        fireEvent.click(button)
      })
      expect(useModal.modal).toEqual('CreateProposalDiscussionPost')
      expect(useModal.modalData).toEqual({
        postText: 'I disagree',
        threadId: '1',
        isEditable: false,
      })
    })
  })

  const renderEditor = (props: NewPostProps) =>
    render(
      <ModalContext.Provider value={useModal}>
        <MockKeyringProvider>
          <MembershipContext.Provider value={useMyMemberships}>
            <ApiContext.Provider value={api}>
              <NewThreadPost {...props} />
            </ApiContext.Provider>
          </MembershipContext.Provider>
        </MockKeyringProvider>
      </ModalContext.Provider>
    )
})
