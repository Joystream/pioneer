import React from 'react'
import styled from 'styled-components'
import { LoaderComponent } from '../../components/icons/Loader'
import { Modal, ModalBody } from '../../components/modal'
import { Text } from '../../components/page/Typography/Text'

export function WaitForTheExtensionModal() {
  return (
    <Modal>
      <ExtensionModalBody>
        <Loader />
        <ExtensionTitle>Waiting for the extension</ExtensionTitle>
        <Text size={1}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, a saepe ducimus qui quo optio totam explicabo
          delectus recusandae officia tenetur molestias, excepturi, amet corrupti reiciendis quam nulla magni esse?
        </Text>
      </ExtensionModalBody>
    </Modal>
  )
}

const ExtensionModalBody = styled(ModalBody)`
  justify-items: center;
  border: none;
`

const Loader = styled(LoaderComponent)`
  margin-bottom: 24px;
`

const ExtensionTitle = styled.h4`
  margin-bottom: 16px;
`
