import React, { useLayoutEffect, useMemo } from 'react'

import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { RecoverBalanceModalCall } from '@/accounts/modals/RecoverBalance/index'
import { recoverBalanceMachine } from '@/accounts/modals/RecoverBalance/machine'
import { useApi } from '@/api/hooks/useApi'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { isDefined } from '@/common/utils'
import { useMember } from '@/memberships/hooks/useMembership'
import { useApplications } from '@/working-groups/hooks/useApplications'

import { RecoverBalanceSignModal } from './RecoverBalanceSignModal'
import { RecoverBalanceSuccessModal } from './RecoverBalanceSuccessModal'

export const RecoverBalanceModal = () => {
  const [state, send] = useMachine(recoverBalanceMachine)
  const { api } = useApi()
  const { hideModal, modalData } = useModal<RecoverBalanceModalCall>()
  const { member } = useMember(modalData?.memberId)
  const { applications: possibleApplications } = useApplications({
    stakingAccount: modalData.address,
    skip: !modalData.lock.type.endsWith('Worker'),
    limit: 1,
  })

  const signer = useMemo(() => {
    if (modalData.lock.type === 'Council Candidate') {
      return member?.controllerAccount
    }

    if (modalData.lock.type === 'Voting') {
      return modalData.address
    }

    return possibleApplications[0]?.roleAccount
  }, [modalData.lock.type, modalData.address, member])

  const transaction = useMemo(() => {
    if (!api?.isConnected) {
      return
    }

    switch (modalData.lock.type) {
      case 'Council Candidate':
        return api.tx.council.releaseCandidacyStake(modalData.memberId as any)
      case 'Voting':
        return api.tx.referendum.releaseVoteStake()
      default:
        return api.tx[possibleApplications[0].opening.groupId ?? 'forumWorkingGroup'].withdrawApplication(
          possibleApplications[0].runtimeId ?? 0
        )
    }
  }, [api?.isConnected, modalData?.memberId, modalData.lock.type])

  const { feeInfo } = useTransactionFee(signer, () => transaction, [transaction])

  useLayoutEffect(() => {
    if (state.matches('requirementsVerification') && isDefined(feeInfo?.canAfford)) {
      send(feeInfo?.canAfford ? 'PASS' : 'FAIL')
    }
  }, [feeInfo, state.value])

  if (!transaction || !feeInfo || !signer) {
    return null
  }

  if (state.matches('requirementsFailed')) {
    return <InsufficientFundsModal onClose={hideModal} address={signer} amount={feeInfo.transactionFee} />
  }

  if (state.matches('transaction')) {
    const transactionService = state.children.transaction

    return (
      <RecoverBalanceSignModal
        onClose={hideModal}
        service={transactionService}
        address={modalData.address}
        signer={signer}
        transaction={transaction}
        lock={modalData.lock}
      />
    )
  }

  if (state.matches('success')) {
    return <RecoverBalanceSuccessModal onClose={hideModal} />
  }

  return null
}
