import React, { useEffect } from 'react'

import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { TextMedium } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { defaultTransactionModalMachine } from '@/common/model/machines/defaultTransactionModalMachine'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { DeletePostModalCall } from '.'

export const DeletePostModal = () => {
  const {
    modalData: { post, transaction },
    hideModal,
  } = useModal<DeletePostModalCall>()
  const [state, send] = useMachine(
    defaultTransactionModalMachine('There was a problem deleting your post.', 'Your post has been deleted.'),
    { context: { validateBeforeTransaction: true } }
  )
  const { active } = useMyMemberships()
  const { feeInfo } = useTransactionFee(active?.controllerAccount, () => transaction)

  useEffect(() => {
    if (state.matches('requirementsVerification')) {
      if (transaction && feeInfo && active) {
        feeInfo.canAfford && send('PASS')
        !feeInfo.canAfford && send('FAIL')
      }
    }

    if (state.matches('beforeTransaction')) {
      send(feeInfo?.canAfford ? 'PASS' : 'FAIL')
    }
  }, [state.value, transaction, feeInfo?.canAfford])

  if (state.matches('transaction') && transaction) {
    return (
      <SignTransactionModal
        buttonText="Sign and delete"
        transaction={transaction}
        signer={post.author.controllerAccount}
        service={state.children.transaction}
      >
        <TextMedium>You intend to delete your post.</TextMedium>
      </SignTransactionModal>
    )
  }

  if (state.matches('requirementsFailed') && active && feeInfo) {
    return (
      <InsufficientFundsModal onClose={hideModal} address={active.controllerAccount} amount={feeInfo.transactionFee} />
    )
  }

  return null
}
