import { useMachine } from '@xstate/react'
import React, { useEffect, useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { ClaimRewardSignModal } from '@/bounty/modals/ClaimRewardModal/ClaimRewardSignModal'
import { FailureModal } from '@/common/components/FailureModal'
import { SuccessModal } from '@/common/components/SuccessModal'
import { WaitModal } from '@/common/components/WaitModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'
import { defaultTransactionModalMachine } from '@/common/model/machines/defaultTransactionModalMachine'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { ClaimRewardModalCall } from './types'

export const ClaimRewardModal = () => {
  const { api, connectionState } = useApi()
  const {
    modalData: { bountyId },
    hideModal,
  } = useModal<ClaimRewardModalCall>()

  const [state, send] = useMachine(defaultTransactionModalMachine)

  const { active: activeMember } = useMyMemberships()
  const { allAccounts } = useMyAccounts()

  const transaction = useMemo(() => {
    if (api && connectionState === 'connected' && activeMember) {
      return api.tx.bounty.withdrawFunding({ Member: activeMember.id }, bountyId)
    }
  }, [JSON.stringify(activeMember), connectionState])

  const feeInfo = useTransactionFee(activeMember?.controllerAccount, transaction)

  useEffect(() => {
    if (state.matches('requirementsVerification')) {
      if (transaction && feeInfo && activeMember) {
        feeInfo.canAfford && send('PASS')
        !feeInfo.canAfford && send('FAIL')
      }
    }
  }, [state.value, transaction, feeInfo?.canAfford])

  if (state.matches('requirementsVerification')) {
    return <WaitModal title="Please wait..." description="Checking requirements" onClose={hideModal} />
  }

  if (!api || !activeMember || !transaction || !feeInfo) {
    return null
  }

  if (state.matches('transaction')) {
    const service = state.children.transaction
    const controllerAccount = accountOrNamed(allAccounts, activeMember.controllerAccount, 'Controller Account')

    return (
      <ClaimRewardSignModal
        onClose={hideModal}
        transaction={transaction}
        service={service}
        controllerAccount={controllerAccount}
      />
    )
  }

  if (state.matches('success')) {
    return <SuccessModal onClose={hideModal} text="You have successfully claimed your reward." />
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        There was a problem while claiming your reward.
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
