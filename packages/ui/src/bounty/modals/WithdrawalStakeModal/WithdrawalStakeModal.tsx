import { useMachine } from '@xstate/react'
import React, { useEffect, useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { withdrawalStakeMachine, WithdrawalStakeStates } from '@/bounty/modals/WithdrawalStakeModal/machine'
import { WithdrawContributionSignModal } from '@/bounty/modals/WithdrawContributionModal/WithdrawContributionSignModal'
import { FailureModal } from '@/common/components/FailureModal'
import { SuccessModal } from '@/common/components/SuccessModal'
import { WaitModal } from '@/common/components/WaitModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { WithdrawalStakeModalCall } from '.'

export const WithdrawalStakeModal = () => {
  const { api, connectionState } = useApi()
  const {
    modalData: { bountyId },
    hideModal,
  } = useModal<WithdrawalStakeModalCall>()

  const [state, send] = useMachine(withdrawalStakeMachine)

  const { active: activeMember } = useMyMemberships()
  const { allAccounts } = useMyAccounts()

  const transaction = useMemo(() => {
    if (api && connectionState === 'connected' && activeMember) {
      return api.tx.bounty.withdrawFunding({ Member: activeMember.id }, bountyId)
    }
  }, [JSON.stringify(activeMember), connectionState])

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
    return <WaitModal title="Please wait..." description="Checking requirements" onClose={hideModal} />
  }

  if (!api || !activeMember || !transaction || !feeInfo) {
    return null
  }

  if (state.matches(WithdrawalStakeStates.transaction)) {
    const service = state.children.transaction
    const controllerAccount = accountOrNamed(allAccounts, activeMember.controllerAccount, 'Controller Account')

    return (
      <WithdrawContributionSignModal
        onClose={hideModal}
        transaction={transaction}
        service={service}
        controllerAccount={controllerAccount}
      />
    )
  }

  if (state.matches(WithdrawalStakeStates.success)) {
    return <SuccessModal onClose={hideModal} text="Your contribution has been successfully withdrawn." />
  }

  if (state.matches(WithdrawalStakeStates.error)) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        There was a problem while withdrawing your contribution.
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
