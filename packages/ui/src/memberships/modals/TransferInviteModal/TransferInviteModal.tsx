import { useMachine } from '@xstate/react'
import BN from 'bn.js'
import React, { useEffect } from 'react'

import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { FailureModal } from '@/common/components/FailureModal'
import { TransferIcon } from '@/common/components/icons'
import { WaitModal } from '@/common/components/WaitModal'
import { useModal } from '@/common/hooks/useModal'

import { useMember } from '../../hooks/useMembership'
import { useTransferInviteFee } from '../../hooks/useTransferInviteFee'
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
  const transactionFeeInfo = useTransferInviteFee(member)

  useEffect(() => {
    if (state.matches('requirementsVerification') && transactionFeeInfo) {
      send(transactionFeeInfo.canAfford ? 'PASS' : 'FAIL')
    }
  }, [transactionFeeInfo])

  if (isLoading || !member) {
    return null
  }

  if (state.matches('requirementsVerification')) {
    return <WaitModal onClose={hideModal} title="Loading..." description="" />
  }

  if (state.matches('requirementsFailed') && transactionFeeInfo) {
    return (
      <InsufficientFundsModal
        onClose={hideModal}
        address={member.controllerAccount}
        amount={transactionFeeInfo.transactionFee}
      />
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
        onDone={(result: boolean) => send(result ? 'SUCCESS' : 'ERROR')}
      />
    )
  }

  if (state.matches('success')) {
    const { targetMember, numberOfInvites } = state.context
    return <TransferInviteSuccessModal onClose={hideModal} recipient={targetMember} amount={numberOfInvites} />
  }

  if (state.matches('error')) {
    return <FailureModal onClose={hideModal}>There was a problem transferring your invites.</FailureModal>
  }

  return null
}
