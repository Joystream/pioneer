import React, { ReactElement, useState } from 'react'
import { BaseMember } from '../../common/types'
import { TransferDetailsModal } from './TransferDetailsModal'

interface Props {
  onClose: () => void
  icon: ReactElement
  member?: BaseMember
}

type ModalState = 'PREPARE'

export function TransferInviteModal({ onClose, icon, member }: Props) {
  const [step] = useState<ModalState>('PREPARE')

  if (step === 'PREPARE') {
    return <TransferDetailsModal onClose={onClose} icon={icon} member={member} />
  }
  return <></>
}
