import React from 'react'

import { ButtonGhost } from '@/common/components/buttons'
import { SuccessSymbol } from '@/common/components/icons/symbols'
import { Info } from '@/common/components/Info'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { camelCaseToText } from '@/common/helpers'

interface SuccessModalProps {
  onClose: () => void
}

export const SuccessModal = ({ onClose }: SuccessModalProps) => {
  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessSymbol />} />
      <ModalBody>
        <Info>
          <TextMedium light>You have just successfully announced candidacy.</TextMedium>
        </Info>
      </ModalBody>
      <ModalFooter>
        <ButtonGhost size="medium">See my Announcement</ButtonGhost>
      </ModalFooter>
    </Modal>
  )
}
