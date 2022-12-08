import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { ApiContext } from '@/api/providers/context'
import { CKEditorProps } from '@/common/components/CKEditor'
import { ModalContext } from '@/common/providers/modal/context'
import { isModalWithData } from '@/common/providers/modal/provider'
import { UseModal } from '@/common/providers/modal/types'
import { PostEditor } from '@/forum/components/PostList/PostEditor'
import { ForumPost } from '@/forum/types'
import { forumPostMock } from '@/mocks/data/commonMocks'

import { getButton } from '../../_helpers/getButton'
import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { stubApi } from '../../_mocks/transactions'

jest.mock('@/common/components/CKEditor', () => ({
  BaseCKEditor: (props: CKEditorProps) => mockCKEditor(props),
}))

const post: ForumPost = {
  ...forumPostMock,
  id: '1:1',
  createdAt: new Date().toISOString(),
  author: getMember('alice'),
  text: 'This is the original text',
  status: 'PostStatusActive',
}

let useModal: UseModal<any>

describe('UI: PostEditor', () => {
  const api = stubApi()

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
  })

  it("Disables the save button if text hasn't changed", async () => {
    renderEditor()
    const editor = await screen.findByRole('textbox')
    fireEvent.change(editor, { target: { value: 'This is the original text' } })
    expect(await getButton('Save')).toBeDisabled()
  })

  const renderEditor = () =>
    render(
      <ModalContext.Provider value={useModal}>
        <MockQueryNodeProviders>
          <MockKeyringProvider>
            <ApiContext.Provider value={api}>
              <PostEditor post={post} onCancel={() => null} onSuccessfulEdit={() => true} type="forum" />
            </ApiContext.Provider>
          </MockKeyringProvider>
        </MockQueryNodeProviders>
      </ModalContext.Provider>
    )
})
