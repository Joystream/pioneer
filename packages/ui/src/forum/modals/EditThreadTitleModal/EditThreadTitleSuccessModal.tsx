import React from 'react'

import { SuccessSymbol } from '@/common/components/icons/symbols'
import { Info } from '@/common/components/Info'
import { Modal, ModalBody, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'

interface EditTreadTitleSuccessModalProps {
  onClose: () => void
}

export const EditTreadTitleSuccessModal = ({ onClose }: EditTreadTitleSuccessModalProps) => {
  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessSymbol />} />
      <ModalBody>
        <Info>
          <TextMedium light>You have just successfully edited thread title.</TextMedium>
        </Info>
      </ModalBody>
    </Modal>
  )
}
