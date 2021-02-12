import React from 'react'
import ReactDOM from 'react-dom'
import { Loader } from '../components/icons'
import { Modal, ModalTitle, ResultModalBody, ResultText } from '../components/Modal'

interface Props {
  title: string
  description: string
}

export const WaitModal = ({ title, description }: Props) =>
  ReactDOM.createPortal(
    <Modal modalSize={'s'} modalHeight={'s'}>
      <ResultModalBody>
        <Loader />
        <ModalTitle>{title}</ModalTitle>
        <ResultText size={2}>{description}</ResultText>
      </ResultModalBody>
    </Modal>,
    document.body
  )
