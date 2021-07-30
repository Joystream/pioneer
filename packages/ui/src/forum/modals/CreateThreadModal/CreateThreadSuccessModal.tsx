import React from 'react'

import { Modal, ModalHeader } from '@/common/components/Modal'
import { useModal } from '@/common/hooks/useModal'

export const CreateThreadSuccessModal = () => {
  const { hideModal } = useModal()

  return (
    <Modal onClose={hideModal} modalSize="m">
      <ModalHeader onClick={hideModal} title="Success!" />
    </Modal>
  )
}
