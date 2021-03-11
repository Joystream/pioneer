import React, { ReactElement, useState } from 'react'
import { BaseMember } from '../../common/types'
import { TransferDetailsModal } from './TransferDetailsModal'
import BN from 'bn.js'
import { Modal } from '../../components/Modal'

interface Props {
  onClose: () => void
  icon: ReactElement
  member?: BaseMember
}

type ModalState = 'PREPARE' | 'AUTHORIZE' | 'SUCCESS' | 'ERROR'

export function TransferInviteModal({ onClose, icon, member }: Props) {
  const [step, setStep] = useState<ModalState>('PREPARE')
  const [, setAmount] = useState<BN>(new BN(0))
  const [, setSourceMember] = useState<BaseMember | undefined>(member)
  const [, setTargetMember] = useState<BaseMember | undefined>()

  const onAccept = (amount: BN, from: BaseMember, to: BaseMember) => {
    setAmount(amount)
    setTargetMember(to)
    setSourceMember(from)
    setStep('AUTHORIZE')
  }

  if (step === 'PREPARE') {
    return <TransferDetailsModal onClose={onClose} onAccept={onAccept} icon={icon} member={member} />
  }

  if (step === 'AUTHORIZE') {
    return (
      <Modal onClose={onClose} modalSize="m">
        authorize
      </Modal>
    )
  }
  return <></>
}
