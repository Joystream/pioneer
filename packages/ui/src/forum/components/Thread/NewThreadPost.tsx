import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import React, { Ref, RefObject, useCallback, useRef, useState } from 'react'

import { ButtonsGroup } from '@/common/components/buttons'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { BaseCKEditor } from '@/common/components/CKEditor'
import { Checkbox, InputComponent } from '@/common/components/forms'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextBig } from '@/common/components/typography'
import { useModal } from '@/common/hooks/useModal'
import { CreatePostModalCall } from '@/forum/modals/PostActionModal/CreatePostModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

type GetTransaction = (
  postText: string,
  isEditable: boolean
) => SubmittableExtrinsic<'rxjs', ISubmittableResult> | undefined

export interface NewPostProps {
  getTransaction: GetTransaction
}

export const NewThreadPost = React.forwardRef(
  ({ getTransaction }: NewPostProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const [postText, setText] = useState('')
    const [isEditable, setEditable] = useState(true)
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
                  data: { module: 'proposalsDiscussion', postText, transaction, isEditable, onSuccess },
                })
            }}
            disabled={postText === ''}
          >
            Create post
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
  <BaseCKEditor
    id="newPostEditor"
    ref={editorRef}
    onChange={(_, editor) => setNewText(editor.getData())}
    onReady={(editor) => editor.setData('')}
    onFocus={() => undefined}
  />
))
