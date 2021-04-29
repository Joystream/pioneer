import React, { ReactNode } from 'react'

import { SuccessIcon } from '../../../common/components/icons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../common/components/Modal'
import { TextMedium } from '../../../common/components/typography'

interface Props {
  onClose: () => void
}

type SuccessModalProps = { onClose: () => void; children: ReactNode }

const SuccessModal = ({ onClose, children }: SuccessModalProps) => {
  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessIcon />} />
      {children}
    </Modal>
  )
}

export const ApplyForRoleSuccessModal = ({ onClose }: Props) => {
  return (
    <SuccessModal onClose={onClose}>
      <ModalBody>
        <TextMedium>You have just successfully applier for a role.</TextMedium>
      </ModalBody>
      <ModalFooter />
    </SuccessModal>
  )
}
