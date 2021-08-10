import React, { useState } from 'react'
import styled from 'styled-components'

import { ButtonGhost, ButtonPrimary, ButtonsRow } from '@/common/components/buttons'
import { CKEditor } from '@/common/components/CKEditor'
import { ForumPost } from '@/forum/types'

interface Props {
  post: ForumPost
  onCancel: () => void
}

export const PostEditor = ({ post, onCancel }: Props) => {
  const [newText, setNewText] = useState<string>()

  return (
    <EditorWrap>
      <EditorMemo setNewText={setNewText} initialText={post.text} />
      <ButtonsRow>
        <ButtonGhost size="medium" onClick={onCancel}>
          Cancel
        </ButtonGhost>
        <ButtonPrimary size="medium">Save</ButtonPrimary>
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
