import React from 'react'

import { ButtonPrimary } from '../../../common/components/buttons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../common/components/Modal'
import { TextMedium } from '../../../common/components/typography'

interface Props {
  onClose: () => void
}

export const LeaveRoleSuccessModal = React.memo(({ onClose }: Props) => (
  <Modal onClose={onClose} modalSize="s">
    <ModalHeader title="Success!" onClick={onClose} />
    <ModalBody>
      <TextMedium>You have successfully left the role.</TextMedium>
    </ModalBody>
    <ModalFooter>
      <ButtonPrimary onClick={onClose} size="medium">
        Return
      </ButtonPrimary>
    </ModalFooter>
  </Modal>
))
