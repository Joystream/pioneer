import React, { useEffect, useMemo } from 'react'

import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { useApi } from '@/api/hooks/useApi'
import { BN_ZERO } from '@/common/constants'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { defaultTransactionModalMachine } from '@/common/model/machines/defaultTransactionModalMachine'
import { getFeeSpendableBalance } from '@/common/providers/transactionFees/provider'
import { PostInsufficientFundsModal } from '@/forum/modals/PostActionModal/components/PostInsufficientFundsModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { CreatePostModalCall } from '.'
import { CreatePostSignModal } from './CreatePostSignModal'

export const CreatePostModal = () => {
  const { modalData } = useModal<CreatePostModalCall>()
  const { module = 'forum', postText, transaction, isEditable, onSuccess } = modalData

  const [state, send] = useMachine(
    defaultTransactionModalMachine('There was a problem posting your message.', 'Your post has been submitted.'),
    { context: { validateBeforeTransaction: true } }
  )

  const { active } = useMyMemberships()
  const { allAccounts } = useMyAccounts()
  const balance = useBalance(active?.controllerAccount)
  const { api } = useApi()

  const postDeposit = api?.consts[module].postDeposit.toBn()
  const { feeInfo } = useTransactionFee(active?.controllerAccount, () => transaction)
  const requiredAmount = useMemo(
    () => feeInfo && api && feeInfo.transactionFee.add(postDeposit ?? BN_ZERO),
    [feeInfo, postDeposit]
  )

  useEffect(() => {
    if (!(feeInfo && requiredAmount && active && balance)) {
      return
    }

    if (state.matches('requirementsVerification')) {
      if (isEditable ? getFeeSpendableBalance(balance).gte(requiredAmount) : feeInfo.canAfford) {
        send('PASS')
      } else {
        send('FAIL')
      }
    }

    if (state.matches('beforeTransaction')) {
      if (isEditable ? getFeeSpendableBalance(balance).gte(requiredAmount) : feeInfo.canAfford) {
        send('PASS')
      } else {
        send('FAIL')
      }
    }

    if (state.matches('success')) {
      onSuccess()
    }
  }, [state.value, JSON.stringify(feeInfo), postDeposit, balance])

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
        isEditable={isEditable}
        postDeposit={postDeposit}
      />
    )
  }

  if (state.matches('requirementsFailed') && feeInfo && requiredAmount && active) {
    return <PostInsufficientFundsModal postDeposit={postDeposit} feeInfo={feeInfo} requiredAmount={requiredAmount} />
  }

  return null
}
