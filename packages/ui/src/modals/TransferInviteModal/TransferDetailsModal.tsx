import React from 'react'
import { Modal } from '../../components/Modal'

interface Props {
  onClose: () => void
}
export function TransferDetailsModal({ onClose }: Props) {
  return (
    <Modal onClose={onClose} modalSize="m">
      Transfer invites
    </Modal>
  )
}
