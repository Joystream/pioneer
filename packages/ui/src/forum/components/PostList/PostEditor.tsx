import React, { useState } from 'react'
import styled from 'styled-components'

import { ButtonGhost, ButtonPrimary, ButtonsRow } from '@/common/components/buttons'
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

  return (
    <EditorWrap>
      <EditorMemo setNewText={setNewText} initialText={post.text} />
      <ButtonsRow>
        <ButtonGhost size="medium" onClick={onCancel}>
          Cancel
        </ButtonGhost>
        <ButtonPrimary
          size="medium"
          onClick={() => showModal<EditPostModalCall>({ modal: 'EditPost', data: { newText, post } })}
        >
          Save
        </ButtonPrimary>
      </ButtonsRow>
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
    onReady={(editor) => editor.setData(initialText)}
  />
))

const EditorWrap = styled.div`
  display: flex;
  flex-direction: column;
`
