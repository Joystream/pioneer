import BN from 'bn.js'
import React, { useEffect, useState } from 'react'

import { InsufficientFundsModal } from '@/accounts/modals/InsufficientFundsModal'
import { Account } from '@/accounts/types'
import { FailureModal } from '@/common/components/FailureModal'
import { TransferIcon } from '@/common/components/icons'
import { WaitModal } from '@/common/components/WaitModal'
import { useModal } from '@/common/hooks/useModal'
import { ModalState } from '@/common/types'

import { useMember } from '../../hooks/useMembership'
import { useTransferInviteFee } from '../../hooks/useTransferInviteFee'
import { Member } from '../../types'

import { TransferInvitesModalCall } from '.'
import { TransferInviteFormModal } from './TransferInviteFormModal'
import { TransferInviteSignModal } from './TransferInviteSignModal'
import { TransferInviteSuccessModal } from './TransferInviteSuccessModal'

export function TransferInviteModal() {
  const { hideModal, modalData } = useModal<TransferInvitesModalCall>()
  const { isLoading, member } = useMember(modalData.memberId)
  const [step, setStep] = useState<ModalState>('REQUIREMENTS_CHECK')
  const [amount, setAmount] = useState<BN>(new BN(0))
  const [targetMember, setTargetMember] = useState<Member>()
  const [signer, setSigner] = useState<Account>()
  const transactionFeeInfo = useTransferInviteFee(member)

  useEffect(() => {
    if (step === 'REQUIREMENTS_CHECK' && transactionFeeInfo) {
      setStep(transactionFeeInfo.canAfford ? 'PREPARE' : 'REQUIREMENTS_FAIL')
    }
  }, [transactionFeeInfo])

  const onAccept = (amount: BN, from: Member, to: Member, signer: Account) => {
    setAmount(amount)
    setTargetMember(to)
    setSigner(signer)
    setStep('AUTHORIZE')
  }

  const onDone = (result: boolean) => {
    setStep(result ? 'SUCCESS' : 'ERROR')
  }

  if (isLoading || !member) {
    return null
  }

  if (step === 'REQUIREMENTS_CHECK') {
    return <WaitModal onClose={hideModal} title="Loading..." description="" />
  }

  if (step === 'REQUIREMENTS_FAIL' && transactionFeeInfo) {
    return (
      <InsufficientFundsModal
        onClose={hideModal}
        address={member.controllerAccount}
        amount={transactionFeeInfo.transactionFee}
      />
    )
  }

  if (step === 'PREPARE' || !targetMember || !signer) {
    return <TransferInviteFormModal onClose={hideModal} onAccept={onAccept} icon={<TransferIcon />} member={member} />
  }

  if (step === 'AUTHORIZE') {
    return (
      <TransferInviteSignModal
        onClose={hideModal}
        sourceMember={member}
        targetMember={targetMember}
        signer={signer}
        amount={amount}
        onDone={onDone}
      />
    )
  }

  if (step === 'SUCCESS') {
    return <TransferInviteSuccessModal onClose={hideModal} recipient={targetMember} amount={amount} />
  }

  return <FailureModal onClose={hideModal}>There was a problem transferring your invites.</FailureModal>
}
