// import { useModal } from '@/common/hooks/useModal'
import React, { useEffect } from 'react'
import { Modal, ModalHeader, ModalWrap } from '@/common/components/Modal'
import styled from 'styled-components'

interface PreviewAndValidateModalProps{
    setIsPreviewModalShown: (bool: boolean) => void
}

export const PreviewAndValidateModal = ({setIsPreviewModalShown}: PreviewAndValidateModalProps) => {
//   const { hideModal, modalData, showModal } = useModal()

  return (
    <CustomModal onClose={() => undefined} modalSize="l" modalHeight="xl">
      <ModalHeader onClick={() => setIsPreviewModalShown(false)} title="Preview And Validate" />
    </CustomModal>
  )
}
const CustomModal = styled(Modal)`
${ModalWrap} {
    max-width: 552px !important;
}
`
