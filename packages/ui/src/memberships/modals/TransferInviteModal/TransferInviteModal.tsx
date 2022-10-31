import BN from 'bn.js'
import React, { useEffect } from 'react'

import { useTransactionFee } from '@/accounts/hooks/useTransactionFee'
import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { useApi } from '@/api/hooks/useApi'
import { TransferIcon } from '@/common/components/icons'
import { TextMedium } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'

import { useMember } from '../../hooks/useMembership'
import { Member } from '../../types'

import { TransferInvitesModalCall } from '.'
import { transferInvitesMachine } from './machine'
import { TransferInviteFormModal } from './TransferInviteFormModal'
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
    const transaction = api?.tx?.members?.transferInvites(member.id, targetMember.id, numberOfInvites)
    const plural = numberOfInvites.gt(new BN(1))
    const handle = targetMember.handle
    return (
      <SignTransactionModal
        transaction={transaction}
        signer={member.controllerAccount}
        service={state.children['transaction']}
      >
        <TextMedium margin="m">
          You intend to transfer {numberOfInvites.toString()} invite{plural && 's'} to {handle}.
        </TextMedium>
      </SignTransactionModal>
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

  return null
}
