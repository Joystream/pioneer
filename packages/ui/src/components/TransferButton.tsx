import React, { useState } from 'react'
import styled from 'styled-components'
import { Colors } from '../constants'

export type Address = string

export function TransferButton(props: { from: Address; to: Address }) {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => setIsOpen(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>send</button>
      {isOpen && (
        <Background>
          <ModalContent>
            modal from {props.from} to: {props.to}
            <CloseButton onClick={onClose}>close</CloseButton>
          </ModalContent>
        </Background>
      )}
    </>
  )
}

const Background = styled.div`
  z-index: 100000;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  padding-top: 64px;
`

const ModalContent = styled.div`
  position: relative;
  background-color: ${Colors.White};
  margin: 30px auto 0 auto;
  max-width: 480px;
  border-radius: 12px;
  box-shadow: ${Colors.Black};
  padding: 12px 24px;
`

const CloseButton = styled.button`
  cursor: pointer;
  background: none;
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
  position: absolute;
  right: 12px;
  top: 12px;
`
