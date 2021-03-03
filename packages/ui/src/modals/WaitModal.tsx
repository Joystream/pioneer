import React from 'react'
import { Loader } from '../components/icons'
import { WaitingIcon } from '../components/icons/WaitingIcon'
import { Modal, ModalTitle, ResultModalBody, ResultTextWhite } from '../components/Modal'

interface Props {
  title: string
  description: string
}

export const WaitModal = ({ title, description }: Props) => (
  <Modal modalSize="xs" modalHeight="s" isDark>
    <ResultModalBody>
      <Loader />
      <WaitingIcon />
      <ModalTitle>{title}</ModalTitle>
      <ResultTextWhite size={2}>{description}</ResultTextWhite>
    </ResultModalBody>
  </Modal>
)
