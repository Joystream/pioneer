import BN from 'bn.js'
import React, { useEffect, useState } from 'react'

import { TransferInvitesModalCall } from '.'
import { TransferIcon } from '../../../common/components/icons'
import { WaitModal } from '../../../common/components/WaitModal'
import { useModal } from '../../../common/hooks/useModal'
import { Account, BaseMember, ModalState } from '../../../common/types'
import { useTransferInviteFee } from '../../hooks/useTransferInviteFee'
import { useGetMemberQuery } from '../../queries'
import { TransferInviteFailureModal } from './TransferInviteFailureModal'
import { TransferInviteFormModal } from './TransferInviteFormModal'
import { TransferInviteRequirementsModal } from './TransferInviteRequirementsModal'
import { TransferInviteSignModal } from './TransferInviteSignModal'
import { TransferInviteSuccessModal } from './TransferInviteSuccessModal'

export function TransferInviteModal() {
  const { hideModal, modalData } = useModal<TransferInvitesModalCall>()
  const { data, loading } = useGetMemberQuery({ variables: { id: modalData.memberId } })
  const [step, setStep] = useState<ModalState>('REQUIREMENTS_CHECK')
  const [amount, setAmount] = useState<BN>(new BN(0))
  const [targetMember, setTargetMember] = useState<BaseMember>()
  const [signer, setSigner] = useState<Account>()
  const transactionFeeInfo = useTransferInviteFee(data?.membership as BaseMember)

  useEffect(() => {
    if (step === 'REQUIREMENTS_CHECK' && transactionFeeInfo) {
      setStep(transactionFeeInfo.canAfford ? 'PREPARE' : 'REQUIREMENTS_FAIL')
    }
  }, [transactionFeeInfo])

  const onAccept = (amount: BN, from: BaseMember, to: BaseMember, signer: Account) => {
    setAmount(amount)
    setTargetMember(to)
    setSigner(signer)
    setStep('AUTHORIZE')
  }

  const onDone = (result: boolean) => {
    setStep(result ? 'SUCCESS' : 'ERROR')
  }

  if (loading || !data?.membership) {
    return null
  }

  if (step === 'REQUIREMENTS_CHECK') {
    return <WaitModal onClose={hideModal} title="Loading..." description="" />
  }

  if (step === 'REQUIREMENTS_FAIL' && transactionFeeInfo) {
    return (
      <TransferInviteRequirementsModal
        onClose={hideModal}
        address={data.membership.controllerAccount}
        amount={transactionFeeInfo.transactionFee}
      />
    )
  }

  if (step === 'PREPARE' || !targetMember || !signer) {
    return (
      <TransferInviteFormModal
        onClose={hideModal}
        onAccept={onAccept}
        icon={<TransferIcon />}
        member={data.membership}
      />
    )
  }

  if (step === 'AUTHORIZE') {
    return (
      <TransferInviteSignModal
        onClose={hideModal}
        sourceMember={data.membership}
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

  return <TransferInviteFailureModal onClose={hideModal} />
}
