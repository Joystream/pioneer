import React, { useState } from 'react'
import { TransferDetailsModal } from './TransferDetailsModal'

interface Props {
  onClose: () => void
}

type ModalState = 'PREPARE'

export function TransferInviteModal({ onClose }: Props) {
  const [step] = useState<ModalState>('PREPARE')

  if (step === 'PREPARE') {
    return <TransferDetailsModal onClose={onClose} />
  }
  return <></>
}
