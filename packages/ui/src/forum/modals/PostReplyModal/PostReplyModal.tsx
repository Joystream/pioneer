import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'

import { useBalance } from '@/accounts/hooks/useBalance'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { useApi } from '@/api/hooks/useApi'
import { CKEditor } from '@/common/components/CKEditor'
import { Checkbox, InputComponent } from '@/common/components/forms'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import { Modal, ModalBody, ModalHeader, ModalTransactionFooter } from '@/common/components/Modal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { getFeeSpendableBalance } from '@/common/providers/transactionFees/provider'
import { PreviewPostButton } from '@/forum/components/PreviewPostButton'
import { PostInsufficientFundsModal } from '@/forum/modals/PostActionModal/components/PostInsufficientFundsModal'
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
  const balance = useBalance(active?.controllerAccount)

  const { replyTo, module = 'forum' } = modalData
  const postDeposit = api?.consts[module].postDeposit.toBn()
  const transaction = useMemo(() => {
    if (api && active) {
      return transactionFactory(api, module, state.context.postText, state.context.isEditable, replyTo, active.id)
    }
  }, [api?.isConnected, state.context.postText, state.context.isEditable])
  const { feeInfo } = useTransactionFee(active?.controllerAccount, () => transaction)
  const requiredAmount = useMemo(
    () => feeInfo && api && feeInfo.transactionFee.add(postDeposit ?? BN_ZERO),
    [feeInfo, postDeposit]
  )

  useEffect(() => {
    if (!(feeInfo && requiredAmount && active && balance)) {
      return
    }

    if (state.matches(PostReplyStateName.requirementsVerification)) {
      if (state.context.isEditable ? getFeeSpendableBalance(balance).gte(requiredAmount) : feeInfo.canAfford) {
        send('NEXT')
      } else {
        send('FAIL')
      }
    }
  }, [state.value, JSON.stringify(feeInfo), postDeposit, balance])

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

  if (state.matches(PostReplyStateName.transaction) && transaction && active && postDeposit) {
    return (
      <SignTransactionModal
        buttonText="Sign and post"
        transaction={transaction}
        signer={active.controllerAccount}
        service={state.children.transaction}
        additionalTransactionInfo={
          state.context.isEditable
            ? [
                {
                  value: postDeposit,
                  title: 'Post deposit:',
                },
              ]
            : undefined
        }
        extraButtons={<PreviewPostButton author={active} postText={state.context.postText} replyTo={replyTo} />}
      >
        <TextMedium>You intend to post in a thread.</TextMedium>
        {state.context.isEditable && (
          <TextMedium>
            <TokenValue value={postDeposit} /> will be deposited to make the post editable.
          </TextMedium>
        )}
      </SignTransactionModal>
    )
  }

  if (state.matches(PostReplyStateName.requirementsFailed) && feeInfo && requiredAmount && active) {
    return <PostInsufficientFundsModal postDeposit={postDeposit} feeInfo={feeInfo} requiredAmount={requiredAmount} />
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
