import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'
import { useMachine } from '@xstate/react'
import React, { Ref, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { useApi } from '@/api/hooks/useApi'
import { ButtonsGroup } from '@/common/components/buttons'
import { TransactionButton } from '@/common/components/buttons/TransactionButton'
import { BaseCKEditor } from '@/common/components/CKEditor'
import { FailureModal } from '@/common/components/FailureModal'
import { Checkbox, InputComponent } from '@/common/components/forms'
import { Modal, ModalBody, ModalHeader } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SuccessModal } from '@/common/components/SuccessModal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { WaitModal } from '@/common/components/WaitModal'
import { BN_ZERO } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { defaultTransactionModalMachine } from '@/common/model/machines/defaultTransactionModalMachine'
import { ForumPostAuthor, Reply, ReplyBadge } from '@/forum/components/PostList/PostListItem'
import { MemberInfo } from '@/memberships/components'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { CreatePostModalCall } from '.'
import { CreatePostSignModal } from './CreatePostSignModal'

export const CreatePostModal = () => {
  const [postText, setText] = useState('')
  const [isEditable, setEditable] = useState(true)
  const { t } = useTranslation('accounts')
  const { modalData, hideModal } = useModal<CreatePostModalCall>()
  const [transaction, setTransaction] = useState<SubmittableExtrinsic<'rxjs', ISubmittableResult>>()
  const { module = 'forum', getTransaction, replyTo } = modalData
  // const { module = 'forum', postText, replyTo, transaction, isEditable, onSuccess } = modalData

  const hideModalAfterSuccess = useCallback(() => {
    // onSuccess()
    hideModal()
  }, [])

  const [state, send] = useMachine(defaultTransactionModalMachine, { context: { validateBeforeTransaction: true } })

  const { active } = useMyMemberships()
  const { allAccounts } = useMyAccounts()
  const balance = useBalance(active?.controllerAccount)
  const { api } = useApi()

  const newPostRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  const postDeposit = api?.consts[module].postDeposit.toBn()
  const feeInfo = useTransactionFee(active?.controllerAccount, transaction)
  const requiredAmount = useMemo(
    () => feeInfo && api && feeInfo.transactionFee.add(postDeposit ?? BN_ZERO),
    [feeInfo, postDeposit]
  )

  useEffect(() => {
    if (!(feeInfo && requiredAmount && active && balance)) {
      return
    }

    if (state.matches('requirementsVerification')) {
      if (isEditable ? balance.transferable.gte(requiredAmount) : feeInfo.canAfford) {
        send('PASS')
      } else {
        send('FAIL')
      }
    }

    if (state.matches('beforeTransaction')) {
      if (isEditable ? balance.transferable.gte(requiredAmount) : feeInfo.canAfford) {
        send('PASS')
      } else {
        send('FAIL')
      }
    }
  }, [state.value, JSON.stringify(feeInfo), postDeposit, balance])

  if (state.matches('requirementsVerification')) {
    return <WaitModal onClose={hideModal} requirementsCheck />
  }

  if (state.matches('transaction') && transaction && active && postDeposit) {
    const service = state.children.transaction
    const controllerAccount = accountOrNamed(allAccounts, active.controllerAccount, 'Controller Account')
    return (
      <CreatePostSignModal
        transaction={transaction}
        service={service}
        controllerAccount={controllerAccount}
        author={active}
        postText={postText}
        replyTo={replyTo}
        isEditable={isEditable}
        postDeposit={postDeposit}
      />
    )
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        There was a problem posting your message.
      </FailureModal>
    )
  }

  if (state.matches('success')) {
    return <SuccessModal onClose={hideModalAfterSuccess} text="Your post has been submitted." />
  }

  if (state.matches('requirementsFailed') && feeInfo && requiredAmount && active) {
    return (
      <InsufficientFundsModal onClose={hideModal} address={active.controllerAccount} amount={requiredAmount}>
        <TextMedium margin="s">
          {t('modals.insufficientFunds.feeInfo1')}
          {feeInfo.transactionFee.gtn(0) && (
            <>
              <TokenValue value={feeInfo.transactionFee} />
              {t('modals.insufficientFunds.feeInfo2')}
            </>
          )}
          {postDeposit?.gtn(0) && (
            <>
              {feeInfo.transactionFee.gtn(0) && <> and</>} <TokenValue value={postDeposit} /> available to deposit to
              make the post editable
            </>
          )}
        </TextMedium>
      </InsufficientFundsModal>
    )
  }

  const createPostHandle = () => {
    const tx = getTransaction(postText, isEditable)
    setTransaction(tx)
  }

  return (
    <Modal onClose={hideModal} modalSize="m">
      <ModalHeader onClick={hideModal} title={replyTo ? 'Reply' : 'Create Post'} />
      <ModalBody>
        <RowGapBlock gap={8} ref={newPostRef}>
          {replyTo && (
            <Reply>
              <ForumPostAuthor>{replyTo?.author && <MemberInfo size="s" member={replyTo?.author} />}</ForumPostAuthor>
              <TextMedium light italic>
                {replyTo?.text}
              </TextMedium>
              {/* <MarkdownPreview markdown={replyTo.text} size="s" isReply /> */}
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
              onClick={() => createPostHandle()}
              disabled={postText === ''}
            >
              {replyTo ? 'Post a reply' : 'Create post'}
            </TransactionButton>
            <Checkbox id="set-editable" onChange={setEditable} isChecked={isEditable}>
              Keep editable
            </Checkbox>
          </ButtonsGroup>
        </RowGapBlock>
      </ModalBody>
    </Modal>
  )
}

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
