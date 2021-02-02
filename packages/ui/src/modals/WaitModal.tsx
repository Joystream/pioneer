import { Modal, ModalBody } from '../components/modal'
import { Text } from '../components/page/Typography/Text'
import React from 'react'
import styled from 'styled-components'
import { LoaderComponent } from '../components/icons/Loader'

interface Props {
  title: string
  description: string
}

export const WaitModal = ({ title, description }: Props) => (
  <Modal>
    <ExtensionModalBody>
      <Loader />
      <ModalTitle>{title}</ModalTitle>
      <Text size={1}>{description}</Text>
    </ExtensionModalBody>
  </Modal>
)

const ExtensionModalBody = styled(ModalBody)`
  justify-items: center;
  border: none;
`

const Loader = styled(LoaderComponent)`
  margin-bottom: 24px;
`

const ModalTitle = styled.h4`
  margin-bottom: 16px;
`
