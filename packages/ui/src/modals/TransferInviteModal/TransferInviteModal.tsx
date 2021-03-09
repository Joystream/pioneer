import React, { ReactElement, useState } from 'react'
import { MemberFieldsFragment } from '../../api/queries'
import { TransferDetailsModal } from './TransferDetailsModal'

interface Props {
  onClose: () => void
  icon: ReactElement
  member?: MemberFieldsFragment
}

type ModalState = 'PREPARE'

export function TransferInviteModal({ onClose, icon, member }: Props) {
  const [step] = useState<ModalState>('PREPARE')

  if (step === 'PREPARE') {
    return <TransferDetailsModal onClose={onClose} icon={icon} member={member} />
  }
  return <></>
}
