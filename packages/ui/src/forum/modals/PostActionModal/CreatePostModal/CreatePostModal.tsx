import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useBalance } from '@/accounts/hooks/useBalance'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { useApi } from '@/api/hooks/useApi'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { WaitModal } from '@/common/components/WaitModal'
import { BN_ZERO } from '@/common/constants'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { defaultTransactionModalMachine } from '@/common/model/machines/defaultTransactionModalMachine'
import { getFeeSpendableBalance } from '@/common/providers/transactionFees/provider'
import { PreviewPostButton } from '@/forum/components/PreviewPostButton'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { CreatePostModalCall } from '.'

export const CreatePostModal = () => {
  const { t } = useTranslation('accounts')
  const { modalData, hideModal } = useModal<CreatePostModalCall>()
  const { module = 'forum', postText, replyTo, transaction, isEditable, onSuccess } = modalData

  const [state, send] = useMachine(
    defaultTransactionModalMachine('There was a problem posting your message.', 'Your post has been submitted.'),
    { context: { validateBeforeTransaction: true } }
  )

  const { active } = useMyMemberships()
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

  if (state.matches('requirementsVerification')) {
    return <WaitModal onClose={hideModal} requirementsCheck />
  }

  if (state.matches('transaction') && transaction && active && postDeposit) {
    return (
      <SignTransactionModal
        buttonText={replyTo ? 'Sign and reply' : 'Sign and post'}
        transaction={transaction}
        signer={active.controllerAccount}
        service={state.children.transaction}
        additionalTransactionInfo={
          isEditable
            ? [
                {
                  value: postDeposit,
                  title: 'Post deposit:',
                },
              ]
            : undefined
        }
        extraButtons={<PreviewPostButton author={active} postText={postText} replyTo={replyTo} />}
      >
        <TextMedium>You intend to post in a thread.</TextMedium>
        {isEditable && (
          <TextMedium>
            <TokenValue value={postDeposit} /> will be deposited to make the post editable.
          </TextMedium>
        )}
      </SignTransactionModal>
    )
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

  return null
}
