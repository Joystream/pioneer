import React, { useState } from 'react'

import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { CKEditor } from '@/common/components/CKEditor'
import { Checkbox, InputComponent } from '@/common/components/forms'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextBig } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { CreatePostModalCall } from '@/forum/modals/PostActionModal/CreatePostModal'
import { ForumPost, ForumThread } from '@/forum/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

interface NewPostProps {
  thread: Pick<ForumThread, 'id' | 'categoryId' | 'title'>
  replyTo?: ForumPost
}

export const NewThreadPost = ({ thread }: NewPostProps) => {
  const [postText, setText] = useState('')
  const [isEditable, setEditable] = useState(false)
  const { active } = useMyMemberships()
  const { showModal } = useModal()

  if (!active) {
    return <TextBig>Pick an active membership to post in this thread</TextBig>
  }

  return (
    <RowGapBlock gap={8}>
      <InputComponent inputSize="auto">
        <EditorMemo setNewText={setText} />
      </InputComponent>
      <ButtonsGroup>
        <ButtonPrimary
          size="medium"
          onClick={() =>
            showModal<CreatePostModalCall>({ modal: 'CreatePost', data: { postText, thread, isEditable } })
          }
          disabled={postText === ''}
        >
          Post a reply
        </ButtonPrimary>
        <Checkbox id="set-editable" onChange={setEditable} isChecked={isEditable}>
          Keep editable
        </Checkbox>
      </ButtonsGroup>
    </RowGapBlock>
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
