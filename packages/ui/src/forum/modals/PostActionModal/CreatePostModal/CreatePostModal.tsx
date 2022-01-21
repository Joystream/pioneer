import { useMachine } from '@xstate/react'
import React, { useCallback, useEffect } from 'react'

import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { FailureModal } from '@/common/components/FailureModal'
import { SuccessModal } from '@/common/components/SuccessModal'
import { WaitModal } from '@/common/components/WaitModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { defaultTransactionModalMachine } from '@/common/model/machines/defaultTransactionModalMachine'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { CreatePostModalCall } from '.'
import { CreatePostSignModal } from './CreatePostSignModal'

export const CreatePostModal = () => {
  const {
    modalData: { postText, replyTo, transaction, isEditable, onSuccess },
    hideModal,
  } = useModal<CreatePostModalCall>()

  const hideModalAfterSuccess = useCallback(() => {
    onSuccess()
    hideModal()
  }, [])

  const [state, send] = useMachine(defaultTransactionModalMachine)

  const { active } = useMyMemberships()
  const { allAccounts } = useMyAccounts()
  const balance = useBalance(active?.controllerAccount)
  const { api } = useApi()

  const postDeposit = api?.consts.forum.postDeposit.toBn()

  const feeInfo = useTransactionFee(active?.controllerAccount, transaction)

  useEffect(() => {
    if (!state.matches('requirementsVerification')) {
      return
    }
    if (feeInfo && postDeposit && active && balance) {
      const canAfford = isEditable
        ? balance.transferable.gte(feeInfo.transactionFee.add(postDeposit))
        : feeInfo.canAfford
      canAfford && send('PASS')
      !canAfford && send('FAIL')
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

  if (state.matches('requirementsFailed') && active && feeInfo) {
    return (
      <InsufficientFundsModal onClose={hideModal} address={active.controllerAccount} amount={feeInfo.transactionFee} />
    )
  }

  return null
}
