import React from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import { AlertSymbol } from '@/common/components/icons/symbols'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'

interface Props {
  onNext: () => void
  onClose: () => void
}

export const WithdrawWarningModal = ({ onNext, onClose }: Props) => {
  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Caution" icon={<AlertSymbol />} />
      <ModalBody>
        <TextMedium margin="s">
          Please remember that this action is irreversible. Amet minim mollit non deserunt ullamco est sit aliqua dolor
          do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </TextMedium>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary onClick={onNext} size="medium">
          Withdraw Candidacy
          <Arrow direction="right" />
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
