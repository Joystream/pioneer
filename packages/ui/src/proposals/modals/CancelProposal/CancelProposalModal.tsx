import React, { useEffect, useMemo } from 'react'

import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { useApi } from '@/api/hooks/useApi'
import { TextMedium } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { defaultTransactionModalMachine } from '@/common/model/machines/defaultTransactionModalMachine'

import { CancelProposalModalCall } from './types'

export const CancelProposalModal = () => {
  const { hideModal, modalData } = useModal<CancelProposalModalCall>()
  const { member, proposalId } = modalData
  const machine = useMemo(
    () =>
      defaultTransactionModalMachine(
        'There was a problem cancelling your proposal.',
        'Your proposal has been cancelled.'
      ),
    []
  )
  const [state, send] = useMachine(machine, { context: { validateBeforeTransaction: true } })
  const { api, isConnected } = useApi()

  const { transaction, feeInfo } = useTransactionFee(
    member.controllerAccount,
    () => {
      if (api && isConnected) {
        return api.tx.proposalsEngine.cancelProposal(member.id, proposalId)
      }
    },
    [modalData, isConnected]
  )

  useEffect(() => {
    if (state.matches('requirementsVerification')) {
      if (transaction && feeInfo) {
        feeInfo.canAfford && send('PASS')
        !feeInfo.canAfford && send('FAIL')
      }
    }

    if (state.matches('beforeTransaction')) {
      send(feeInfo?.canAfford ? 'PASS' : 'FAIL')
    }
  }, [state.value, member, transaction, feeInfo?.canAfford])

  if (state.matches('transaction') && transaction && member) {
    return (
      <SignTransactionModal
        buttonText="Sign And Cancel Proposal"
        transaction={transaction}
        signer={member.controllerAccount}
        service={state.children.transaction}
      >
        <TextMedium>You intend to cancel your proposal.</TextMedium>
      </SignTransactionModal>
    )
  }

  if (state.matches('requirementsFailed') && member && feeInfo) {
    return (
      <InsufficientFundsModal onClose={hideModal} address={member.controllerAccount} amount={feeInfo.transactionFee} />
    )
  }
  return null
}
