import { useMachine } from '@xstate/react'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { FailureModal } from '@/common/components/FailureModal'
import { SuccessModal } from '@/common/components/SuccessModal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { WaitModal } from '@/common/components/WaitModal'
import { BN_ZERO } from '@/common/constants'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { defaultTransactionModalMachine } from '@/common/model/machines/defaultTransactionModalMachine'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { CreatePostModalCall } from '.'
import { CreatePostSignModal } from './CreatePostSignModal'

export const CreatePostModal = () => {
  const { t } = useTranslation('accounts')
  const { modalData, hideModal } = useModal<CreatePostModalCall>()
  const { module = 'forum', postText, replyTo, transaction, isEditable, onSuccess } = modalData

  const hideModalAfterSuccess = useCallback(() => {
    onSuccess()
    hideModal()
  }, [])

  const [state, send] = useMachine(defaultTransactionModalMachine, { context: { validateBeforeTransaction: true } })

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

  return null
}
