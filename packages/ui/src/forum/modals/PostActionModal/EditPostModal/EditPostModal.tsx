import React, { useEffect } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { WaitModal } from '@/common/components/WaitModal'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { defaultTransactionModalMachine } from '@/common/model/machines/defaultTransactionModalMachine'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { PostActionSignModal } from '../PostActionSignModal'

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
  const { allAccounts } = useMyAccounts()

  const { feeInfo } = useTransactionFee(active?.controllerAccount, () => transaction)

  const hideModalWithAction = (isSuccess?: boolean) => {
    if (isSuccess) {
      onSuccess(postText)
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

  if (state.matches('requirementsVerification')) {
    return <WaitModal onClose={hideModalWithAction} requirementsCheck />
  }

  if (state.matches('transaction') && transaction) {
    const service = state.children.transaction
    const controllerAccount = accountOrNamed(allAccounts, postAuthor.controllerAccount, 'Controller Account')
    return (
      <PostActionSignModal
        onClose={() => hideModalWithAction()}
        transaction={transaction}
        service={service}
        controllerAccount={controllerAccount}
        action="edit"
        author={postAuthor}
        newText={postText}
        replyTo={replyTo}
      />
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
