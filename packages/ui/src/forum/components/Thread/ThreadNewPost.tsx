import React, { useState } from 'react'

import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { CKEditor } from '@/common/components/CKEditor'
import { InputComponent } from '@/common/components/forms'
import { TextBig } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { CreatePostModalCall } from '@/forum/modals/PostActionModal/CreatePostModal'
import { ForumThread } from '@/forum/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { EditorWrap } from '../PostList/PostEditor'

interface NewPostProps {
  thread: ForumThread
}

export const NewThreadPost = ({ thread }: NewPostProps) => {
  const [postText, setText] = useState('')
  const { active } = useMyMemberships()
  const { showModal } = useModal()

  if (!active) {
    return <TextBig>Pick an active membership to post in this thread</TextBig>
  }

  return (
    <EditorWrap>
      <InputComponent inputSize="auto">
        <EditorMemo setNewText={setText} />
      </InputComponent>
      <ButtonsGroup>
        <ButtonPrimary
          size="medium"
          onClick={() => showModal<CreatePostModalCall>({ modal: 'CreatePost', data: { postText, thread } })}
          disabled={postText === ''}
        >
          Post a reply
        </ButtonPrimary>
      </ButtonsGroup>
    </EditorWrap>
  )
}

interface MemoEditorProps {
  setNewText: (t: string) => void
}

const EditorMemo = React.memo(({ setNewText }: MemoEditorProps) => (
  <CKEditor
    id="newPostEditor"
    onChange={(_, editor) => setNewText(editor.getData())}
    onReady={(editor) => editor.setData('')}
  />
))
