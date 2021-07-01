import React from 'react'

import { SuccessIcon } from '@/common/components/icons'
import { Modal, ModalHeader, SuccessModalBody } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'

interface Props {
  onClose: () => void
}

export function RecoverBalanceSuccessModal({ onClose }: Props) {
  return (
    <Modal modalSize="m" modalHeight="s" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Success" icon={<SuccessIcon />} />
      <SuccessModalBody>
        <TextMedium margin="l">You have just successfully transferred balance from</TextMedium>
      </SuccessModalBody>
    </Modal>
  )
}
