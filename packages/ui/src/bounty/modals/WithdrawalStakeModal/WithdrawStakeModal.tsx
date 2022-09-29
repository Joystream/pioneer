import BN from 'bn.js'
import React, { useEffect, useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { useApi } from '@/api/hooks/useApi'
import { withdrawalStakeMachine, WithdrawalStakeStates } from '@/bounty/modals/WithdrawalStakeModal/machine'
import { WithdrawSignModal } from '@/bounty/modals/WithdrawSignModal'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { WithdrawStakeModalCall } from '.'

export const WithdrawStakeModal = () => {
  const { api, connectionState } = useApi()
  const { hideModal, modalData } = useModal<WithdrawStakeModalCall>()

  const [state, send] = useMachine(withdrawalStakeMachine)

  const { active: activeMember } = useMyMemberships()
  const { allAccounts } = useMyAccounts()

  const entry = useMemo(
    () => modalData.bounty.entries?.find((entry) => entry.worker.id === activeMember?.id),
    [activeMember?.id]
  )

  const { transaction, feeInfo } = useTransactionFee(
    activeMember?.controllerAccount,
    () => {
      if (api && connectionState === 'connected' && activeMember && entry) {
        return api.tx.bounty.withdrawWorkEntrantFunds(activeMember.id, modalData.bounty.id, entry.id)
      }
    },
    [JSON.stringify(activeMember), connectionState]
  )

  useEffect(() => {
    if (state.matches(WithdrawalStakeStates.requirementsVerification)) {
      if (transaction && feeInfo && activeMember && entry) {
        feeInfo.canAfford && send('NEXT')
        !feeInfo.canAfford && send('ERROR')
      }
    }
  }, [state.value, transaction, feeInfo?.canAfford, entry])

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

  if (state.matches(WithdrawalStakeStates.requirementsFailed)) {
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
