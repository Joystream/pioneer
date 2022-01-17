import { useMachine } from '@xstate/react'
import BN from 'bn.js'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { withdrawalStakeMachine, WithdrawalStakeStates } from '@/bounty/modals/WithdrawalStakeModal/machine'
import { WithdrawSignModal } from '@/bounty/modals/WithdrawSignModal'
import { FailureModal } from '@/common/components/FailureModal'
import { SuccessModal } from '@/common/components/SuccessModal'
import { WaitModal } from '@/common/components/WaitModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { WithdrawalStakeModalCall } from '.'

export const WithdrawalStakeModal = () => {
  const { api, connectionState } = useApi()
  const { t } = useTranslation('bounty')
  const { hideModal, modalData } = useModal<WithdrawalStakeModalCall>()

  const [state, send] = useMachine(withdrawalStakeMachine)

  const { active: activeMember } = useMyMemberships()
  const { allAccounts } = useMyAccounts()

  const transaction = useMemo(() => {
    if (api && connectionState === 'connected' && activeMember) {
      return api.tx.bounty.withdrawFunding({ Member: activeMember.id }, modalData.bounty.id)
    }
  }, [JSON.stringify(activeMember), connectionState])

  const entry = useMemo(() => modalData.bounty.entries?.find((entry) => entry.worker.id === activeMember?.id), [
    activeMember?.id,
  ])

  const feeInfo = useTransactionFee(activeMember?.controllerAccount, transaction)

  useEffect(() => {
    if (state.matches(WithdrawalStakeStates.requirementsVerification)) {
      if (transaction && feeInfo && activeMember) {
        feeInfo.canAfford && send('NEXT')
        !feeInfo.canAfford && send('ERROR')
      }
    }
  }, [state.value, transaction, feeInfo?.canAfford])

  if (state.matches(WithdrawalStakeStates.requirementsVerification)) {
    return <WaitModal title="Please wait..." description={t('common:modals.wait.description')} onClose={hideModal} />
  }

  if (!api || !activeMember || !transaction || !feeInfo || !entry) {
    return null
  }

  if (state.matches(WithdrawalStakeStates.transaction)) {
    const service = state.children.transaction
    const controllerAccount = accountOrNamed(allAccounts, activeMember.controllerAccount, 'Controller Account')
    return (
      <WithdrawSignModal
        amount={new BN(entry?.stake || 0)}
        controllerAccount={controllerAccount}
        onClose={hideModal}
        service={service}
        transaction={transaction}
        type="stake"
      />
    )
  }

  if (state.matches(WithdrawalStakeStates.success)) {
    return <SuccessModal onClose={hideModal} text={t('modals.withdrawContribution.success')} />
  }

  if (state.matches(WithdrawalStakeStates.error)) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        {t('common:modals.failed.description')}
      </FailureModal>
    )
  }

  if (state.matches(WithdrawalStakeStates.error)) {
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
