import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import React, { Ref, RefObject, useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { CKEditor } from '@/common/components/CKEditor'
import { Checkbox, InputComponent } from '@/common/components/forms'
import { ArrowReplyIcon, CrossIcon } from '@/common/components/icons'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Badge, TextBig } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { Reply, ReplyBadge } from '@/forum/components/PostList/PostListItem'
import { CreatePostModalCall } from '@/forum/modals/PostActionModal/CreatePostModal'
import { ForumPost } from '@/forum/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

type GetTransaction = (
  postText: string,
  isEditable: boolean
) => SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined

export interface NewPostProps {
  getTransaction: GetTransaction
  replyTo?: ForumPost
  removeReply: () => void
  replyToLink: string
}

export const NewThreadPost = React.forwardRef(
  ({ getTransaction, replyTo, removeReply, replyToLink }: NewPostProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const [postText, setText] = useState('')
    const [isEditable, setEditable] = useState(false)
    const { active } = useMyMemberships()
    const { showModal } = useModal()
    const [editorRef, setEditorRef] = useState<RefObject<HTMLDivElement>>(useRef<HTMLDivElement>(null))

    const onSuccess = useCallback(async () => {
      setText('')
      setEditorRef({ ...editorRef })
      setEditable(false)
    }, [])

    if (!active) {
      return <TextBig ref={ref}>Pick an active membership to post in this thread</TextBig>
    }

    return (
      <RowGapBlock gap={8} ref={ref}>
        {replyTo && (
          <Reply>
            <ReplyBadge>
              <div>
                <ArrowReplyIcon />{' '}
                <Badge>
                  <Link to={replyToLink}>Replies to {replyTo.author.handle}</Link>
                </Badge>
              </div>
              <div>
                <ButtonPrimary size="small" square onClick={removeReply}>
                  <CrossIcon />
                </ButtonPrimary>
              </div>
            </ReplyBadge>
            <MarkdownPreview markdown={replyTo.text} size="s" isReply />
          </Reply>
        )}
        <InputComponent
          inputSize="auto"
          message={postText === '' ? 'This field cannot be empty. Type your message here' : undefined}
        >
          <EditorMemo setNewText={setText} editorRef={editorRef} />
        </InputComponent>
        <ButtonsGroup>
          <TransactionButton
            style="primary"
            size="medium"
            onClick={() => {
              const transaction = getTransaction(postText, isEditable)
              transaction &&
                showModal<CreatePostModalCall>({
                  modal: 'CreatePost',
                  data: { module: 'proposalsDiscussion', postText, replyTo, transaction, isEditable, onSuccess },
                })
            }}
            disabled={postText === ''}
          >
            {replyTo ? 'Post a reply' : 'Create post'}
          </TransactionButton>
          <Checkbox id="set-editable" onChange={setEditable} isChecked={isEditable}>
            Keep editable
          </Checkbox>
        </ButtonsGroup>
      </RowGapBlock>
    )
  }
)

interface MemoEditorProps {
  setNewText: (t: string) => void
  editorRef: Ref<HTMLDivElement>
}

const EditorMemo = React.memo(({ setNewText, editorRef }: MemoEditorProps) => (
  <CKEditor
    id="newPostEditor"
    ref={editorRef}
    onChange={(_, editor) => setNewText(editor.getData())}
    onReady={(editor) => editor.setData('')}
    onFocus={() => undefined}
  />
))
