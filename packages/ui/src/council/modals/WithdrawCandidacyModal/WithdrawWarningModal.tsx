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
          Withdrawing a candidacy is irreversible however you can announce another one with the same account afterwards.
          This is currently the only way to edit bullet points and agenda.
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
