import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { CKEditor } from '@/common/components/CKEditor'
import { Checkbox, InputComponent } from '@/common/components/forms'
import { ArrowReplyIcon, CrossIcon } from '@/common/components/icons'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Badge, TextBig } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { Reply, ReplyBadge } from '@/forum/components/PostList/PostListItem'
import { CreatePostModalCall } from '@/forum/modals/PostActionModal/CreatePostModal'
import { ForumPost, ForumThread } from '@/forum/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

type GetTransaction = (
  postText: string,
  isEditable: boolean
) => SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined

interface NewPostProps {
  getTransaction: GetTransaction
  replyTo?: ForumPost
  removeReply: () => void
}

export const NewThreadPost = ({ getTransaction, replyTo, removeReply }: NewPostProps) => {
  const [postText, setText] = useState('')
  const [isEditable, setEditable] = useState(false)
  const { active } = useMyMemberships()
  const { showModal } = useModal()

  if (!active) {
    return <TextBig>Pick an active membership to post in this thread</TextBig>
  }

  return (
    <RowGapBlock gap={8}>
      {replyTo && (
        <Reply>
          <ReplyBadge>
            <ButtonsGroup align="left">
              <ArrowReplyIcon />{' '}
              <Badge>
                <Link to={window.location.href}>Replies to {replyTo.author.handle}</Link>
              </Badge>
            </ButtonsGroup>
            <ButtonsGroup align="right">
              <ButtonPrimary size="small" onClick={removeReply}>
                <CrossIcon />
              </ButtonPrimary>
            </ButtonsGroup>
          </ReplyBadge>
          <MarkdownPreview markdown={replyTo.text} size="s" isReply />
        </Reply>
      )}
      <InputComponent inputSize="auto">
        <EditorMemo setNewText={setText} />
      </InputComponent>
      <ButtonsGroup>
        <ButtonPrimary
          size="medium"
          onClick={() => {
            const transaction = getTransaction(postText, isEditable)
            transaction &&
            showModal<CreatePostModalCall>({
              modal: 'CreatePost',
              data: { postText, replyTo, transaction, isEditable },
            })
          }}
          disabled={postText === ''}
        >
          {replyTo ? 'Post a reply' : 'Create post'}
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
