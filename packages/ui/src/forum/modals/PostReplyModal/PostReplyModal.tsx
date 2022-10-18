import React from 'react'
import styled from 'styled-components'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { useApi } from '@/api/hooks/useApi'
import { CKEditor } from '@/common/components/CKEditor'
import { Checkbox, InputComponent } from '@/common/components/forms'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { Modal, ModalBody, ModalHeader, ModalTransactionFooter } from '@/common/components/Modal'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { PreviewPostButton } from '@/forum/components/PreviewPostButton'
import { CreatePostSignModal } from '@/forum/modals/PostActionModal/CreatePostModal/CreatePostSignModal'
import { transactionFactory } from '@/forum/modals/PostReplyModal/helpers'
import { PostReplyModalCall } from '@/forum/modals/PostReplyModal/index'
import { postReplyMachine, PostReplyStateName } from '@/forum/modals/PostReplyModal/machine'
import { MemberInfo } from '@/memberships/components'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { Member } from '@/memberships/types'

export const PostReplyModal = () => {
  const { modalData, hideModal } = useModal<PostReplyModalCall>()
  const [state, send] = useMachine(postReplyMachine)
  const { active } = useMyMemberships()
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()

  const { replyTo, module = 'forum' } = modalData
  const postDeposit = api?.consts[module].postDeposit.toBn()

  if (state.matches(PostReplyStateName.prepare))
    return (
      <Modal onClose={hideModal} modalSize="l">
        <ModalHeader title="Reply" onClick={hideModal} />
        <ModalBody>
          <MainContainer>
            <MemberInfo member={replyTo.author} />
            <MarkdownPreview markdown={replyTo.text} size="m" />
            <InputComponent label="Description" required inputSize="auto">
              <CKEditor
                id="post-reply-editor"
                minRows={10}
                onChange={(_, event) => send({ type: 'SET_TEXT', payload: event.getData() })}
              />
            </InputComponent>
          </MainContainer>
        </ModalBody>
        <ModalTransactionFooter
          extraLeftButtons={
            <Checkbox
              id="set-editable"
              onChange={(payload) => send({ type: 'SET_EDITABLE', payload })}
              isChecked={state.context.isEditable}
            >
              Keep editable
            </Checkbox>
          }
          extraButtons={
            <PreviewPostButton author={active as Member} postText={state.context.postText} replyTo={replyTo} />
          }
          next={{ onClick: () => send('NEXT'), disabled: !state.context.postText, label: 'Post a Reply' }}
        />
      </Modal>
    )

  if (state.matches('transaction') && active && postDeposit && api) {
    const service = state.children.transaction
    const controllerAccount = accountOrNamed(allAccounts, active.controllerAccount, 'Controller Account')
    const transaction = transactionFactory(
      api,
      module,
      state.context.postText,
      state.context.isEditable,
      replyTo,
      active.id
    )
    return (
      <CreatePostSignModal
        transaction={transaction}
        service={service}
        controllerAccount={controllerAccount}
        author={active}
        postText={state.context.postText}
        replyTo={replyTo}
        isEditable={state.context.isEditable}
        postDeposit={postDeposit}
      />
    )
  }

  return null
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  :last-child {
    flex: 1;
    margin-top: 10px;
  }
`
