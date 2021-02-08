import React from 'react'
import { Loader } from '../components/icons'
import { ExtensionModalWrap, ModalTitle, ResultModalBody, ResultModalGlass, ResultText } from '../components/Modal'

interface Props {
  title: string
  description: string
}

export const WaitModal = ({ title, description }: Props) => (
  <ResultModalGlass>
    <ExtensionModalWrap>
      <ResultModalBody>
        <Loader />
        <ModalTitle>{title}</ModalTitle>
        <ResultText size={2}>{description}</ResultText>
      </ResultModalBody>
    </ExtensionModalWrap>
  </ResultModalGlass>
)
