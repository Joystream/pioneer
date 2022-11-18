import React, { MutableRefObject, Ref, useCallback, useMemo, useRef, useState } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { BaseCKEditor } from '@/common/components/CKEditor'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { useModal } from '@/common/hooks/useModal'
import { createType } from '@/common/model/createType'
import { PostListItemType } from '@/forum/components/PostList/PostListItem'
import { useForumPostParents } from '@/forum/hooks/useForumPostParents'
import { EditPostModalCall } from '@/forum/modals/PostActionModal/EditPostModal'
import { ForumPost } from '@/forum/types'
import { useProposalPostParents } from '@/proposals/hooks/useProposalPostParents'

interface Props {
  post: ForumPost
  onCancel: () => void
  type: PostListItemType
  onSuccessfulEdit: () => void
}

export const PostEditor = ({ post, onCancel, type, onSuccessfulEdit }: Props) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const { api, connectionState } = useApi()
  const [newText, setNewText] = useState(post.text)
  const { showModal } = useModal()
  const isTextChanged = useMemo(() => post.text !== newText, [newText])

  const forumPostData = useForumPostParents(type === 'forum' ? post.id : '')
  const proposalPostData = useProposalPostParents(type === 'proposal' ? post.id : '')

  const getEditPostTransaction = useCallback(
    (text: string) => {
      if (api && connectionState === 'connected') {
        if (type === 'forum' && forumPostData.categoryId && forumPostData.threadId) {
          return api.tx.forum.editPostText(
            createType('ForumUserId', Number.parseInt(post.author.id)),
            forumPostData.categoryId,
            forumPostData.threadId,
            post.id,
            text
          )
        }
        if (type === 'proposal' && proposalPostData.threadId) {
          return api.tx.proposalsDiscussion.updatePost(proposalPostData.threadId, post.id, text)
        }
      }
    },
    [api, connectionState, JSON.stringify(forumPostData), JSON.stringify(proposalPostData), type]
  )

  const onFailedEdit = useCallback(() => {
    editorRef.current?.focus()
  }, [])

  return (
    <RowGapBlock gap={8}>
      <EditorMemo
        setNewText={setNewText}
        initialText={post.text}
        editorRef={editorRef as MutableRefObject<HTMLDivElement>}
      />
      <ButtonsGroup>
        <ButtonGhost size="medium" onClick={onCancel}>
          Cancel
        </ButtonGhost>
        <ButtonPrimary
          size="medium"
          onClick={() => {
            showModal<EditPostModalCall>({
              modal: 'EditPost',
              data: {
                postAuthor: post.author,
                postText: newText,
                replyTo: post.repliesTo,
                transaction: getEditPostTransaction(newText),
                onSuccess: onSuccessfulEdit,
                onFail: onFailedEdit,
              },
            })
            onCancel()
          }}
          disabled={!isTextChanged}
        >
          Save
        </ButtonPrimary>
      </ButtonsGroup>
    </RowGapBlock>
  )
}

interface MemoEditorProps {
  setNewText: (t: string) => void
  initialText: string
  editorRef: Ref<HTMLDivElement>
}

const EditorMemo = React.memo(({ setNewText, initialText, editorRef }: MemoEditorProps) => (
  <BaseCKEditor
    ref={editorRef}
    inline
    id="editor"
    onChange={(_, editor) => setNewText(editor.getData())}
    onReady={(editor) => {
      editor.setData(initialText)
      editor.editing.view.focus()
    }}
  />
))
