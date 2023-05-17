import React from 'react'

import { AlertSymbol } from '@/common/components/icons/symbols'
import { Modal, ModalBody, ModalHeader, ModalBodyContainer } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'

import { Colors } from '../constants/styles'

interface Props {
  onClose: () => void
  text: string
}

export const BackendErrorModal = ({ onClose }: Props) => (
  <Modal onClose={onClose} modalSize="m">
    <ModalHeader icon={<AlertSymbol className={'primaryPart'} />} onClick={onClose} title="Error" />
    <ModalBody>
      <ModalBodyContainer backgroundColor={Colors.Red[50]}>
        <TextMedium>The backend server is down. Please try again later.</TextMedium>
      </ModalBodyContainer>
    </ModalBody>
  </Modal>
)
