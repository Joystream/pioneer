import React, { ReactElement, useState } from 'react'
import { TransferDetailsModal } from './TransferDetailsModal'

interface Props {
  onClose: () => void
  icon: ReactElement
}

type ModalState = 'PREPARE'

export function TransferInviteModal({ onClose, icon }: Props) {
  const [step] = useState<ModalState>('PREPARE')

  if (step === 'PREPARE') {
    return <TransferDetailsModal onClose={onClose} icon={icon} />
  }
  return <></>
}
