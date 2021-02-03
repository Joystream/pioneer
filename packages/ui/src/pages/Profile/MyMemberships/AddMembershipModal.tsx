import React from 'react'
import { Modal, ModalHeader } from '../../../components/modal'

interface MembershipModalProps {
  onClose: () => void
}

export const AddMembershipModal = ({ onClose }: MembershipModalProps) => {
  return (
    <Modal>
      <ModalHeader onClick={onClose} title="Add membership" />
    </Modal>
  )
}
