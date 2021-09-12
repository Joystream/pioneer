import React, { useState } from 'react'

import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { CKEditor } from '@/common/components/CKEditor'
import { Checkbox, InputComponent } from '@/common/components/forms'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextBig } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { CreatePostModalCall } from '@/forum/modals/PostActionModal/CreatePostModal'
import { CreateProposalDiscussionPostModalCall } from '@/forum/modals/PostActionModal/CreateProposalDiscussionPostModal'
import { ForumThread } from '@/forum/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { ProposalDiscussionThread } from '@/proposals/types'

export type NewPostProps =
  | {
      type: 'forum'
      thread: Pick<ForumThread, 'id' | 'categoryId' | 'title'>
    }
  | {
      type: 'proposalDiscussion'
      thread: Pick<ProposalDiscussionThread, 'id' | 'mode' | 'whitelistIds'>
    }

export const NewThreadPost = (props: NewPostProps) => {
  const [postText, setText] = useState('')
  const [isEditable, setEditable] = useState(false)
  const { active } = useMyMemberships()
  const { showModal } = useModal()

  if (!active) {
    return <TextBig>Pick an active membership to post in this thread</TextBig>
  }

  if (
    props.type === 'proposalDiscussion' &&
    props.thread.mode === 'closed' &&
    !props.thread.whitelistIds?.includes(active.id)
  ) {
    return <TextBig>The discussion of this proposal is closed; only select members can comment on it.</TextBig>
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
            props.type === 'forum'
              ? showModal<CreatePostModalCall>({
                  modal: 'CreatePost',
                  data: { postText, thread: props.thread, isEditable },
                })
              : showModal<CreateProposalDiscussionPostModalCall>({
                  modal: 'CreateProposalDiscussionPost',
                  data: { postText, threadId: props.thread.id, isEditable },
                })
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
