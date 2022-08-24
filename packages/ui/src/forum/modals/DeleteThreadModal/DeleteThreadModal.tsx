import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { useApi } from '@/api/hooks/useApi'
import { AuthorizeTransactionModal } from '@/bounty/modals/AuthorizeTransactionModal'
import { WaitModal } from '@/common/components/WaitModal'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { createType } from '@/common/model/createType'
import { defaultTransactionModalMachine } from '@/common/model/machines/defaultTransactionModalMachine'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { SwitchMemberModalCall } from '@/memberships/modals/SwitchMemberModal'

import { DeleteThreadModalCall } from '.'

export const DeleteThreadModal = () => {
  const { t } = useTranslation('forum')
  const {
    modalData: { thread },
    showModal,
    hideModal,
  } = useModal<DeleteThreadModalCall>()

  const [state, send] = useMachine(
    defaultTransactionModalMachine('There was a problem deleting your thread.', 'Your thread has been deleted.'),
    { context: { validateBeforeTransaction: true } }
  )
  const { api, isConnected } = useApi()
  const { active: activeMember } = useMyMemberships()
  const { allAccounts } = useMyAccounts()

  const transaction = useMemo(() => {
    if (api && isConnected) {
      return api.tx.forum.deleteThread(
        createType('ForumUserId', Number.parseInt(thread.authorId)),
        createType('CategoryId', Number.parseInt(thread.categoryId)),
        createType('ThreadId', Number.parseInt(thread.id)),
        true
      )
    }
  }, [thread.authorId, thread.categoryId, thread.id, isConnected])

  const { feeInfo } = useTransactionFee(activeMember?.controllerAccount, () => transaction, [transaction])

  useEffect(() => {
    if (state.matches('requirementsVerification')) {
      if (!activeMember) {
        return showModal<SwitchMemberModalCall>({
          modal: 'SwitchMember',
          data: {
            originalModalName: 'DeleteThreadModal',
            originalModalData: { thread },
          },
        })
      }
      if (transaction && feeInfo) {
        feeInfo.canAfford && send('PASS')
        !feeInfo.canAfford && send('FAIL')
      }
    }

    if (state.matches('beforeTransaction')) {
      send(feeInfo?.canAfford ? 'PASS' : 'FAIL')
    }
  }, [state.value, activeMember, transaction, feeInfo?.canAfford])

  if (state.matches('requirementsVerification')) {
    return <WaitModal onClose={hideModal} requirementsCheck />
  }

  if (state.matches('transaction') && transaction && activeMember) {
    const service = state.children.transaction
    const controllerAccount = accountOrNamed(allAccounts, activeMember.controllerAccount, 'Controller Account')
    return (
      <AuthorizeTransactionModal
        onClose={hideModal}
        transaction={transaction}
        service={service}
        controllerAccount={controllerAccount}
        description={t('modals.deleteThread.description')}
        buttonLabel={t('modals.deleteThread.buttonLabel')}
      />
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
