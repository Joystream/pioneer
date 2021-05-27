import React, { FC } from 'react'

import { ButtonPrimary } from '@/common/components/buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'

interface Props {
  onClose: () => void
}

export const ChangeAccountSuccessModal: FC<Props> = ({ onClose, children }) => (
  <Modal onClose={onClose} modalSize="s">
    <ModalHeader title="Success!" onClick={onClose} />
    <ModalBody>
      <TextMedium>{children}</TextMedium>
    </ModalBody>
    <ModalFooter>
      <ButtonPrimary onClick={onClose} size="medium">
        Return
      </ButtonPrimary>
    </ModalFooter>
  </Modal>
)
