import React, { ReactElement } from 'react'
import { Modal, ModalHeader } from '../../components/Modal'

interface Props {
  onClose: () => void
  icon: ReactElement
}
export function TransferDetailsModal({ onClose, icon }: Props) {
  return (
    <Modal onClose={onClose} modalSize="m">
      <ModalHeader onClick={onClose} title="Transfer invites" icon={icon} />
    </Modal>
  )
}
