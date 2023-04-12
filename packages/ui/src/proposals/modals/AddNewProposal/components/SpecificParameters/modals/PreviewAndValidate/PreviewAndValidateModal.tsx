// import { useModal } from '@/common/hooks/useModal'
import React, { useEffect } from 'react'
import { Modal, ModalGlass, ModalHeader, ModalWrap } from '@/common/components/Modal'
import styled from 'styled-components'

interface PreviewAndValidateModalProps{
    setIsPreviewModalShown: (bool: boolean) => void
}

export const PreviewAndValidateModal = ({setIsPreviewModalShown}: PreviewAndValidateModalProps) => {
//   const { hideModal, modalData, showModal } = useModal()

  return (
    <Modal onClose={() => undefined} modalSize="s" customModalSize={'552'} marginRight={'68'} modalHeight="xl">
      <ModalHeader onClick={() => setIsPreviewModalShown(false)} title="Preview And Validate" />
    </Modal>
  )
}
