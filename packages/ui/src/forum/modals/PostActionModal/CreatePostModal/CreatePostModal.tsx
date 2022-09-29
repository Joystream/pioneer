import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { useApi } from '@/api/hooks/useApi'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { defaultTransactionModalMachine } from '@/common/model/machines/defaultTransactionModalMachine'
import { getFeeSpendableBalance } from '@/common/providers/transactionFees/provider'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { CreatePostModalCall } from '.'
import { CreatePostSignModal } from './CreatePostSignModal'

export const CreatePostModal = () => {
  const { t } = useTranslation('accounts')
  const { modalData, hideModal } = useModal<CreatePostModalCall>()
  const { module = 'forum', postText, replyTo, transaction, isEditable, onSuccess } = modalData

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
        replyTo={replyTo}
        isEditable={isEditable}
        postDeposit={postDeposit}
      />
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
