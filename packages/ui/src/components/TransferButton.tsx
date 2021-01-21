import React, { useState } from 'react'
import styled from 'styled-components'
import { Colors } from '../constants'
import { Account } from '../hooks/types'
import { useApi } from '../hooks/useApi'
import { useKeyring } from '../hooks/useKeyring'

export function TransferButton(props: { from: Account; to: Account }) {
  const [isOpen, setIsOpen] = useState(false)
  const [transferAmount] = useState(100000)
  const { api } = useApi()
  const { keyring } = useKeyring()
  const toAddress = props.to.address

  if (!api || !keyring) {
    return <></>
  }

  const onClose = () => setIsOpen(false)

  const signAndSend = async () => {
    const txHash = await api.tx.balances
      .transfer(toAddress, transferAmount)
      .signAndSend(keyring.getPair(props.from.address), (result) => {
        const { status } = result

        status.isFinalized
          ? console.log(`Finalized. Block hash: ${status.asFinalized.toString()}`)
          : console.log(`Current transaction status: ${status.type}`)
      })
      .catch((error) => console.log('Error', error))

    console.log(txHash)
  }

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
            <button onClick={signAndSend}>Send</button>
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
