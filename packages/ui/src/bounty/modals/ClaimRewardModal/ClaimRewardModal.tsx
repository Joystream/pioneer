import React, { useEffect, useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { useApi } from '@/api/hooks/useApi'
import { WithdrawSignModal } from '@/bounty/modals/WithdrawSignModal'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { defaultTransactionModalMachine } from '@/common/model/machines/defaultTransactionModalMachine'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { ClaimRewardModalCall } from './types'

export const ClaimRewardModal = () => {
  const { api, connectionState } = useApi()
  const {
    modalData: { bounty },
    hideModal,
  } = useModal<ClaimRewardModalCall>()

  const [state, send] = useMachine(
    defaultTransactionModalMachine(
      'There was a problem while claiming your reward.',
      'You have successfully claimed your reward!'
    )
  )

  const { active: activeMember } = useMyMemberships()
  const { allAccounts } = useMyAccounts()

  const entry = useMemo(
    () => activeMember && bounty.entries?.find((entry) => entry.worker.id === activeMember.id),
    [activeMember?.id]
  )

  const { transaction, feeInfo } = useTransactionFee(
    activeMember?.controllerAccount,
    () => {
      if (api && connectionState === 'connected' && activeMember && entry) {
        return api.tx.bounty.withdrawWorkEntrantFunds(activeMember.id, bounty.id, entry.id)
      }
    },
    [activeMember?.id, entry?.id, connectionState]
  )

  const requirementsVerified = transaction && feeInfo && activeMember && entry?.reward && api

  useEffect(() => {
    if (state.matches('requirementsVerification') && requirementsVerified) {
      feeInfo.canAfford && send('PASS')
      !feeInfo.canAfford && send('FAIL')
    }
  }, [state.value, transaction, feeInfo?.canAfford])

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
