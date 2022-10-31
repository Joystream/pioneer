import BN from 'bn.js'
import React, { useEffect, useMemo } from 'react'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { useApi } from '@/api/hooks/useApi'
import { WithdrawSignModal } from '@/bounty/modals/WithdrawSignModal'
import { BN_ZERO } from '@/common/constants'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { createType } from '@/common/model/createType'
import { defaultTransactionModalMachine } from '@/common/model/machines/defaultTransactionModalMachine'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { BountyWithdrawContributionModalCall } from '.'

export const WithdrawContributionModal = () => {
  const { api, connectionState } = useApi()
  const {
    modalData: { bounty },
    hideModal,
  } = useModal<BountyWithdrawContributionModalCall>()

  const [state, send] = useMachine(
    defaultTransactionModalMachine(
      'There was a problem while withdrawing your contribution.',
      'Your contribution has been successfully withdrawn.'
    )
  )

  const { active: activeMember } = useMyMemberships()
  const { allAccounts } = useMyAccounts()

  const transaction = useMemo(() => {
    if (api && connectionState === 'connected' && activeMember) {
      createType('BountyActor', { Member: createType('u64', activeMember.id) })
      return api.tx.bounty.withdrawFunding(
        createType('BountyActor', { Member: createType('u64', activeMember.id) }),
        bounty.id
      )
    }
  }, [JSON.stringify(activeMember), connectionState])

  const amount = useMemo(
    () => bounty.contributors.find((contributor) => contributor.actor?.id === activeMember?.id)?.amount ?? BN_ZERO,
    [activeMember?.id]
  )

  const { feeInfo } = useTransactionFee(activeMember?.controllerAccount, () => transaction, [transaction])

  useEffect(() => {
    if (state.matches('requirementsVerification')) {
      if (transaction && feeInfo && activeMember && amount) {
        feeInfo.canAfford && send('PASS')
        !feeInfo.canAfford && send('FAIL')
      }
    }
  }, [state.value, transaction, feeInfo?.canAfford, amount])

  if (!api || !activeMember || !transaction || !feeInfo || !amount) {
    return null
  }

  if (state.matches('transaction')) {
    const service = state.children.transaction
    const controllerAccount = accountOrNamed(allAccounts, activeMember.controllerAccount, 'Controller Account')

    return (
      <WithdrawSignModal
        type="contribution"
        onClose={hideModal}
        transaction={transaction}
        service={service}
        controllerAccount={controllerAccount}
        amount={new BN(amount)}
        bounty={bounty}
        isContributor
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
