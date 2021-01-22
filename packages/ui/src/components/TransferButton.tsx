import React, { useState } from 'react'
import styled from 'styled-components'
import { Colors } from '../constants'
import { Account } from '../hooks/types'
import { useApi } from '../hooks/useApi'
import { useKeyring } from '../hooks/useKeyring'
import BN from 'bn.js'
import { BN_TEN } from '@polkadot/util'

const DECIMALS = new BN(12)

export function TransferButton(props: { from: Account; to: Account }) {
  const { api } = useApi()
  const { keyring } = useKeyring()
  const [isOpen, setIsOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const transferAmount = 1234
  const toAddress = props.to.address

  if (!api || !keyring) {
    return <></>
  }

  const formatAmount = (number: number) => new BN(number).mul(BN_TEN.pow(DECIMALS))
  const onClose = () => {
    setIsSending(false)
    setIsOpen(false)
  }

  const signAndSend = async () => {
    setIsSending(true)

    await api.tx.balances
      .transfer(toAddress, formatAmount(transferAmount))
      .signAndSend(keyring.getPair(props.from.address), (result) => {
        const { status } = result

        if (status.isFinalized) {
          onClose()
        }

        status.isFinalized
          ? console.log(`Finalized. Block hash: ${status.asFinalized.toString()}`)
          : console.log(`Current transaction status: ${status.type}`)
      })
      .catch((error) => console.log('Error', error))
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)}>send</button>
      {isOpen && (
        <Background>
          <ModalContent>
            <p>From</p>

            <NameLabel>{props.from.name}</NameLabel>
            <div>{props.from.address}</div>

            <p>Amount</p>
            <div>{transferAmount} Unit</div>

            <p>Destination account</p>
            <NameLabel>{props.to.name}</NameLabel>
            <div>{props.to.address}</div>

            <CloseButton onClick={onClose}>close</CloseButton>

            <button onClick={signAndSend} disabled={isSending}>
              {isSending ? 'Sending...' : 'Send'}
            </button>
          </ModalContent>
        </Background>
      )}
    </>
  )
}

const NameLabel = styled.div`
  font-weight: bold;
`

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
