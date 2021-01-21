import React, { useState } from 'react'
import styled from 'styled-components'
import { Colors } from '../constants'
import { Account } from '../hooks/types'

export function TransferButton(props: { from: Account; to: Account }) {
  const [isOpen, setIsOpen] = useState(false)
  const [transferAmount] = useState(100)

  const onClose = () => setIsOpen(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>send</button>
      {isOpen && (
        <Background>
          <ModalContent>
            <p>From</p>
            <div>{props.from.name}</div>
            <div>{props.from.address}</div>

            <p>Amount</p>
            <div>{transferAmount}</div>

            <p>Destination account</p>
            <div>{props.to.name}</div>
            <div>{props.to.address}</div>
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
