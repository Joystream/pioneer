import { createType } from '@joystream/types'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import { ButtonGhost, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { CKEditor } from '@/common/components/CKEditor'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { PostListItemType } from '@/forum/components/PostList/PostListItem'
import { useForumPostParents } from '@/forum/hooks/useForumPostParents'
import { EditPostModalCall } from '@/forum/modals/PostActionModal/EditPostModal'
import { ForumPost } from '@/forum/types'
import { useProposalPostParents } from '@/proposals/hooks/useProposalPostParents'

interface Props {
  post: ForumPost
  onCancel: () => void
  type: PostListItemType
}

export const PostEditor = ({ post, onCancel, type }: Props) => {
  const { api, connectionState } = useApi()
  const [newText, setNewText] = useState(post.text)
  const { showModal } = useModal()
  const isTextChanged = useMemo(() => post.text !== newText, [newText])

  const forumPostData = useForumPostParents(type === 'forum' ? post.id : '')
  const proposalPostData = useProposalPostParents(type === 'proposal' ? post.id : '')

  const editPostTransaction = useMemo(() => {
    if (api && connectionState === 'connected') {
      if (type === 'forum' && forumPostData.categoryId && forumPostData.threadId) {
        return api.tx.forum.editPostText(
          createType('ForumUserId', Number.parseInt(post.author.id)),
          forumPostData.categoryId,
          forumPostData.threadId,
          post.id,
          newText
        )
      }
      if (type === 'proposal' && proposalPostData.threadId) {
        return api.tx.proposalsDiscussion.updatePost(post.id, proposalPostData.threadId, newText)
      }
    }
  }, [api, connectionState, JSON.stringify(forumPostData), JSON.stringify(proposalPostData), type])

  return (
    <EditorWrap>
      <EditorMemo setNewText={setNewText} initialText={post.text} />
      <ButtonsGroup>
        <ButtonGhost size="medium" onClick={onCancel}>
          Cancel
        </ButtonGhost>
        <ButtonPrimary
          size="medium"
          onClick={() =>
            showModal<EditPostModalCall>({
              modal: 'EditPost',
              data: { post, transaction: editPostTransaction },
            })
          }
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

const EditorWrap = styled.div`
  display: flex;
  flex-direction: column;
`
