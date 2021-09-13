import { ForumPostMetadata } from '@joystream/metadata-protobuf'
import { createType } from '@joystream/types'
import React, { useState } from 'react'

import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { CKEditor } from '@/common/components/CKEditor'
import { Checkbox, InputComponent } from '@/common/components/forms'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextBig } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { metadataToBytes } from '@/common/model/JoystreamNode'
import { CreatePostModalCall } from '@/forum/modals/PostActionModal/CreatePostModal'
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
  const { api } = useApi()

  const getTransaction = () => {
    if (api && active && props.thread) {
      if (props.type === 'forum') {
        const { categoryId, id: threadId } = props.thread
        return api.tx.forum.addPost(
          createType('ForumUserId', Number.parseInt(active.id)),
          categoryId,
          threadId,
          metadataToBytes(ForumPostMetadata, { text: postText }),
          isEditable
        )
      } else {
        return api.tx.proposalsDiscussion.addPost(
          createType('MemberId', Number.parseInt(active.id)),
          props.thread.id,
          metadataToBytes(ForumPostMetadata, { text: postText }),
          isEditable
        )
      }
    }
  }

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
          onClick={() => {
            const transaction = getTransaction()
            transaction &&
              showModal<CreatePostModalCall>({
                modal: 'CreatePost',
                data: { postText, transaction, isEditable },
              })
          }}
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
