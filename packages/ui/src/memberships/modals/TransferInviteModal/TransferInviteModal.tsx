import { useMachine } from '@xstate/react'
import BN from 'bn.js'
import React, { useEffect } from 'react'

import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { FailureModal } from '@/common/components/FailureModal'
import { TransferIcon } from '@/common/components/icons'
import { WaitModal } from '@/common/components/WaitModal'
import { useApi } from '@/common/hooks/useApi'
import { useModal } from '@/common/hooks/useModal'

import { useMember } from '../../hooks/useMembership'
import { Member } from '../../types'

import { TransferInvitesModalCall } from '.'
import { transferInvitesMachine } from './machine'
import { TransferInviteFormModal } from './TransferInviteFormModal'
import { TransferInviteSignModal } from './TransferInviteSignModal'
import { TransferInviteSuccessModal } from './TransferInviteSuccessModal'

export function TransferInviteModal() {
  const { hideModal, modalData } = useModal<TransferInvitesModalCall>()
  const { isLoading, member } = useMember(modalData.memberId)
  const [state, send] = useMachine(transferInvitesMachine)
  const { api, isConnected } = useApi()

  const { feeInfo } = useTransactionFee(
    member?.controllerAccount,
    () => {
      return member ? api?.tx?.members?.transferInvites(member.id, member.id, 1) : undefined
    },
    [JSON.stringify(member), isConnected]
  )

  useEffect(() => {
    if (state.matches('requirementsVerification') && feeInfo) {
      send(feeInfo.canAfford ? 'PASS' : 'FAIL')
    }
  }, [feeInfo?.canAfford])

  if (isLoading || !member) {
    return null
  }

  if (state.matches('requirementsVerification')) {
    return <WaitModal onClose={hideModal} title="Loading..." description="" />
  }

  if (state.matches('requirementsFailed') && feeInfo) {
    return (
      <InsufficientFundsModal onClose={hideModal} address={member.controllerAccount} amount={feeInfo.transactionFee} />
    )
  }

  if (state.matches('prepare')) {
    const onAccept = (amount: BN, from: Member, to: Member) => {
      send('DONE', { numberOfInvites: amount, targetMember: to })
    }

    return <TransferInviteFormModal onClose={hideModal} onAccept={onAccept} icon={<TransferIcon />} member={member} />
  }

  if (state.matches('transaction')) {
    const { targetMember, numberOfInvites } = state.context
    return (
      <TransferInviteSignModal
        onClose={hideModal}
        sourceMember={member}
        targetMember={targetMember}
        amount={numberOfInvites}
        service={state.children.transaction}
      />
    )
  }

  if (state.matches('success')) {
    const { targetMember, numberOfInvites } = state.context
    return (
      <TransferInviteSuccessModal
        onClose={hideModal}
        recipient={targetMember}
        amount={numberOfInvites}
        memberId={member.id}
      />
    )
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.transactionEvents}>
        There was a problem transferring your invites.
      </FailureModal>
    )
  }

  if (state.matches('canceled')) {
    hideModal()
  }

  return null
}
