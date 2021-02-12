import React from 'react'
import ReactDOM from 'react-dom'
import { Loader } from '../components/icons'
import { ExtensionModalWrap, ModalTitle, ResultModalBody, ResultModalGlass, ResultText } from '../components/Modal'

interface Props {
  title: string
  description: string
}

export const WaitModal = ({ title, description }: Props) =>
  ReactDOM.createPortal(
    <ResultModalGlass>
      <ExtensionModalWrap>
        <ResultModalBody>
          <Loader />
          <ModalTitle>{title}</ModalTitle>
          <ResultText size={2}>{description}</ResultText>
        </ResultModalBody>
      </ExtensionModalWrap>
    </ResultModalGlass>,
    document.body
  )
