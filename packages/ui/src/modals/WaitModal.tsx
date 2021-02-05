import React from 'react'
import styled from 'styled-components'
import { Loader } from '../components/icons/Loader'
import { ModalBody, ModalGlass, ModalTitle, ModalWrap } from '../components/modal'
import { Text } from '../components/page/Typography/Text'
import { Colors } from '../constants/styles'

interface Props {
  title: string
  description: string
}

export const WaitModal = ({ title, description }: Props) => (
  <WaitModalGlass>
    <WaitModalWrap>
      <WaitModalBody>
        <Loader />
        <ModalTitle>{title}</ModalTitle>
        <ExtensionText size={2}>{description}</ExtensionText>
      </WaitModalBody>
    </WaitModalWrap>
  </WaitModalGlass>
)

const WaitModalGlass = styled(ModalGlass)`
  padding-top: 224px;
`

const WaitModalWrap = styled(ModalWrap)`
  justify-self: center;
  grid-template-rows: auto;
  max-width: 534px;
  background-color: ${Colors.White};
`

const WaitModalBody = styled(ModalBody)`
  grid-row-gap: 24px;
  padding: 40px;
  justify-items: center;
  border: none;
`

const ExtensionText = styled(Text)`
  text-align: center;
`
