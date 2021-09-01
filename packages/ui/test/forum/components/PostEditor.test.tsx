import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { CKEditorProps } from '@/common/components/CKEditor'
import { ModalContext } from '@/common/providers/modal/context'
import { isModalWithData } from '@/common/providers/modal/provider'
import { UseModal } from '@/common/providers/modal/types'
import { PostEditor } from '@/forum/components/PostList/PostEditor'
import { ForumPost } from '@/forum/types'

import { getButton } from '../../_helpers/getButton'
import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { getMember } from '../../_mocks/members'

jest.mock('@/common/components/CKEditor', () => ({
  CKEditor: (props: CKEditorProps) => mockCKEditor(props),
}))

const post: ForumPost = {
  id: '1:1',
  createdAt: new Date().toISOString(),
  author: getMember('alice'),
  text: 'This is the original text',
}

let useModal: UseModal<any>

describe('UI: PostEditor', () => {
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

  it('Passes edit text to modal', async () => {
    renderEditor()
    const editor = await screen.findByRole('textbox')
    await fireEvent.change(editor, { target: { value: 'This is a new typed-in text' } })
    await fireEvent.click(await getButton('Save'))
    expect(useModal.modal).toEqual('EditPost')
    expect(useModal.modalData).toEqual({
      newText: 'This is a new typed-in text',
      post,
      type: 'forum',
    })
  })

  it("Disables the save button if text hasn't changed", async () => {
    renderEditor()
    const editor = await screen.findByRole('textbox')
    await fireEvent.change(editor, { target: { value: 'This is the original text' } })
    expect(await getButton('Save')).toBeDisabled()
  })

  const renderEditor = () =>
    render(
      <ModalContext.Provider value={useModal}>
        <PostEditor post={post} onCancel={() => null} type="forum" />
      </ModalContext.Provider>
    )
})
