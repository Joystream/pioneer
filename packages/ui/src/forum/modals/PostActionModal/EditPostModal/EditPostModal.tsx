import { useMachine } from '@xstate/react'
import React, { useEffect } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { FailureModal } from '@/common/components/FailureModal'
import { WaitModal } from '@/common/components/WaitModal'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { postActionMachine } from '../postActionMachine'
import { PostActionSignModal } from '../PostActionSignModal'
import { PostActionSuccessModal } from '../PostActionSuccessModal'

import { EditPostModalCall } from '.'

export const EditPostModal = () => {
  const {
    modalData: { post, transaction },
    hideModal,
  } = useModal<EditPostModalCall>()

  const [state, send] = useMachine(postActionMachine)

  const { active } = useMyMemberships()
  const { allAccounts } = useMyAccounts()

  const feeInfo = useTransactionFee(active?.controllerAccount, transaction)

  useEffect(() => {
    if (!state.matches('requirementsVerification')) {
      return
    }
    if (feeInfo && active) {
      feeInfo.canAfford && send('PASS')
      !feeInfo.canAfford && send('FAIL')
    }
  }, [state.value, JSON.stringify(feeInfo)])

  if (state.matches('requirementsVerification')) {
    return <WaitModal title="Please wait..." description="Checking requirements" onClose={hideModal} />
  }

  if (state.matches('transaction') && transaction) {
    const service = state.children.transaction
    const controllerAccount = accountOrNamed(allAccounts, post.author.controllerAccount, 'Controller Account')
    return (
      <PostActionSignModal
        transaction={transaction}
        service={service}
        controllerAccount={controllerAccount}
        actionText="You intend to edit your post."
      />
    )
  }

  if (state.matches('error')) {
    return <FailureModal onClose={hideModal}>There was a problem submitting an edit to your post.</FailureModal>
  }

  if (state.matches('success')) {
    return <PostActionSuccessModal onClose={hideModal} text="Your edit has been submitted." />
  }

  if (state.matches('requirementsFailed') && active && feeInfo) {
    return (
      <InsufficientFundsModal onClose={hideModal} address={active.controllerAccount} amount={feeInfo.transactionFee} />
    )
  }

  return null
}
