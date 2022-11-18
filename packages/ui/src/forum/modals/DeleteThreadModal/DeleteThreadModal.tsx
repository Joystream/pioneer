import React, { useEffect, useMemo } from 'react'

import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { useApi } from '@/api/hooks/useApi'
import { TextMedium } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { createType } from '@/common/model/createType'
import { defaultTransactionModalMachine } from '@/common/model/machines/defaultTransactionModalMachine'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { DeleteThreadModalCall } from '.'

export const DeleteThreadModal = () => {
  const {
    modalData: { thread },
    hideModal,
  } = useModal<DeleteThreadModalCall>()

  const machine = useMemo(
    () => defaultTransactionModalMachine('There was a problem deleting your thread.', 'Your thread has been deleted.'),
    []
  )

  const [state, send] = useMachine(machine, { context: { validateBeforeTransaction: true } })
  const { api, isConnected } = useApi()
  const { active: activeMember } = useMyMemberships()

  const transaction = useMemo(() => {
    if (api && isConnected) {
      return api.tx.forum.deleteThread(
        createType('ForumUserId', Number.parseInt(thread.author.id)),
        createType('CategoryId', Number.parseInt(thread.categoryId)),
        createType('ThreadId', Number.parseInt(thread.id)),
        true
      )
    }
  }, [thread.author.id, thread.categoryId, thread.id, isConnected])

  const { feeInfo } = useTransactionFee(activeMember?.controllerAccount, () => transaction, [transaction])

  useEffect(() => {
    if (state.matches('requirementsVerification')) {
      if (transaction && feeInfo) {
        feeInfo.canAfford && send('PASS')
        !feeInfo.canAfford && send('FAIL')
      }
    }

    if (state.matches('beforeTransaction')) {
      send(feeInfo?.canAfford ? 'PASS' : 'FAIL')
    }
  }, [state.value, activeMember, transaction, feeInfo?.canAfford])

  if (state.matches('transaction') && transaction && activeMember) {
    return (
      <SignTransactionModal
        buttonText="Sign and delete"
        transaction={transaction}
        signer={activeMember.controllerAccount}
        service={state.children.transaction}
      >
        <TextMedium>You intend to delete your thread.</TextMedium>
      </SignTransactionModal>
    )
  }

  if (state.matches('requirementsFailed') && activeMember && feeInfo) {
    return (
      <InsufficientFundsModal
        onClose={hideModal}
        address={activeMember.controllerAccount}
        amount={feeInfo.transactionFee}
      />
    )
  }

  return null
}
