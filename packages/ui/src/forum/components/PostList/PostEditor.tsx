import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { CKEditor } from '@/common/components/CKEditor'
import { useModal } from '@/common/hooks/useModal'
import { EditPostModalCall } from '@/forum/modals/PostActionModal/EditPostModal'
import { ForumPost } from '@/forum/types'

interface Props {
  post: ForumPost
  onCancel: () => void
}

export const PostEditor = ({ post, onCancel }: Props) => {
  const [newText, setNewText] = useState(post.text)
  const { showModal } = useModal()
  const isTextChanged = useMemo(() => post.text !== newText, [newText])

  return (
    <EditorWrap>
      <EditorMemo setNewText={setNewText} initialText={post.text} />
      <ButtonsGroup>
        <ButtonGhost size="medium" onClick={onCancel}>
          Cancel
        </ButtonGhost>
        <ButtonPrimary
          size="medium"
          onClick={() => showModal<EditPostModalCall>({ modal: 'EditPost', data: { newText, post } })}
          disabled={!isTextChanged}
        >
          Save
        </ButtonPrimary>
      </ButtonsGroup>
    </EditorWrap>
  )
}

interface MemoEditorProps {
  setNewText: (t: string) => void
  initialText: string
}

const EditorMemo = React.memo(({ setNewText, initialText }: MemoEditorProps) => (
  <CKEditor
    inline
    id="editor"
    onChange={(_, editor) => setNewText(editor.getData())}
    onReady={(editor) => {
      editor.setData(initialText)
      editor.editing.view.focus()
    }}
  />
))

export const EditorWrap = styled.div`
  display: flex;
  flex-direction: column;
`
