import { createType } from '@joystream/types'
import { useMachine } from '@xstate/react'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { AuthorizeTransactionModal } from '@/bounty/modals/AuthorizeTransactionModal'
import { FailureModal } from '@/common/components/FailureModal'
import { SuccessModal } from '@/common/components/SuccessModal'
import { WaitModal } from '@/common/components/WaitModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
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

  const [state, send] = useMachine(defaultTransactionModalMachine)
  const { api, connectionState } = useApi()
  const { active: activeMember } = useMyMemberships()
  const { allAccounts } = useMyAccounts()

  const transaction = useMemo(() => {
    if (api && connectionState === 'connected') {
      return api.tx.forum.deleteThread(
        createType('ForumUserId', Number.parseInt(thread.authorId)),
        createType('CategoryId', Number.parseInt(thread.categoryId)),
        createType('ThreadId', Number.parseInt(thread.id)),
        true
      )
    }
  }, [api, connectionState])

  const feeInfo = useTransactionFee(activeMember?.controllerAccount, transaction)

  useEffect(() => {
    if (!state.matches('requirementsVerification')) {
      return
    }
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

  if (state.matches('success')) {
    return <SuccessModal onClose={hideModal} text={t('modals.deleteThread.success')} />
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        {t('modals.deleteThread.error')}
      </FailureModal>
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
