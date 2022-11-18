import React, { useEffect } from 'react'

import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { TextMedium } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { defaultTransactionModalMachine } from '@/common/model/machines/defaultTransactionModalMachine'
import { PreviewPostButton } from '@/forum/components/PreviewPostButton'
import { ForumPost } from '@/forum/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { Member } from '@/memberships/types'

import { EditPostModalCall } from '.'

export const EditPostModal = () => {
  const {
    modalData: { postAuthor, postText, replyTo, transaction, onSuccess, onFail },
    hideModal,
  } = useModal<EditPostModalCall>()

  const [state, send] = useMachine(
    defaultTransactionModalMachine(
      'There was a problem submitting an edit to your post.',
      'Your edit has been submitted.'
    ),
    { context: { validateBeforeTransaction: true } }
  )

  const { active } = useMyMemberships()

  const { feeInfo } = useTransactionFee(active?.controllerAccount, () => transaction)

  const hideModalWithAction = (isSuccess?: boolean) => {
    if (isSuccess) {
      onSuccess()
    } else {
      onFail()
    }

    hideModal()
  }

  useEffect(() => {
    if (state.matches('requirementsVerification')) {
      if (feeInfo && active) {
        feeInfo.canAfford && send('PASS')
        !feeInfo.canAfford && send('FAIL')
      }
    }

    if (state.matches('beforeTransaction')) {
      send(feeInfo?.canAfford ? 'PASS' : 'FAIL')
    }
  }, [state.value, JSON.stringify(feeInfo)])

  if (state.matches('transaction') && transaction) {
    return (
      <SignTransactionModal
        buttonText="Sign and edit"
        transaction={transaction}
        signer={postAuthor.controllerAccount}
        service={state.children.transaction}
        extraButtons={
          <PreviewPostButton
            author={postAuthor as Member}
            postText={postText as string}
            replyTo={replyTo as ForumPost}
          />
        }
      >
        <TextMedium>You intend to edit your post.</TextMedium>
      </SignTransactionModal>
    )
  }

  if (state.matches('requirementsFailed') && active && feeInfo) {
    return (
      <InsufficientFundsModal
        onClose={() => hideModalWithAction()}
        address={active.controllerAccount}
        amount={feeInfo.transactionFee}
      />
    )
  }

  return null
}
