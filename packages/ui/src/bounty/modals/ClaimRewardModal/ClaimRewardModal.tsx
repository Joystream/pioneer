import { useMachine } from '@xstate/react'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { SuccessTransactionModal } from '@/bounty/modals/SuccessTransactionModal'
import { WithdrawSignModal } from '@/bounty/modals/WithdrawSignModal'
import { FailureModal } from '@/common/components/FailureModal'
import { WaitModal } from '@/common/components/WaitModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { defaultTransactionModalMachine } from '@/common/model/machines/defaultTransactionModalMachine'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { ClaimRewardModalCall } from './types'

export const ClaimRewardModal = () => {
  const { t } = useTranslation('bounty')
  const { api, connectionState } = useApi()
  const {
    modalData: { bounty },
    hideModal,
  } = useModal<ClaimRewardModalCall>()

  const [state, send] = useMachine(defaultTransactionModalMachine)

  const { active: activeMember } = useMyMemberships()
  const { allAccounts } = useMyAccounts()

  const entry = useMemo(
    () => activeMember && bounty.entries?.find((entry) => entry.worker.id === activeMember.id),
    [activeMember?.id]
  )

  const transaction = useMemo(() => {
    if (api && connectionState === 'connected' && activeMember && entry) {
      return api.tx.bounty.withdrawWorkEntrantFunds(activeMember.id, bounty.id, entry.id)
    }
  }, [activeMember?.id, entry?.id, connectionState])

  const feeInfo = useTransactionFee(activeMember?.controllerAccount, transaction)

  const requirementsVerified = transaction && feeInfo && activeMember && entry?.reward && api

  useEffect(() => {
    if (state.matches('requirementsVerification') && requirementsVerified) {
      feeInfo.canAfford && send('PASS')
      !feeInfo.canAfford && send('FAIL')
    }
  }, [state.value, transaction, feeInfo?.canAfford])

  if (state.matches('requirementsVerification')) {
    return (
      <WaitModal
        title={t('common:modals.wait.title')}
        description={t('common:modals.wait.description')}
        onClose={hideModal}
        requirements={[
          { name: 'Initializing server connection', state: !!api },
          { name: 'Loading member', state: !!activeMember },
          { name: 'Creating transaction', state: !!transaction },
          { name: 'Calculating fee', state: !!feeInfo },
          { name: 'Calculating reward', state: !!entry?.reward },
        ]}
      />
    )
  }

  if (!api || !activeMember || !transaction || !feeInfo || !entry || !entry.reward) {
    return null
  }

  if (state.matches('transaction')) {
    const service = state.children.transaction
    const controllerAccount = accountOrNamed(allAccounts, activeMember.controllerAccount, 'Controller Account')

    return (
      <WithdrawSignModal
        type="reward"
        onClose={hideModal}
        transaction={transaction}
        service={service}
        controllerAccount={controllerAccount}
        reward={entry.reward}
        stake={entry.stake}
        amount={entry.reward.add(entry.stake)}
      />
    )
  }

  if (state.matches('success')) {
    return (
      <SuccessTransactionModal
        onClose={hideModal}
        onButtonClick={hideModal}
        message={t('modals.withdraw.reward.success')}
        buttonLabel={t('modals.withdrawContribution.successButton')}
      />
    )
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        {t('modals.withdraw.reward.error')}
      </FailureModal>
    )
  }

  if (state.matches('requirementsFailed')) {
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
